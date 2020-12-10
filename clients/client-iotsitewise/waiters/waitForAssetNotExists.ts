import { IoTSiteWiseClient } from "../IoTSiteWiseClient";
import { DescribeAssetCommand, DescribeAssetCommandInput } from "../commands/DescribeAssetCommand";
import { IoTSiteWiseClientWaiter } from "./Interfaces";
import { WaiterResult, WaiterState, createWaiter } from "@aws-sdk/util-waiter";

const checkState = async (client: IoTSiteWiseClient, input: DescribeAssetCommandInput): Promise<WaiterResult> => {
  try {
    let result: any = await client.send(new DescribeAssetCommand(input));
  } catch (exception) {
    if (exception.name && exception.name == "ResourceNotFoundException") {
      return { state: WaiterState.SUCCESS };
    }
  }
  return { state: WaiterState.RETRY };
};
/**
 *
 * @param params : waiter configuration options.
 * @param input : the input to DescribeAssetCommand for polling.
 */
const waitForAssetNotExists = async (
  params: IoTSiteWiseClientWaiter,
  input: DescribeAssetCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 3, maxDelay: 120 };
  return createWaiter({ ...serviceDefaults, ...params }, params.client, input, checkState);
};
