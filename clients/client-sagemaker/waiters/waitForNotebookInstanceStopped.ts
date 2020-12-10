import { SageMakerClient } from "../SageMakerClient";
import {
  DescribeNotebookInstanceCommand,
  DescribeNotebookInstanceCommandInput,
} from "../commands/DescribeNotebookInstanceCommand";
import { SageMakerClientWaiter } from "./Interfaces";
import { WaiterResult, WaiterState, createWaiter } from "@aws-sdk/util-waiter";

const checkState = async (
  client: SageMakerClient,
  input: DescribeNotebookInstanceCommandInput
): Promise<WaiterResult> => {
  try {
    let result: any = await client.send(new DescribeNotebookInstanceCommand(input));
    try {
      let returnComparer = () => {
        return result.NotebookInstanceStatus;
      };
      if (returnComparer() === "Stopped") {
        return { state: WaiterState.SUCCESS };
      }
    } catch (e) {}
    try {
      let returnComparer = () => {
        return result.NotebookInstanceStatus;
      };
      if (returnComparer() === "Failed") {
        return { state: WaiterState.FAILURE };
      }
    } catch (e) {}
  } catch (exception) {}
  return { state: WaiterState.RETRY };
};
/**
 *
 * @param params : waiter configuration options.
 * @param input : the input to DescribeNotebookInstanceCommand for polling.
 */
const waitForNotebookInstanceStopped = async (
  params: SageMakerClientWaiter,
  input: DescribeNotebookInstanceCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 30, maxDelay: 120 };
  return createWaiter({ ...serviceDefaults, ...params }, params.client, input, checkState);
};
