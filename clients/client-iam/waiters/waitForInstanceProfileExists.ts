import { IAMClient } from "../IAMClient";
import { GetInstanceProfileCommand, GetInstanceProfileCommandInput } from "../commands/GetInstanceProfileCommand";
import { IAMClientWaiter } from "./Interfaces";
import { WaiterResult, WaiterState, createWaiter } from "@aws-sdk/util-waiter";

const checkState = async (client: IAMClient, input: GetInstanceProfileCommandInput): Promise<WaiterResult> => {
  try {
    let result: any = await client.send(new GetInstanceProfileCommand(input));
    return { state: WaiterState.SUCCESS };
  } catch (exception) {
    if (exception.name && exception.name == "NoSuchEntityException") {
      return { state: WaiterState.RETRY };
    }
  }
  return { state: WaiterState.RETRY };
};
/**
 *
 * @param params : waiter configuration options.
 * @param input : the input to GetInstanceProfileCommand for polling.
 */
const waitForInstanceProfileExists = async (
  params: IAMClientWaiter,
  input: GetInstanceProfileCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 1, maxDelay: 120 };
  return createWaiter({ ...serviceDefaults, ...params }, params.client, input, checkState);
};
