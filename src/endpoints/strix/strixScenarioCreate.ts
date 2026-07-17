import { contentJson, OpenAPIRoute } from "chanfana";
import { AppContext } from "../../types";
import { z } from "zod";
import { strixRun } from "./base";

export class StrixScenarioCreate extends OpenAPIRoute {
	public schema = {
		tags: ["STRIx"],
		summary: "Create and queue a STRIX scenario run",
		request: {
			body: contentJson(
				strixRun
					.omit({
						id: true,
						status: true,
						results: true,
						purple_layer: true,
						investigation_notes: true,
						created_at: true,
						updated_at: true,
					})
					.partial({ config: true, description: true }),
			),
		},
		responses: {
			"201": {
				description: "Returns the queued STRIX run",
				...contentJson({
					success: Boolean,
					result: strixRun,
				}),
			},
		},
	};

	public async handle(c: AppContext) {
		const data = await this.getValidatedData<typeof this.schema>();
		const body = {
			...data.body,
			status: "pending",
			results: null,
			purple_layer: null,
			investigation_notes: null,
		};

		const columns = Object.keys(body);
		const placeholders = columns.map(() => "?").join(", ");
		const values = Object.values(body);

		const { meta } = await c.env.DB.prepare(
			`INSERT INTO strix_runs (${columns.join(", ")}) VALUES (${placeholders})`,
		)
			.bind(...values)
			.run();

		const row = await c.env.DB.prepare("SELECT * FROM strix_runs WHERE id = ?")
			.bind(meta.last_row_id)
			.first();

		return { success: true, result: row };
	}
}
