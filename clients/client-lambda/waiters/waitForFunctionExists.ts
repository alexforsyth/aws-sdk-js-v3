import { LambdaClient } from "../LambdaClient";
import { GetFunctionCommand, GetFunctionCommandInput } from "../commands/GetFunctionCommand";
import { WaiterConfiguration, WaiterResult, WaiterState, createWaiter } from "@aws-sdk/util-waiter";

const checkState = async (client: LambdaClient, input: GetFunctionCommandInput): Promise<WaiterResult> => {
  let reason;
  try {
    let result: any = await client.send(new GetFunctionCommand(input));
    reason = result;
    return { state: WaiterState.SUCCESS, reason };
  } catch (exception) {
    reason = exception;
    if (exception.name && exception.name == "ResourceNotFoundException") {
      return { state: WaiterState.RETRY, reason };
    }
  }
  return { state: WaiterState.RETRY, reason };
};
/**
 *
 *  @deprecated in favor of waitUntilFunctionExists. This does not throw on failure.
 *  @param params : Waiter configuration options.
 *  @param input : the input to GetFunctionCommand for polling.
 */
export const waitForFunctionExists = async (
  params: WaiterConfiguration<LambdaClient>,
  input: GetFunctionCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 1, maxDelay: 120 };
  return createWaiter({ ...serviceDefaults, ...params }, input, checkState);
};
/**
 *
 *  @param params : Waiter configuration options.
 *  @param input : the input to GetFunctionCommand for polling.
 */
export const waitUntilFunctionExists = async (
  params: WaiterConfiguration<LambdaClient>,
  input: GetFunctionCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 1, maxDelay: 120 };
  const result = await createWaiter({ ...serviceDefaults, ...params }, input, checkState);
  if (result.state != WaiterState.SUCCESS) {
    throw result;
  }
  return result;
};
