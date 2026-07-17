import { ApiException, fromHono } from "chanfana";
import { Hono } from "hono";
import { tasksRouter } from "./endpoints/tasks/router";
import { toolsRouter } from "./endpoints/tools/router";
import { skillsRouter } from "./endpoints/skills/router";
import { workflowsRouter } from "./endpoints/workflows/router";
import { strixRouter } from "./endpoints/strix/router";
import { DashboardEndpoint } from "./endpoints/dashboard";
import { LlmInvokeEndpoint } from "./endpoints/llmInvoke";
import { ContentfulStatusCode } from "hono/utils/http-status";
import { DummyEndpoint } from "./endpoints/dummyEndpoint";

// Start a Hono app
const app = new Hono<{ Bindings: Env }>();

app.onError((err, c) => {
	if (err instanceof ApiException) {
		// If it's a Chanfana ApiException, let Chanfana handle the response
		return c.json(
			{ success: false, errors: err.buildResponse() },
			err.status as ContentfulStatusCode,
		);
	}

	console.error("Global error handler caught:", err); // Log the error if it's not known

	// For other errors, return a generic 500 response
	return c.json(
		{
			success: false,
			errors: [{ code: 7000, message: "Internal Server Error" }],
		},
		500,
	);
});

// Setup OpenAPI registry
const openapi = fromHono(app, {
	docs_url: "/",
	schema: {
		info: {
			title: "My Awesome API",
			version: "2.0.0",
			description: "This is the documentation for my awesome API.",
		},
	},
});

// Register sub routers
openapi.route("/tasks", tasksRouter);
openapi.route("/tools", toolsRouter);
openapi.route("/skills", skillsRouter);
openapi.route("/workflows", workflowsRouter);
openapi.route("/strix", strixRouter);

// Register other endpoints
openapi.get("/dashboard", DashboardEndpoint);
openapi.post("/llm-invoke", LlmInvokeEndpoint);
openapi.post("/dummy/:slug", DummyEndpoint);

// Export the Hono app
export default app;
