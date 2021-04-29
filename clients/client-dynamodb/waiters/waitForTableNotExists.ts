import { DynamoDBClient } from "../DynamoDBClient";
import { DescribeTableCommand, DescribeTableCommandInput } from "../commands/DescribeTableCommand";
import { WaiterConfiguration, WaiterResult, WaiterState, createWaiter } from "@aws-sdk/util-waiter";

const checkState = async (client: DynamoDBClient, input: DescribeTableCommandInput): Promise<WaiterResult> => {
  let reason;
  try {
    let result: any = await client.send(new DescribeTableCommand(input));
    reason = result;
  } catch (exception) {
    reason = exception;
    if (exception.name && exception.name == "ResourceNotFoundException") {
      return { state: WaiterState.SUCCESS, reason };
    }
  }
  return { state: WaiterState.RETRY, reason };
};
/**
 *
 *  @deprecated in favor of waitUntilTableNotExists. This does not throw on failure.
 *  @param params : Waiter configuration options.
 *  @param input : the input to DescribeTableCommand for polling.
 */
export const waitForTableNotExists = async (
  params: WaiterConfiguration<DynamoDBClient>,
  input: DescribeTableCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 20, maxDelay: 120 };
  return createWaiter({ ...serviceDefaults, ...params }, input, checkState);
};
/**
 *
 *  @param params : Waiter configuration options.
 *  @param input : the input to DescribeTableCommand for polling.
 */
export const waitUntilTableNotExists = async (
  params: WaiterConfiguration<DynamoDBClient>,
  input: DescribeTableCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 20, maxDelay: 120 };
  const result = await createWaiter({ ...serviceDefaults, ...params }, input, checkState);
  if (result.state !== WaiterState.SUCCESS) {
    throw Object.assign(new Error(result.state), result.reason);
  }
  return result;
};
