import { contentJson, OpenAPIRoute } from "chanfana";
import { AppContext } from "../../types";
import { z } from "zod";
import { license } from "./base";

export class LicenseCreate extends OpenAPIRoute {
	public schema = {
		tags: ["Licenses"],
		summary: "Add a license to a tool",
		request: {
			params: z.object({
				toolId: z.string().regex(/^\d+$/).transform(Number),
			}),
			body: contentJson(
				license.omit({ id: true, created_at: true }).partial({
					tool_id: true,
				}),
			),
		},
		responses: {
			"201": {
				description: "Returns the created license",
				...contentJson({
					success: Boolean,
					result: license,
				}),
			},
		},
	};

	public async handle(c: AppContext) {
		const data = await this.getValidatedData<typeof this.schema>();
		const toolId = data.params.toolId;
		const body = { ...data.body, tool_id: toolId };

		const columns = Object.keys(body);
		const placeholders = columns.map(() => "?").join(", ");
		const values = Object.values(body);

		const { meta } = await c.env.DB.prepare(
			`INSERT INTO licenses (${columns.join(", ")}) VALUES (${placeholders})`,
		)
			.bind(...values)
			.run();

		const row = await c.env.DB.prepare(
			"SELECT * FROM licenses WHERE id = ?",
		)
			.bind(meta.last_row_id)
			.first();

		return { success: true, result: row };
	}
}
