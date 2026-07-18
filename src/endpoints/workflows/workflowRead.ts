import { D1ReadEndpoint } from "chanfana";
import { HandleArgs } from "../../types";
import { WorkflowModel } from "./base";

export class WorkflowRead extends D1ReadEndpoint<HandleArgs> {
	_meta = {
		model: WorkflowModel,
		fields: WorkflowModel.schema,
	};
}
