import { D1UpdateEndpoint } from "chanfana";
import { HandleArgs } from "../../types";
import { ToolModel } from "./base";

export class ToolUpdate extends D1UpdateEndpoint<HandleArgs> {
	_meta = {
		model: ToolModel,
		fields: ToolModel.schema.omit({ id: true, created_at: true, updated_at: true }),
	};
}
