import { z } from "zod";

export const strixRun = z.object({
	id: z.number().int(),
	scenario_id: z.string(),
	name: z.string(),
	description: z.string().nullable(),
	status: z.string(),
	config: z.string().nullable(),
	results: z.string().nullable(),
	purple_layer: z.string().nullable(),
	investigation_notes: z.string().nullable(),
	created_at: z.string().datetime(),
	updated_at: z.string().datetime(),
});

export const StrixRunModel = {
	tableName: "strix_runs",
	primaryKeys: ["id"],
	schema: strixRun,
};
