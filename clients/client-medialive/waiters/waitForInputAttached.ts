import { MediaLiveClient } from "../MediaLiveClient";
import { DescribeInputCommand, DescribeInputCommandInput } from "../commands/DescribeInputCommand";
import { WaiterConfiguration, WaiterResult, WaiterState, createWaiter } from "@aws-sdk/util-waiter";

const checkState = async (client: MediaLiveClient, input: DescribeInputCommandInput): Promise<WaiterResult> => {
  let reason;
  try {
    let result: any = await client.send(new DescribeInputCommand(input));
    reason = result;
    try {
      let returnComparator = () => {
        return result.State;
      };
      if (returnComparator() === "ATTACHED") {
        return { state: WaiterState.SUCCESS, reason };
      }
    } catch (e) {}
    try {
      let returnComparator = () => {
        return result.State;
      };
      if (returnComparator() === "DETACHED") {
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
 * Wait until an input has been attached
 *  @deprecated in favor of waitUntilInputAttached. This does not throw on failure.
 *  @param params : Waiter configuration options.
 *  @param input : the input to DescribeInputCommand for polling.
 */
export const waitForInputAttached = async (
  params: WaiterConfiguration<MediaLiveClient>,
  input: DescribeInputCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 5, maxDelay: 120 };
  return createWaiter({ ...serviceDefaults, ...params }, input, checkState);
};
/**
 * Wait until an input has been attached
 *  @param params : Waiter configuration options.
 *  @param input : the input to DescribeInputCommand for polling.
 */
export const waitUntilInputAttached = async (
  params: WaiterConfiguration<MediaLiveClient>,
  input: DescribeInputCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 5, maxDelay: 120 };
  const result = await createWaiter({ ...serviceDefaults, ...params }, input, checkState);
  if (result.state !== WaiterState.SUCCESS) {
    throw Object.assign(new Error(result.state), result.reason);
  }
  return result;
};
