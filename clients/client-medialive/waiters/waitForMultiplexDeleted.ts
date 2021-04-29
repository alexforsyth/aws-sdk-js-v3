import { MediaLiveClient } from "../MediaLiveClient";
import { DescribeMultiplexCommand, DescribeMultiplexCommandInput } from "../commands/DescribeMultiplexCommand";
import { WaiterConfiguration, WaiterResult, WaiterState, createWaiter } from "@aws-sdk/util-waiter";

const checkState = async (client: MediaLiveClient, input: DescribeMultiplexCommandInput): Promise<WaiterResult> => {
  let reason;
  try {
    let result: any = await client.send(new DescribeMultiplexCommand(input));
    reason = result;
    try {
      let returnComparator = () => {
        return result.State;
      };
      if (returnComparator() === "DELETED") {
        return { state: WaiterState.SUCCESS, reason };
      }
    } catch (e) {}
    try {
      let returnComparator = () => {
        return result.State;
      };
      if (returnComparator() === "DELETING") {
        return { state: WaiterState.RETRY, reason };
      }
    } catch (e) {}
  } catch (exception) {
    reason = exception;
    if (exception.name && exception.name == "InternalServerErrorException") {
      return { state: WaiterState.RETRY, reason };
    }
  }
  return { state: WaiterState.RETRY, reason };
};
/**
 * Wait until a multiplex has been deleted
 *  @deprecated in favor of waitUntilMultiplexDeleted. This does not throw on failure.
 *  @param params : Waiter configuration options.
 *  @param input : the input to DescribeMultiplexCommand for polling.
 */
export const waitForMultiplexDeleted = async (
  params: WaiterConfiguration<MediaLiveClient>,
  input: DescribeMultiplexCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 5, maxDelay: 120 };
  return createWaiter({ ...serviceDefaults, ...params }, input, checkState);
};
/**
 * Wait until a multiplex has been deleted
 *  @param params : Waiter configuration options.
 *  @param input : the input to DescribeMultiplexCommand for polling.
 */
export const waitUntilMultiplexDeleted = async (
  params: WaiterConfiguration<MediaLiveClient>,
  input: DescribeMultiplexCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 5, maxDelay: 120 };
  const result = await createWaiter({ ...serviceDefaults, ...params }, input, checkState);
  if (result.state !== WaiterState.SUCCESS) {
    throw Object.assign(new Error(result.state), result.reason);
  }
  return result;
};
