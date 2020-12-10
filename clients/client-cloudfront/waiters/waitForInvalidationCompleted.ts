import { CloudFrontClient } from "../CloudFrontClient";
import { GetInvalidationCommand, GetInvalidationCommandInput } from "../commands/GetInvalidationCommand";
import { CloudFrontClientWaiter } from "./Interfaces";
import { WaiterResult, WaiterState, createWaiter } from "@aws-sdk/util-waiter";

const checkState = async (client: CloudFrontClient, input: GetInvalidationCommandInput): Promise<WaiterResult> => {
  try {
    let result: any = await client.send(new GetInvalidationCommand(input));
    try {
      let returnComparer = () => {
        return result.Invalidation.Status;
      };
      if (returnComparer() === "Completed") {
        return { state: WaiterState.SUCCESS };
      }
    } catch (e) {}
  } catch (exception) {}
  return { state: WaiterState.RETRY };
};
/**
 * Wait until an invalidation has completed.
 * @param params : waiter configuration options.
 * @param input : the input to GetInvalidationCommand for polling.
 */
const waitForInvalidationCompleted = async (
  params: CloudFrontClientWaiter,
  input: GetInvalidationCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 20, maxDelay: 120 };
  return createWaiter({ ...serviceDefaults, ...params }, params.client, input, checkState);
};
