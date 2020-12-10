import { EMRClient } from "../EMRClient";
import { DescribeStepCommand, DescribeStepCommandInput } from "../commands/DescribeStepCommand";
import { EMRClientWaiter } from "./Interfaces";
import { WaiterResult, WaiterState, createWaiter } from "@aws-sdk/util-waiter";

const checkState = async (client: EMRClient, input: DescribeStepCommandInput): Promise<WaiterResult> => {
  try {
    let result: any = await client.send(new DescribeStepCommand(input));
    try {
      let returnComparer = () => {
        return result.Step.Status.State;
      };
      if (returnComparer() === "COMPLETED") {
        return { state: WaiterState.SUCCESS };
      }
    } catch (e) {}
    try {
      let returnComparer = () => {
        return result.Step.Status.State;
      };
      if (returnComparer() === "FAILED") {
        return { state: WaiterState.FAILURE };
      }
    } catch (e) {}
    try {
      let returnComparer = () => {
        return result.Step.Status.State;
      };
      if (returnComparer() === "CANCELLED") {
        return { state: WaiterState.FAILURE };
      }
    } catch (e) {}
  } catch (exception) {}
  return { state: WaiterState.RETRY };
};
/**
 *
 * @param params : waiter configuration options.
 * @param input : the input to DescribeStepCommand for polling.
 */
const waitForStepComplete = async (params: EMRClientWaiter, input: DescribeStepCommandInput): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 30, maxDelay: 120 };
  return createWaiter({ ...serviceDefaults, ...params }, params.client, input, checkState);
};
