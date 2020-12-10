import { CloudFormationClient } from "../CloudFormationClient";
import { DescribeStacksCommand, DescribeStacksCommandInput } from "../commands/DescribeStacksCommand";
import { CloudFormationClientWaiter } from "./Interfaces";
import { WaiterResult, WaiterState, createWaiter } from "@aws-sdk/util-waiter";

const checkState = async (client: CloudFormationClient, input: DescribeStacksCommandInput): Promise<WaiterResult> => {
  try {
    let result: any = await client.send(new DescribeStacksCommand(input));
    return { state: WaiterState.SUCCESS };
  } catch (exception) {
    if (exception.name && exception.name == "ValidationError") {
      return { state: WaiterState.RETRY };
    }
  }
  return { state: WaiterState.RETRY };
};
/**
 *
 * @param params : waiter configuration options.
 * @param input : the input to DescribeStacksCommand for polling.
 */
const waitForStackExists = async (
  params: CloudFormationClientWaiter,
  input: DescribeStacksCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 5, maxDelay: 120 };
  return createWaiter({ ...serviceDefaults, ...params }, params.client, input, checkState);
};
