import { D1DeleteEndpoint } from "chanfana";
import { HandleArgs } from "../../types";
import { ToolModel } from "./base";

export class ToolDelete extends D1DeleteEndpoint<HandleArgs> {
	_meta = {
		model: ToolModel,
		fields: ToolModel.schema,
	};
}
