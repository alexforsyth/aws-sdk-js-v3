import { S3Client } from "../S3Client";
import { HeadBucketCommand, HeadBucketCommandInput } from "../commands/HeadBucketCommand";
import { S3ClientWaiter } from "./Interfaces";
import { WaiterResult, WaiterState, createWaiter } from "@aws-sdk/util-waiter";

const checkState = async (client: S3Client, input: HeadBucketCommandInput): Promise<WaiterResult> => {
  try {
    let result: any = await client.send(new HeadBucketCommand(input));
    return { state: WaiterState.SUCCESS };
  } catch (exception) {
    if (exception.name && exception.name == "NoSuchBucket") {
      return { state: WaiterState.RETRY };
    }
  }
  return { state: WaiterState.RETRY };
};
/**
 *
 * @param params : waiter configuration options.
 * @param input : the input to HeadBucketCommand for polling.
 */
const waitForBucketExists = async (params: S3ClientWaiter, input: HeadBucketCommandInput): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 5, maxDelay: 120 };
  return createWaiter({ ...serviceDefaults, ...params }, params.client, input, checkState);
};
