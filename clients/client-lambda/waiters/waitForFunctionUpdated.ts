import { LambdaClient } from "../LambdaClient";
import {
  GetFunctionConfigurationCommand,
  GetFunctionConfigurationCommandInput,
} from "../commands/GetFunctionConfigurationCommand";
import { LambdaClientWaiter } from "./Interfaces";
import { WaiterResult, WaiterState, createWaiter } from "@aws-sdk/util-waiter";

const checkState = async (client: LambdaClient, input: GetFunctionConfigurationCommandInput): Promise<WaiterResult> => {
  try {
    let result: any = await client.send(new GetFunctionConfigurationCommand(input));
    try {
      let returnComparer = () => {
        return result.LastUpdateStatus;
      };
      if (returnComparer() === "Successful") {
        return { state: WaiterState.SUCCESS };
      }
    } catch (e) {}
    try {
      let returnComparer = () => {
        return result.LastUpdateStatus;
      };
      if (returnComparer() === "Failed") {
        return { state: WaiterState.FAILURE };
      }
    } catch (e) {}
    try {
      let returnComparer = () => {
        return result.LastUpdateStatus;
      };
      if (returnComparer() === "InProgress") {
        return { state: WaiterState.RETRY };
      }
    } catch (e) {}
  } catch (exception) {}
  return { state: WaiterState.RETRY };
};
/**
 * Waits for the function's LastUpdateStatus to be Successful.
 * @param params : waiter configuration options.
 * @param input : the input to GetFunctionConfigurationCommand for polling.
 */
const waitForFunctionUpdated = async (
  params: LambdaClientWaiter,
  input: GetFunctionConfigurationCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 5, maxDelay: 120 };
  return createWaiter({ ...serviceDefaults, ...params }, params.client, input, checkState);
};
