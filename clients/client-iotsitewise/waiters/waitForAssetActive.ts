import { IoTSiteWiseClient } from "../IoTSiteWiseClient";
import { DescribeAssetCommand, DescribeAssetCommandInput } from "../commands/DescribeAssetCommand";
import { IoTSiteWiseClientWaiter } from "./Interfaces";
import { WaiterResult, WaiterState, createWaiter } from "@aws-sdk/util-waiter";

const checkState = async (client: IoTSiteWiseClient, input: DescribeAssetCommandInput): Promise<WaiterResult> => {
  try {
    let result: any = await client.send(new DescribeAssetCommand(input));
    try {
      let returnComparer = () => {
        return result.assetStatus.state;
      };
      if (returnComparer() === "ACTIVE") {
        return { state: WaiterState.SUCCESS };
      }
    } catch (e) {}
    try {
      let returnComparer = () => {
        return result.assetStatus.state;
      };
      if (returnComparer() === "FAILED") {
        return { state: WaiterState.FAILURE };
      }
    } catch (e) {}
  } catch (exception) {}
  return { state: WaiterState.RETRY };
};
/**
 *
 * @param params : waiter configuration options.
 * @param input : the input to DescribeAssetCommand for polling.
 */
const waitForAssetActive = async (
  params: IoTSiteWiseClientWaiter,
  input: DescribeAssetCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 3, maxDelay: 120 };
  return createWaiter({ ...serviceDefaults, ...params }, params.client, input, checkState);
};
