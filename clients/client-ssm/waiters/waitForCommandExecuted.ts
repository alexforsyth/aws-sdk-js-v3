import { SSMClient } from "../SSMClient";
import { GetCommandInvocationCommand, GetCommandInvocationCommandInput } from "../commands/GetCommandInvocationCommand";
import { WaiterConfiguration, WaiterResult, WaiterState, checkExceptions, createWaiter } from "@aws-sdk/util-waiter";

const checkState = async (client: SSMClient, input: GetCommandInvocationCommandInput): Promise<WaiterResult> => {
  let reason;
  try {
    let result: any = await client.send(new GetCommandInvocationCommand(input));
    reason = result;
    try {
      let returnComparator = () => {
        return result.Status;
      };
      if (returnComparator() === "Pending") {
        return { state: WaiterState.RETRY, reason };
      }
    } catch (e) {}
    try {
      let returnComparator = () => {
        return result.Status;
      };
      if (returnComparator() === "InProgress") {
        return { state: WaiterState.RETRY, reason };
      }
    } catch (e) {}
    try {
      let returnComparator = () => {
        return result.Status;
      };
      if (returnComparator() === "Delayed") {
        return { state: WaiterState.RETRY, reason };
      }
    } catch (e) {}
    try {
      let returnComparator = () => {
        return result.Status;
      };
      if (returnComparator() === "Success") {
        return { state: WaiterState.SUCCESS, reason };
      }
    } catch (e) {}
    try {
      let returnComparator = () => {
        return result.Status;
      };
      if (returnComparator() === "Cancelled") {
        return { state: WaiterState.FAILURE, reason };
      }
    } catch (e) {}
    try {
      let returnComparator = () => {
        return result.Status;
      };
      if (returnComparator() === "TimedOut") {
        return { state: WaiterState.FAILURE, reason };
      }
    } catch (e) {}
    try {
      let returnComparator = () => {
        return result.Status;
      };
      if (returnComparator() === "Failed") {
        return { state: WaiterState.FAILURE, reason };
      }
    } catch (e) {}
    try {
      let returnComparator = () => {
        return result.Status;
      };
      if (returnComparator() === "Cancelling") {
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
 *  @deprecated In favor of waitUntilCommandExecuted. This does not throw on failure.
 *  @param params - Waiter configuration options.
 *  @param input - The input to GetCommandInvocationCommand for polling.
 */
export const waitForCommandExecuted = async (
  params: WaiterConfiguration<SSMClient>,
  input: GetCommandInvocationCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 5, maxDelay: 120 };
  return createWaiter({ ...serviceDefaults, ...params }, input, checkState);
};
/**
 *
 *  @param params - Waiter configuration options.
 *  @param input - The input to GetCommandInvocationCommand for polling.
 */
export const waitUntilCommandExecuted = async (
  params: WaiterConfiguration<SSMClient>,
  input: GetCommandInvocationCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 5, maxDelay: 120 };
  const result = await createWaiter({ ...serviceDefaults, ...params }, input, checkState);
  return checkExceptions(result);
};
