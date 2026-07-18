import { z } from "zod";

export const tool = z.object({
	id: z.number().int(),
	name: z.string(),
	slug: z.string(),
	category: z.string(),
	provider: z.string().nullable(),
	cost_tier: z.string(),
	access_url: z.string().nullable(),
	api_endpoint: z.string().nullable(),
	integration_status: z.string(),
	credentials_hint: z.string().nullable(),
	notes: z.string().nullable(),
	tags: z.string().nullable(),
	license_info: z.string().nullable(),
	created_at: z.string().datetime(),
	updated_at: z.string().datetime(),
});

export const ToolModel = {
	tableName: "tools",
	primaryKeys: ["id"],
	schema: tool,
};

export const license = z.object({
	id: z.number().int(),
	tool_id: z.number().int().nullable(),
	name: z.string(),
	issuer: z.string().nullable(),
	issued_at: z.string().datetime().nullable(),
	expires_at: z.string().datetime().nullable(),
	evidence_url: z.string().nullable(),
	notes: z.string().nullable(),
	created_at: z.string().datetime(),
});

export const LicenseModel = {
	tableName: "licenses",
	primaryKeys: ["id"],
	schema: license,
};
