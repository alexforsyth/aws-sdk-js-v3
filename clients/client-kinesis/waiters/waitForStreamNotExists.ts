import { KinesisClient } from "../KinesisClient";
import { DescribeStreamCommand, DescribeStreamCommandInput } from "../commands/DescribeStreamCommand";
import { WaiterConfiguration, WaiterResult, WaiterState, createWaiter } from "@aws-sdk/util-waiter";

const checkState = async (client: KinesisClient, input: DescribeStreamCommandInput): Promise<WaiterResult> => {
  let reason;
  try {
    let result: any = await client.send(new DescribeStreamCommand(input));
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
 *  @deprecated in favor of waitUntilStreamNotExists. This does not throw on failure.
 *  @param params : Waiter configuration options.
 *  @param input : the input to DescribeStreamCommand for polling.
 */
export const waitForStreamNotExists = async (
  params: WaiterConfiguration<KinesisClient>,
  input: DescribeStreamCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 10, maxDelay: 120 };
  return createWaiter({ ...serviceDefaults, ...params }, input, checkState);
};
/**
 *
 *  @param params : Waiter configuration options.
 *  @param input : the input to DescribeStreamCommand for polling.
 */
export const waitUntilStreamNotExists = async (
  params: WaiterConfiguration<KinesisClient>,
  input: DescribeStreamCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 10, maxDelay: 120 };
  const result = await createWaiter({ ...serviceDefaults, ...params }, input, checkState);
  if (result.state != WaiterState.SUCCESS) {
    throw result;
  }
  return result;
};
