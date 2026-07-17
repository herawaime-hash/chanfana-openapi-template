import { Hono } from "hono";
import { fromHono } from "chanfana";
import { ToolList } from "./toolList";
import { ToolCreate } from "./toolCreate";
import { ToolRead } from "./toolRead";
import { ToolUpdate } from "./toolUpdate";
import { ToolDelete } from "./toolDelete";
import { LicenseCreate } from "./licenseCreate";
import { LicenseList } from "./licenseList";
import { LicenseRead } from "./licenseRead";
import { LicenseDelete } from "./licenseDelete";

export const toolsRouter = fromHono(new Hono());

toolsRouter.get("/", ToolList);
toolsRouter.post("/", ToolCreate);
toolsRouter.get("/:id", ToolRead);
toolsRouter.put("/:id", ToolUpdate);
toolsRouter.delete("/:id", ToolDelete);

toolsRouter.get("/:toolId/licenses", LicenseList);
toolsRouter.post("/:toolId/licenses", LicenseCreate);
toolsRouter.get("/licenses/:id", LicenseRead);
toolsRouter.delete("/licenses/:id", LicenseDelete);
