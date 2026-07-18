import { Hono } from "hono";
import { fromHono } from "chanfana";
import { WorkflowList } from "./workflowList";
import { WorkflowCreate } from "./workflowCreate";
import { WorkflowRead } from "./workflowRead";
import { WorkflowUpdate } from "./workflowUpdate";
import { WorkflowDelete } from "./workflowDelete";
import { WorkflowExecute } from "./workflowExecute";

export const workflowsRouter = fromHono(new Hono());

workflowsRouter.get("/", WorkflowList);
workflowsRouter.post("/", WorkflowCreate);
workflowsRouter.get("/:id", WorkflowRead);
workflowsRouter.put("/:id", WorkflowUpdate);
workflowsRouter.delete("/:id", WorkflowDelete);
workflowsRouter.post("/:id/execute", WorkflowExecute);
