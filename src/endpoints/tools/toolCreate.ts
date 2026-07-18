import { D1CreateEndpoint } from "chanfana";
import { HandleArgs } from "../../types";
import { ToolModel } from "./base";

export class ToolCreate extends D1CreateEndpoint<HandleArgs> {
	_meta = {
		model: ToolModel,
		fields: ToolModel.schema.omit({ id: true, created_at: true, updated_at: true }),
	};
}
