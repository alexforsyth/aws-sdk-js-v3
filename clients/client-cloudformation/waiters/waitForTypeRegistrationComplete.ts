import { CloudFormationClient } from "../CloudFormationClient";
import {
  DescribeTypeRegistrationCommand,
  DescribeTypeRegistrationCommandInput,
} from "../commands/DescribeTypeRegistrationCommand";
import { CloudFormationClientWaiter } from "./Interfaces";
import { WaiterResult, WaiterState, createWaiter } from "@aws-sdk/util-waiter";

const checkState = async (
  client: CloudFormationClient,
  input: DescribeTypeRegistrationCommandInput
): Promise<WaiterResult> => {
  try {
    let result: any = await client.send(new DescribeTypeRegistrationCommand(input));
    try {
      let returnComparer = () => {
        return result.ProgressStatus;
      };
      if (returnComparer() === "COMPLETE") {
        return { state: WaiterState.SUCCESS };
      }
    } catch (e) {}
    try {
      let returnComparer = () => {
        return result.ProgressStatus;
      };
      if (returnComparer() === "FAILED") {
        return { state: WaiterState.FAILURE };
      }
    } catch (e) {}
  } catch (exception) {}
  return { state: WaiterState.RETRY };
};
/**
 * Wait until type registration is COMPLETE.
 * @param params : waiter configuration options.
 * @param input : the input to DescribeTypeRegistrationCommand for polling.
 */
const waitForTypeRegistrationComplete = async (
  params: CloudFormationClientWaiter,
  input: DescribeTypeRegistrationCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 30, maxDelay: 120 };
  return createWaiter({ ...serviceDefaults, ...params }, params.client, input, checkState);
};
