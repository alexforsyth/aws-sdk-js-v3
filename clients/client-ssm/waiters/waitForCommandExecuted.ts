import { SSMClient } from "../SSMClient";
import { GetCommandInvocationCommand, GetCommandInvocationCommandInput } from "../commands/GetCommandInvocationCommand";
import { SSMClientWaiter } from "./Interfaces";
import { WaiterResult, WaiterState, createWaiter } from "@aws-sdk/util-waiter";

const checkState = async (client: SSMClient, input: GetCommandInvocationCommandInput): Promise<WaiterResult> => {
  try {
    let result: any = await client.send(new GetCommandInvocationCommand(input));
    try {
      let returnComparer = () => {
        return result.Status;
      };
      if (returnComparer() === "Pending") {
        return { state: WaiterState.RETRY };
      }
    } catch (e) {}
    try {
      let returnComparer = () => {
        return result.Status;
      };
      if (returnComparer() === "InProgress") {
        return { state: WaiterState.RETRY };
      }
    } catch (e) {}
    try {
      let returnComparer = () => {
        return result.Status;
      };
      if (returnComparer() === "Delayed") {
        return { state: WaiterState.RETRY };
      }
    } catch (e) {}
    try {
      let returnComparer = () => {
        return result.Status;
      };
      if (returnComparer() === "Success") {
        return { state: WaiterState.SUCCESS };
      }
    } catch (e) {}
    try {
      let returnComparer = () => {
        return result.Status;
      };
      if (returnComparer() === "Cancelled") {
        return { state: WaiterState.FAILURE };
      }
    } catch (e) {}
    try {
      let returnComparer = () => {
        return result.Status;
      };
      if (returnComparer() === "TimedOut") {
        return { state: WaiterState.FAILURE };
      }
    } catch (e) {}
    try {
      let returnComparer = () => {
        return result.Status;
      };
      if (returnComparer() === "Failed") {
        return { state: WaiterState.FAILURE };
      }
    } catch (e) {}
    try {
      let returnComparer = () => {
        return result.Status;
      };
      if (returnComparer() === "Cancelling") {
        return { state: WaiterState.FAILURE };
      }
    } catch (e) {}
  } catch (exception) {}
  return { state: WaiterState.RETRY };
};
/**
 *
 * @param params : waiter configuration options.
 * @param input : the input to GetCommandInvocationCommand for polling.
 */
const waitForCommandExecuted = async (
  params: SSMClientWaiter,
  input: GetCommandInvocationCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 5, maxDelay: 120 };
  return createWaiter({ ...serviceDefaults, ...params }, params.client, input, checkState);
};
