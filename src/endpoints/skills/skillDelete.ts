import { D1DeleteEndpoint } from "chanfana";
import { HandleArgs } from "../../types";
import { SkillModel } from "./base";

export class SkillDelete extends D1DeleteEndpoint<HandleArgs> {
	_meta = {
		model: SkillModel,
		fields: SkillModel.schema,
	};
}
