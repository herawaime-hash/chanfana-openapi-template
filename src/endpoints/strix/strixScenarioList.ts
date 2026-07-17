import { contentJson, OpenAPIRoute } from "chanfana";
import { AppContext } from "../../types";
import { z } from "zod";

export class StrixScenarioList extends OpenAPIRoute {
	public schema = {
		tags: ["STRIx"],
		summary: "List built-in STRIX scenario templates",
		responses: {
			"200": {
				description: "Returns scenario templates",
				...contentJson({
					success: Boolean,
					result: z.array(
						z.object({
							scenario_id: z.string(),
							name: z.string(),
							description: z.string(),
							tactics: z.array(z.string()),
						}),
					),
				}),
			},
		},
	};

	public async handle(c: AppContext) {
		return {
			success: true,
			result: [
				{
					scenario_id: "phishing-c2",
					name: "Spear-Phishing → C2",
					description:
						"Simulate a phishing payload that establishes command-and-control.",
					tactics: ["Initial Access", "Command and Control"],
				},
				{
					scenario_id: "lateral-movement",
					name: "Lateral Movement",
					description:
						"Test detection of SMB/valid-credential lateral movement.",
					tactics: ["Lateral Movement", "Credential Access"],
				},
				{
					scenario_id: "data-exfiltration",
					name: "Data Exfiltration",
					description:
						"Simulate data staging and exfiltration over HTTPS/DNS.",
					tactics: ["Collection", "Exfiltration"],
				},
				{
					scenario_id: "persistence",
					name: "Persistence Mechanisms",
					description:
						"Test detection of scheduled tasks, registry run keys, etc.",
					tactics: ["Persistence", "Defense Evasion"],
				},
			],
		};
	}
}
