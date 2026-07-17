import { contentJson, OpenAPIRoute } from "chanfana";
import { AppContext } from "../../types";
import { z } from "zod";

export class StrixInfo extends OpenAPIRoute {
	public schema = {
		tags: ["STRIx"],
		summary: "Get Strict STRIX information and install notes",
		responses: {
			"200": {
				description: "Returns STRIX metadata",
				...contentJson({
					success: Boolean,
					result: z.object({
						name: z.string(),
						description: z.string(),
						repo: z.string(),
						documentation: z.string(),
						install_notes: z.string(),
						integration_status: z.string(),
					}),
				}),
			},
		},
	};

	public async handle(c: AppContext) {
		return {
			success: true,
			result: {
				name: "Strict STRIX",
				description:
					"Open-source adversary simulation and detection validation platform for blue-team exercises.",
				repo: "https://github.com/stride-oss/strix",
				documentation: "https://github.com/stride-oss/strix#readme",
				install_notes:
					"Clone the repo and follow its README to deploy in a lab or on your VPS. Configure the strix_base_url binding in wrangler.jsonc when ready.",
				integration_status: "pending",
			},
		};
	}
}
