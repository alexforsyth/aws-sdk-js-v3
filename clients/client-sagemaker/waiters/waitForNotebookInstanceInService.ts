import { SageMakerClient } from "../SageMakerClient";
import {
  DescribeNotebookInstanceCommand,
  DescribeNotebookInstanceCommandInput,
} from "../commands/DescribeNotebookInstanceCommand";
import { WaiterConfiguration, WaiterResult, WaiterState, createWaiter } from "@aws-sdk/util-waiter";

const checkState = async (
  client: SageMakerClient,
  input: DescribeNotebookInstanceCommandInput
): Promise<WaiterResult> => {
  let reason;
  try {
    let result: any = await client.send(new DescribeNotebookInstanceCommand(input));
    reason = result;
    try {
      let returnComparator = () => {
        return result.NotebookInstanceStatus;
      };
      if (returnComparator() === "InService") {
        return { state: WaiterState.SUCCESS, reason };
      }
    } catch (e) {}
    try {
      let returnComparator = () => {
        return result.NotebookInstanceStatus;
      };
      if (returnComparator() === "Failed") {
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
 *  @deprecated in favor of waitUntilNotebookInstanceInService. This does not throw on failure.
 *  @param params : Waiter configuration options.
 *  @param input : the input to DescribeNotebookInstanceCommand for polling.
 */
export const waitForNotebookInstanceInService = async (
  params: WaiterConfiguration<SageMakerClient>,
  input: DescribeNotebookInstanceCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 30, maxDelay: 120 };
  return createWaiter({ ...serviceDefaults, ...params }, input, checkState);
};
/**
 *
 *  @param params : Waiter configuration options.
 *  @param input : the input to DescribeNotebookInstanceCommand for polling.
 */
export const waitUntilNotebookInstanceInService = async (
  params: WaiterConfiguration<SageMakerClient>,
  input: DescribeNotebookInstanceCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 30, maxDelay: 120 };
  const result = await createWaiter({ ...serviceDefaults, ...params }, input, checkState);
  if (result.state !== WaiterState.SUCCESS) {
    throw Object.assign(new Error(result.state), result.reason);
  }
  return result;
};
