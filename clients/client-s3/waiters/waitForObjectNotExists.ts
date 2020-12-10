import { S3Client } from "../S3Client";
import { HeadObjectCommand, HeadObjectCommandInput } from "../commands/HeadObjectCommand";
import { S3ClientWaiter } from "./Interfaces";
import { WaiterResult, WaiterState, createWaiter } from "@aws-sdk/util-waiter";

const checkState = async (client: S3Client, input: HeadObjectCommandInput): Promise<WaiterResult> => {
  try {
    let result: any = await client.send(new HeadObjectCommand(input));
  } catch (exception) {
    if (exception.name && exception.name == "NoSuchKey") {
      return { state: WaiterState.SUCCESS };
    }
  }
  return { state: WaiterState.RETRY };
};
/**
 *
 * @param params : waiter configuration options.
 * @param input : the input to HeadObjectCommand for polling.
 */
const waitForObjectNotExists = async (params: S3ClientWaiter, input: HeadObjectCommandInput): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 5, maxDelay: 120 };
  return createWaiter({ ...serviceDefaults, ...params }, params.client, input, checkState);
};
