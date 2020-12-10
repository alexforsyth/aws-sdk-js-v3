import { IoTSiteWiseClient } from "../IoTSiteWiseClient";
import { DescribePortalCommand, DescribePortalCommandInput } from "../commands/DescribePortalCommand";
import { IoTSiteWiseClientWaiter } from "./Interfaces";
import { WaiterResult, WaiterState, createWaiter } from "@aws-sdk/util-waiter";

const checkState = async (client: IoTSiteWiseClient, input: DescribePortalCommandInput): Promise<WaiterResult> => {
  try {
    let result: any = await client.send(new DescribePortalCommand(input));
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
 * @param input : the input to DescribePortalCommand for polling.
 */
const waitForPortalNotExists = async (
  params: IoTSiteWiseClientWaiter,
  input: DescribePortalCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 3, maxDelay: 120 };
  return createWaiter({ ...serviceDefaults, ...params }, params.client, input, checkState);
};
