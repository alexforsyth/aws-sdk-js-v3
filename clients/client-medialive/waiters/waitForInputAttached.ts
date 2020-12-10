import { MediaLiveClient } from "../MediaLiveClient";
import { DescribeInputCommand, DescribeInputCommandInput } from "../commands/DescribeInputCommand";
import { MediaLiveClientWaiter } from "./Interfaces";
import { WaiterResult, WaiterState, createWaiter } from "@aws-sdk/util-waiter";

const checkState = async (client: MediaLiveClient, input: DescribeInputCommandInput): Promise<WaiterResult> => {
  try {
    let result: any = await client.send(new DescribeInputCommand(input));
    try {
      let returnComparer = () => {
        return result.State;
      };
      if (returnComparer() === "ATTACHED") {
        return { state: WaiterState.SUCCESS };
      }
    } catch (e) {}
    try {
      let returnComparer = () => {
        return result.State;
      };
      if (returnComparer() === "DETACHED") {
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
 * Wait until an input has been attached
 * @param params : waiter configuration options.
 * @param input : the input to DescribeInputCommand for polling.
 */
const waitForInputAttached = async (
  params: MediaLiveClientWaiter,
  input: DescribeInputCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 5, maxDelay: 120 };
  return createWaiter({ ...serviceDefaults, ...params }, params.client, input, checkState);
};
