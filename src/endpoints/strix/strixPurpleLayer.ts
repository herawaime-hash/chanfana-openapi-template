import { contentJson, OpenAPIRoute } from "chanfana";
import { AppContext } from "../../types";
import { z } from "zod";
import { strixRun } from "./base";

export class StrixPurpleLayer extends OpenAPIRoute {
	public schema = {
		tags: ["STRIx"],
		summary: "Add purple-team/investigation layer to a STRIX run",
		request: {
			params: z.object({
				id: z.string().regex(/^\d+$/).transform(Number),
			}),
			body: contentJson(
				z.object({
					purple_layer: z.string(),
					investigation_notes: z.string().optional(),
				}),
			),
		},
		responses: {
			"200": {
				description: "Returns the updated STRIX run",
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
		const runId = data.params.id;
		const { purple_layer, investigation_notes } = data.body;

		const existing = await c.env.DB.prepare(
			"SELECT * FROM strix_runs WHERE id = ?",
		)
			.bind(runId)
			.first();

		if (!existing) {
			return c.json(
				{ success: false, errors: [{ message: "Not Found" }] },
				404,
			);
		}

		await c.env.DB.prepare(
			"UPDATE strix_runs SET purple_layer = ?, investigation_notes = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
		)
			.bind(purple_layer, investigation_notes ?? null, runId)
			.run();

		const row = await c.env.DB.prepare("SELECT * FROM strix_runs WHERE id = ?")
			.bind(runId)
			.first();

		return { success: true, result: row };
	}
}
