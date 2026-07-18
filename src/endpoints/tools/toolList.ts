import { D1ListEndpoint } from "chanfana";
import { HandleArgs } from "../../types";
import { ToolModel } from "./base";

export class ToolList extends D1ListEndpoint<HandleArgs> {
	_meta = {
		model: ToolModel,
		fields: ToolModel.schema,
	};
}
