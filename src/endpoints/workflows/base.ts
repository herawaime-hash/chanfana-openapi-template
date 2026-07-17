import { z } from "zod";

export const workflow = z.object({
	id: z.number().int(),
	name: z.string(),
	slug: z.string(),
	description: z.string().nullable(),
	steps: z.string().nullable(),
	created_at: z.string().datetime(),
	updated_at: z.string().datetime(),
});

export const WorkflowModel = {
	tableName: "workflows",
	primaryKeys: ["id"],
	schema: workflow,
};
