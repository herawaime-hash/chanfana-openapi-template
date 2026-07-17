import { Hono } from "hono";
import { fromHono } from "chanfana";
import { StrixInfo } from "./strixInfo";
import { StrixScenarioList } from "./strixScenarioList";
import { StrixScenarioCreate } from "./strixScenarioCreate";
import { StrixScenarioRead } from "./strixScenarioRead";
import { StrixPurpleLayer } from "./strixPurpleLayer";
import { StrixInvoke } from "./strixInvoke";

export const strixRouter = fromHono(new Hono());

strixRouter.get("/info", StrixInfo);
strixRouter.get("/scenarios", StrixScenarioList);
strixRouter.post("/scenarios", StrixScenarioCreate);
strixRouter.get("/scenarios/:id", StrixScenarioRead);
strixRouter.post("/scenarios/:id/purple", StrixPurpleLayer);
strixRouter.post("/scenarios/:id/invoke", StrixInvoke);
