import { contentJson, OpenAPIRoute } from "chanfana";
import { AppContext } from "../types";
import { z } from "zod";

export class DashboardEndpoint extends OpenAPIRoute {
	public schema = {
		tags: ["Dashboard"],
		summary: "Unified dashboard of tools, workflows, skills, and STRIX runs",
		responses: {
			"200": {
				description: "Returns dashboard data",
				...contentJson({
					success: Boolean,
					result: z.object({
						tools_by_category: z.record(z.array(z.record(z.unknown()))),
						skills: z.array(z.record(z.unknown())),
						workflows: z.array(z.record(z.unknown())),
						recent_strix_runs: z.array(z.record(z.unknown())),
						licenses: z.array(z.record(z.unknown())),
					}),
				}),
			},
		},
	};

	public async handle(c: AppContext) {
		const { results: tools } = await c.env.DB.prepare(
			"SELECT * FROM tools ORDER BY category, name",
		).all();

		const { results: skills } = await c.env.DB.prepare(
			"SELECT * FROM skills ORDER BY name",
		).all();

		const { results: workflows } = await c.env.DB.prepare(
			"SELECT * FROM workflows ORDER BY name",
		).all();

		const { results: strixRuns } = await c.env.DB.prepare(
			"SELECT * FROM strix_runs ORDER BY created_at DESC LIMIT 10",
		).all();

		const { results: licenses } = await c.env.DB.prepare(
			"SELECT * FROM licenses ORDER BY created_at DESC",
		).all();

		const toolsByCategory: Record<string, Array<Record<string, unknown>>> = {};
		for (const tool of tools) {
			const category = (tool.category as string) ?? "uncategorized";
			if (!toolsByCategory[category]) {
				toolsByCategory[category] = [];
			}
			toolsByCategory[category].push(tool as Record<string, unknown>);
		}

		return {
			success: true,
			result: {
				tools_by_category: toolsByCategory,
				skills,
				workflows,
				recent_strix_runs: strixRuns,
				licenses,
			},
		};
	}
}
