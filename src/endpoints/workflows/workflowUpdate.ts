import { D1UpdateEndpoint } from "chanfana";
import { HandleArgs } from "../../types";
import { WorkflowModel } from "./base";

export class WorkflowUpdate extends D1UpdateEndpoint<HandleArgs> {
	_meta = {
		model: WorkflowModel,
		fields: WorkflowModel.schema.omit({ id: true, created_at: true, updated_at: true }),
	};
}
