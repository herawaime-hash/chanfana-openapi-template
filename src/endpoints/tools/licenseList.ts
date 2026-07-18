import { contentJson, OpenAPIRoute } from "chanfana";
import { AppContext } from "../../types";
import { z } from "zod";
import { license } from "./base";

export class LicenseList extends OpenAPIRoute {
	public schema = {
		tags: ["Licenses"],
		summary: "List licenses for a tool",
		request: {
			params: z.object({
				toolId: z.string().regex(/^\d+$/).transform(Number),
			}),
		},
		responses: {
			"200": {
				description: "Returns a list of licenses",
				...contentJson({
					success: Boolean,
					result: z.array(license),
				}),
			},
		},
	};

	public async handle(c: AppContext) {
		const data = await this.getValidatedData<typeof this.schema>();
		const toolId = data.params.toolId;

		const { results } = await c.env.DB.prepare(
			"SELECT * FROM licenses WHERE tool_id = ? ORDER BY created_at DESC",
		)
			.bind(toolId)
			.all();

		return { success: true, result: results };
	}
}
