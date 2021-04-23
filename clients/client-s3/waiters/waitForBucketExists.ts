import { S3Client } from "../S3Client";
import { HeadBucketCommand, HeadBucketCommandInput } from "../commands/HeadBucketCommand";
import { WaiterConfiguration, WaiterResult, WaiterState, createWaiter } from "@aws-sdk/util-waiter";

const checkState = async (client: S3Client, input: HeadBucketCommandInput): Promise<WaiterResult> => {
  let reason;
  try {
    let result: any = await client.send(new HeadBucketCommand(input));
    reason = result;
    return { state: WaiterState.SUCCESS, reason };
  } catch (exception) {
    reason = exception;
    if (exception.name && exception.name == "NotFound") {
      return { state: WaiterState.RETRY, reason };
    }
  }
  return { state: WaiterState.RETRY, reason };
};
/**
 *
 *  @deprecated in favor of waitUntilBucketExists. This does not throw on failure.
 *  @param params : Waiter configuration options.
 *  @param input : the input to HeadBucketCommand for polling.
 */
export const waitForBucketExists = async (
  params: WaiterConfiguration<S3Client>,
  input: HeadBucketCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 5, maxDelay: 120 };
  return createWaiter({ ...serviceDefaults, ...params }, input, checkState);
};
/**
 *
 *  @param params : Waiter configuration options.
 *  @param input : the input to HeadBucketCommand for polling.
 */
export const waitUntilBucketExists = async (
  params: WaiterConfiguration<S3Client>,
  input: HeadBucketCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 5, maxDelay: 120 };
  const result = await createWaiter({ ...serviceDefaults, ...params }, input, checkState);
  if (result.state != WaiterState.SUCCESS) {
    throw result;
  }
  return result;
};
