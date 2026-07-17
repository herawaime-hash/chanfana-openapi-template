import { contentJson, OpenAPIRoute } from "chanfana";
import { AppContext } from "../types";
import { z } from "zod";

export class LlmInvokeEndpoint extends OpenAPIRoute {
	public schema = {
		tags: ["LLM Invoke"],
		summary: "Route an intent to the best matching tool or skill",
		request: {
			body: contentJson(
				z.object({
					intent: z.string(),
					category: z.string().optional(),
					payload: z.record(z.unknown()).optional(),
				}),
			),
		},
		responses: {
			"200": {
				description: "Returns the routing decision",
				...contentJson({
					success: Boolean,
					result: z.object({
						intent: z.string(),
						routed_to: z.string(),
						routed_type: z.enum(["tool", "skill", "workflow"]),
						action: z.string(),
					}),
				}),
			},
		},
	};

	public async handle(c: AppContext) {
		const data = await this.getValidatedData<typeof this.schema>();
		const { intent, category, payload } = data.body;

		let routedTo = "copilot-agent";
		let routedType: "tool" | "skill" | "workflow" = "tool";
		let action = "delegate_to_copilot";

		const normalized = intent.toLowerCase();

		if (category) {
			const tool = await c.env.DB.prepare(
				"SELECT * FROM tools WHERE category = ? ORDER BY name LIMIT 1",
			)
				.bind(category)
				.first();
			if (tool) {
				routedTo = (tool.slug as string) ?? "unknown";
				routedType = "tool";
				action = `invoke_${tool.slug}`;
			}
		} else if (
			normalized.includes("strix") ||
			normalized.includes("blue team") ||
			normalized.includes("purple team")
		) {
			routedTo = "strix";
			routedType = "tool";
			action = "create_strix_scenario";
		} else if (normalized.includes("skill")) {
			routedTo = "skill-router";
			routedType = "skill";
			action = "match_skill";
		} else if (normalized.includes("workflow")) {
			routedTo = "workflow-engine";
			routedType = "workflow";
			action = "execute_workflow";
		} else {
			const tool = await c.env.DB.prepare(
				"SELECT * FROM tools WHERE name LIKE ? OR tags LIKE ? ORDER BY name LIMIT 1",
			)
				.bind(`%${intent}%`, `%${intent}%`)
				.first();
			if (tool) {
				routedTo = (tool.slug as string) ?? "unknown";
				routedType = "tool";
				action = `invoke_${tool.slug}`;
			}
		}

		return {
			success: true,
			result: {
				intent,
				routed_to: routedTo,
				routed_type: routedType,
				action,
				payload: payload ?? {},
			},
		};
	}
}
