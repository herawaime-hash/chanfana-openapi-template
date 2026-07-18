import { D1CreateEndpoint } from "chanfana";
import { HandleArgs } from "../../types";
import { SkillModel } from "./base";

export class SkillCreate extends D1CreateEndpoint<HandleArgs> {
	_meta = {
		model: SkillModel,
		fields: SkillModel.schema.omit({ id: true, created_at: true, updated_at: true }),
	};
}
