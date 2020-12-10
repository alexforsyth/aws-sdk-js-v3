import { ECRClient } from "../ECRClient";
import {
  GetLifecyclePolicyPreviewCommand,
  GetLifecyclePolicyPreviewCommandInput,
} from "../commands/GetLifecyclePolicyPreviewCommand";
import { ECRClientWaiter } from "./Interfaces";
import { WaiterResult, WaiterState, createWaiter } from "@aws-sdk/util-waiter";

const checkState = async (client: ECRClient, input: GetLifecyclePolicyPreviewCommandInput): Promise<WaiterResult> => {
  try {
    let result: any = await client.send(new GetLifecyclePolicyPreviewCommand(input));
    try {
      let returnComparer = () => {
        return result.status;
      };
      if (returnComparer() === "COMPLETE") {
        return { state: WaiterState.SUCCESS };
      }
    } catch (e) {}
    try {
      let returnComparer = () => {
        return result.status;
      };
      if (returnComparer() === "FAILED") {
        return { state: WaiterState.FAILURE };
      }
    } catch (e) {}
  } catch (exception) {}
  return { state: WaiterState.RETRY };
};
/**
 * Wait until a lifecycle policy preview request is complete and results can be accessed
 * @param params : waiter configuration options.
 * @param input : the input to GetLifecyclePolicyPreviewCommand for polling.
 */
const waitForLifecyclePolicyPreviewComplete = async (
  params: ECRClientWaiter,
  input: GetLifecyclePolicyPreviewCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 5, maxDelay: 120 };
  return createWaiter({ ...serviceDefaults, ...params }, params.client, input, checkState);
};
