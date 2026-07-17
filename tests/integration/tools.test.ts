import { SELF } from "cloudflare:test";
import { beforeEach, describe, expect, it, vi } from "vitest";

describe("Tools API Integration Tests", () => {
	beforeEach(async () => {
		vi.clearAllMocks();
	});

	describe("GET /tools", () => {
		it("should return a list of tools seeded by migration", async () => {
			const response = await SELF.fetch(`http://local.test/tools`);
			const body = await response.json<{
				success: boolean;
				result: any[];
			}>();

			expect(response.status).toBe(200);
			expect(body.success).toBe(true);
			expect(body.result.length).toBeGreaterThan(0);
		});
	});

	describe("POST /tools", () => {
		it("should create a new tool", async () => {
			const toolData = {
				name: "Test Tool",
				slug: "test-tool",
				category: "ai-agent",
				provider: "Test Inc",
				cost_tier: "free",
				access_url: null,
				api_endpoint: null,
				integration_status: "planned",
				credentials_hint: null,
				notes: null,
				tags: null,
				license_info: null,
			};
			const response = await SELF.fetch(`http://local.test/tools`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(toolData),
			});
			const body = await response.json<{ success: boolean; result: any }>();

			expect(response.status).toBe(201);
			expect(body.success).toBe(true);
			expect(body.result).toEqual(expect.objectContaining(toolData));
		});
	});

	describe("GET /tools/:id", () => {
		it("should return 404 for non-existent tool", async () => {
			const response = await SELF.fetch(`http://local.test/tools/999999`);
			expect(response.status).toBe(404);
		});
	});
});
