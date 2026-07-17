import { SELF } from "cloudflare:test";
import { beforeEach, describe, expect, it, vi } from "vitest";

describe("Dashboard & LLM Invoke Integration Tests", () => {
	beforeEach(async () => {
		vi.clearAllMocks();
	});

	describe("GET /dashboard", () => {
		it("should return dashboard data", async () => {
			const response = await SELF.fetch(`http://local.test/dashboard`);
			const body = await response.json<{
				success: boolean;
				result: {
					tools_by_category: Record<string, any[]>;
					skills: any[];
					workflows: any[];
					recent_strix_runs: any[];
					licenses: any[];
				};
			}>();

			expect(response.status).toBe(200);
			expect(body.success).toBe(true);
			expect(Object.keys(body.result.tools_by_category).length).toBeGreaterThan(0);
		});
	});

	describe("POST /llm-invoke", () => {
		it("should route a STRIX intent", async () => {
			const response = await SELF.fetch(`http://local.test/llm-invoke`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					intent: "run a strix blue team scenario",
				}),
			});
			const body = await response.json<{
				success: boolean;
				result: { routed_to: string; action: string };
			}>();

			expect(response.status).toBe(200);
			expect(body.success).toBe(true);
			expect(body.result.routed_to).toBe("strix");
			expect(body.result.action).toBe("create_strix_scenario");
		});
	});
});
