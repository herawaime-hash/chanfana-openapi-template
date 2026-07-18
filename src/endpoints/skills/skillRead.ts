import { D1ReadEndpoint } from "chanfana";
import { HandleArgs } from "../../types";
import { SkillModel } from "./base";

export class SkillRead extends D1ReadEndpoint<HandleArgs> {
	_meta = {
		model: SkillModel,
		fields: SkillModel.schema,
	};
}
