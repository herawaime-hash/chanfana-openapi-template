import { contentJson, OpenAPIRoute } from "chanfana";
import { AppContext } from "../../types";
import { z } from "zod";

export class StrixInvoke extends OpenAPIRoute {
	public schema = {
		tags: ["STRIx"],
		summary: "Invoke another agent/tool with a STRIX run context",
		request: {
			params: z.object({
				id: z.string().regex(/^\d+$/).transform(Number),
			}),
			body: contentJson(
				z.object({
					tool_slug: z.string(),
					prompt: z.string(),
				}),
			),
		},
		responses: {
			"200": {
				description: "Returns the invocation request context",
				...contentJson({
					success: Boolean,
					result: z.object({
						run_id: z.number(),
						tool_slug: z.string(),
						prompt: z.string(),
						status: z.string(),
						note: z.string(),
					}),
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
		const { tool_slug, prompt } = data.body;

		const run = await c.env.DB.prepare("SELECT * FROM strix_runs WHERE id = ?")
			.bind(runId)
			.first();

		if (!run) {
			return c.json(
				{ success: false, errors: [{ message: "Not Found" }] },
				404,
			);
		}

		return {
			success: true,
			result: {
				run_id: runId,
				tool_slug,
				prompt,
				status: "simulated",
				note:
					"Hook this up to your target tool's API (Telegram/iMessage/Hermes/etc.) by setting the tool's api_endpoint and invoking it here.",
			},
		};
	}
}
