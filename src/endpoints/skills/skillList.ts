import { D1ListEndpoint } from "chanfana";
import { HandleArgs } from "../../types";
import { SkillModel } from "./base";

export class SkillList extends D1ListEndpoint<HandleArgs> {
	_meta = {
		model: SkillModel,
		fields: SkillModel.schema,
	};
}
