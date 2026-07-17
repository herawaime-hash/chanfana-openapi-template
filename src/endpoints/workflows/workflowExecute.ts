import { contentJson, OpenAPIRoute } from "chanfana";
import { AppContext } from "../../types";
import { z } from "zod";

export class WorkflowExecute extends OpenAPIRoute {
	public schema = {
		tags: ["Workflows"],
		summary: "Execute a workflow by ID",
		request: {
			params: z.object({
				id: z.string().regex(/^\d+$/).transform(Number),
			}),
			body: contentJson(z.record(z.unknown()).default({})),
		},
		responses: {
			"200": {
				description: "Returns execution output",
				...contentJson({
					success: Boolean,
					result: z.object({
						workflow_id: z.number(),
						steps: z.array(z.record(z.unknown())),
					}),
				}),
			},
			"404": {
				description: "Workflow not found",
			},
		},
	};

	public async handle(c: AppContext) {
		const data = await this.getValidatedData<typeof this.schema>();
		const workflowId = data.params.id;
		const inputs = data.body;

		const workflow = await c.env.DB.prepare(
			"SELECT * FROM workflows WHERE id = ?",
		)
			.bind(workflowId)
			.first<{ steps: string }>();

		if (!workflow) {
			return c.json(
				{ success: false, errors: [{ message: "Not Found" }] },
				404,
			);
		}

		const steps: Array<{ skill_slug?: string; tool_slug?: string; action: string; payload?: Record<string, unknown> }> =
			workflow.steps ? JSON.parse(workflow.steps) : [];

		const executed: Array<Record<string, unknown>> = [];

		for (const step of steps) {
			const output: Record<string, unknown> = {
				step,
				status: "simulated",
				inputs,
				timestamp: new Date().toISOString(),
			};

			if (step.skill_slug) {
				const skill = await c.env.DB.prepare(
					"SELECT * FROM skills WHERE slug = ?",
				)
					.bind(step.skill_slug)
					.first();
				output.skill = skill ?? null;
			}

			if (step.tool_slug) {
				const tool = await c.env.DB.prepare(
					"SELECT * FROM tools WHERE slug = ?",
				)
					.bind(step.tool_slug)
					.first();
				output.tool = tool ?? null;
			}

			executed.push(output);
		}

		return {
			success: true,
			result: {
				workflow_id: workflowId,
				steps: executed,
			},
		};
	}
}
