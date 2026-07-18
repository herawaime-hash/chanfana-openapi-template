import { D1DeleteEndpoint } from "chanfana";
import { HandleArgs } from "../../types";
import { WorkflowModel } from "./base";

export class WorkflowDelete extends D1DeleteEndpoint<HandleArgs> {
	_meta = {
		model: WorkflowModel,
		fields: WorkflowModel.schema,
	};
}
