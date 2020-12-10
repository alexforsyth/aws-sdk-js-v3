import { MediaLiveClient } from "../MediaLiveClient";
import { DescribeMultiplexCommand, DescribeMultiplexCommandInput } from "../commands/DescribeMultiplexCommand";
import { MediaLiveClientWaiter } from "./Interfaces";
import { WaiterResult, WaiterState, createWaiter } from "@aws-sdk/util-waiter";

const checkState = async (client: MediaLiveClient, input: DescribeMultiplexCommandInput): Promise<WaiterResult> => {
  try {
    let result: any = await client.send(new DescribeMultiplexCommand(input));
    try {
      let returnComparer = () => {
        return result.State;
      };
      if (returnComparer() === "RUNNING") {
        return { state: WaiterState.SUCCESS };
      }
    } catch (e) {}
    try {
      let returnComparer = () => {
        return result.State;
      };
      if (returnComparer() === "STARTING") {
        return { state: WaiterState.RETRY };
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
 * Wait until a multiplex is running
 * @param params : waiter configuration options.
 * @param input : the input to DescribeMultiplexCommand for polling.
 */
const waitForMultiplexRunning = async (
  params: MediaLiveClientWaiter,
  input: DescribeMultiplexCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 5, maxDelay: 120 };
  return createWaiter({ ...serviceDefaults, ...params }, params.client, input, checkState);
};
