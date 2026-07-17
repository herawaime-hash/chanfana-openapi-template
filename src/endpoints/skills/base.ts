import { z } from "zod";

export const skill = z.object({
	id: z.number().int(),
	name: z.string(),
	slug: z.string(),
	description: z.string().nullable(),
	input_schema: z.string().nullable(),
	output_schema: z.string().nullable(),
	tool_ids: z.string().nullable(),
	steps: z.string().nullable(),
	created_at: z.string().datetime(),
	updated_at: z.string().datetime(),
});

export const SkillModel = {
	tableName: "skills",
	primaryKeys: ["id"],
	schema: skill,
};
