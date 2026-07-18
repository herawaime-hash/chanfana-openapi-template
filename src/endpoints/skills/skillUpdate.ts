import { D1UpdateEndpoint } from "chanfana";
import { HandleArgs } from "../../types";
import { SkillModel } from "./base";

export class SkillUpdate extends D1UpdateEndpoint<HandleArgs> {
	_meta = {
		model: SkillModel,
		fields: SkillModel.schema.omit({ id: true, created_at: true, updated_at: true }),
	};
}
