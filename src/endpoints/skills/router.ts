import { Hono } from "hono";
import { fromHono } from "chanfana";
import { SkillList } from "./skillList";
import { SkillCreate } from "./skillCreate";
import { SkillRead } from "./skillRead";
import { SkillUpdate } from "./skillUpdate";
import { SkillDelete } from "./skillDelete";

export const skillsRouter = fromHono(new Hono());

skillsRouter.get("/", SkillList);
skillsRouter.post("/", SkillCreate);
skillsRouter.get("/:id", SkillRead);
skillsRouter.put("/:id", SkillUpdate);
skillsRouter.delete("/:id", SkillDelete);
