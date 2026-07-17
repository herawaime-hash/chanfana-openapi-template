import { D1ListEndpoint } from "chanfana";
import { HandleArgs } from "../../types";
import { WorkflowModel } from "./base";

export class WorkflowList extends D1ListEndpoint<HandleArgs> {
	_meta = {
		model: WorkflowModel,
		fields: WorkflowModel.schema,
	};
}
