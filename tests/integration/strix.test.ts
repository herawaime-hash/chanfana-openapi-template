import { SELF } from "cloudflare:test";
import { beforeEach, describe, expect, it, vi } from "vitest";

describe("STRIx API Integration Tests", () => {
	beforeEach(async () => {
		vi.clearAllMocks();
	});

	describe("GET /strix/info", () => {
		it("should return STRIX metadata", async () => {
			const response = await SELF.fetch(`http://local.test/strix/info`);
			const body = await response.json<{
				success: boolean;
				result: { name: string; repo: string };
			}>();

			expect(response.status).toBe(200);
			expect(body.success).toBe(true);
			expect(body.result.name).toBe("Strict STRIX");
			expect(body.result.repo).toContain("github.com");
		});
	});

	describe("GET /strix/scenarios", () => {
		it("should return scenario templates", async () => {
			const response = await SELF.fetch(`http://local.test/strix/scenarios`);
			const body = await response.json<{
				success: boolean;
				result: any[];
			}>();

			expect(response.status).toBe(200);
			expect(body.success).toBe(true);
			expect(body.result.length).toBeGreaterThan(0);
		});
	});

	describe("POST /strix/scenarios", () => {
		it("should create a STRIX run", async () => {
			const response = await SELF.fetch(`http://local.test/strix/scenarios`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					scenario_id: "lateral-movement",
					name: "Test Lateral Movement",
					description: "Testing detection",
				}),
			});
			const body = await response.json<{ success: boolean; result: any }>();

			expect(response.status).toBe(200);
			expect(body.success).toBe(true);
			expect(body.result.status).toBe("pending");
		});
	});
});
