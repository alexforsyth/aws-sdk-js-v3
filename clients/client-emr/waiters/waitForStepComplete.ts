import { EMRClient } from "../EMRClient";
import { DescribeStepCommand, DescribeStepCommandInput } from "../commands/DescribeStepCommand";
import { WaiterConfiguration, WaiterResult, WaiterState, createWaiter } from "@aws-sdk/util-waiter";

const checkState = async (client: EMRClient, input: DescribeStepCommandInput): Promise<WaiterResult> => {
  let reason;
  try {
    let result: any = await client.send(new DescribeStepCommand(input));
    reason = result;
    try {
      let returnComparator = () => {
        return result.Step.Status.State;
      };
      if (returnComparator() === "COMPLETED") {
        return { state: WaiterState.SUCCESS, reason };
      }
    } catch (e) {}
    try {
      let returnComparator = () => {
        return result.Step.Status.State;
      };
      if (returnComparator() === "FAILED") {
        return { state: WaiterState.FAILURE, reason };
      }
    } catch (e) {}
    try {
      let returnComparator = () => {
        return result.Step.Status.State;
      };
      if (returnComparator() === "CANCELLED") {
        return { state: WaiterState.FAILURE, reason };
      }
    } catch (e) {}
  } catch (exception) {
    reason = exception;
  }
  return { state: WaiterState.RETRY, reason };
};
/**
 *
 *  @deprecated in favor of waitUntilStepComplete. This does not throw on failure.
 *  @param params : Waiter configuration options.
 *  @param input : the input to DescribeStepCommand for polling.
 */
export const waitForStepComplete = async (
  params: WaiterConfiguration<EMRClient>,
  input: DescribeStepCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 30, maxDelay: 120 };
  return createWaiter({ ...serviceDefaults, ...params }, input, checkState);
};
/**
 *
 *  @param params : Waiter configuration options.
 *  @param input : the input to DescribeStepCommand for polling.
 */
export const waitUntilStepComplete = async (
  params: WaiterConfiguration<EMRClient>,
  input: DescribeStepCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 30, maxDelay: 120 };
  const result = await createWaiter({ ...serviceDefaults, ...params }, input, checkState);
  if (result.state !== WaiterState.SUCCESS) {
    throw Object.assign(new Error(result.state), result.reason);
  }
  return result;
};
