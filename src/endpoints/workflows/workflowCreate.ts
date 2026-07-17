import { D1CreateEndpoint } from "chanfana";
import { HandleArgs } from "../../types";
import { WorkflowModel } from "./base";

export class WorkflowCreate extends D1CreateEndpoint<HandleArgs> {
	_meta = {
		model: WorkflowModel,
		fields: WorkflowModel.schema.omit({ id: true, created_at: true, updated_at: true }),
	};
}
