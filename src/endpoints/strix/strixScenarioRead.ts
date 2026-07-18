import { contentJson, OpenAPIRoute } from "chanfana";
import { AppContext } from "../../types";
import { z } from "zod";
import { strixRun } from "./base";

export class StrixScenarioRead extends OpenAPIRoute {
	public schema = {
		tags: ["STRIx"],
		summary: "Get a STRIX run by ID",
		request: {
			params: z.object({
				id: z.string().regex(/^\d+$/).transform(Number),
			}),
		},
		responses: {
			"200": {
				description: "Returns the STRIX run",
				...contentJson({
					success: Boolean,
					result: strixRun,
				}),
			},
			"404": {
				description: "Run not found",
			},
		},
	};

	public async handle(c: AppContext) {
		const data = await this.getValidatedData<typeof this.schema>();
		const row = await c.env.DB.prepare("SELECT * FROM strix_runs WHERE id = ?")
			.bind(data.params.id)
			.first();

		if (!row) {
			return c.json(
				{ success: false, errors: [{ message: "Not Found" }] },
				404,
			);
		}

		return { success: true, result: row };
	}
}
