import { contentJson, OpenAPIRoute } from "chanfana";
import { AppContext } from "../../types";
import { z } from "zod";
import { license } from "./base";

export class LicenseDelete extends OpenAPIRoute {
	public schema = {
		tags: ["Licenses"],
		summary: "Delete a license",
		request: {
			params: z.object({
				id: z.string().regex(/^\d+$/).transform(Number),
			}),
		},
		responses: {
			"200": {
				description: "Returns the deleted license",
				...contentJson({
					success: Boolean,
					result: license,
				}),
			},
			"404": {
				description: "License not found",
			},
		},
	};

	public async handle(c: AppContext) {
		const data = await this.getValidatedData<typeof this.schema>();
		const row = await c.env.DB.prepare("SELECT * FROM licenses WHERE id = ?")
			.bind(data.params.id)
			.first();

		if (!row) {
			return c.json(
				{ success: false, errors: [{ message: "Not Found" }] },
				404,
			);
		}

		await c.env.DB.prepare("DELETE FROM licenses WHERE id = ?")
			.bind(data.params.id)
			.run();

		return { success: true, result: row };
	}
}
