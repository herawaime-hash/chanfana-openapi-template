import { D1ReadEndpoint } from "chanfana";
import { HandleArgs } from "../../types";
import { ToolModel } from "./base";

export class ToolRead extends D1ReadEndpoint<HandleArgs> {
	_meta = {
		model: ToolModel,
		fields: ToolModel.schema,
	};
}
