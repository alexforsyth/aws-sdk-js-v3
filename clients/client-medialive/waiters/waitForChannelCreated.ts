import { MediaLiveClient } from "../MediaLiveClient";
import { DescribeChannelCommand, DescribeChannelCommandInput } from "../commands/DescribeChannelCommand";
import { MediaLiveClientWaiter } from "./Interfaces";
import { WaiterResult, WaiterState, createWaiter } from "@aws-sdk/util-waiter";

const checkState = async (client: MediaLiveClient, input: DescribeChannelCommandInput): Promise<WaiterResult> => {
  try {
    let result: any = await client.send(new DescribeChannelCommand(input));
    try {
      let returnComparer = () => {
        return result.State;
      };
      if (returnComparer() === "IDLE") {
        return { state: WaiterState.SUCCESS };
      }
    } catch (e) {}
    try {
      let returnComparer = () => {
        return result.State;
      };
      if (returnComparer() === "CREATING") {
        return { state: WaiterState.RETRY };
      }
    } catch (e) {}
    try {
      let returnComparer = () => {
        return result.State;
      };
      if (returnComparer() === "CREATE_FAILED") {
        return { state: WaiterState.FAILURE };
      }
    } catch (e) {}
  } catch (exception) {
    if (exception.name && exception.name == "InternalServerErrorException") {
      return { state: WaiterState.RETRY };
    }
  }
  return { state: WaiterState.RETRY };
};
/**
 * Wait until a channel has been created
 * @param params : waiter configuration options.
 * @param input : the input to DescribeChannelCommand for polling.
 */
const waitForChannelCreated = async (
  params: MediaLiveClientWaiter,
  input: DescribeChannelCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 3, maxDelay: 120 };
  return createWaiter({ ...serviceDefaults, ...params }, params.client, input, checkState);
};
