import { IoTSiteWiseClient } from "../IoTSiteWiseClient";
import { DescribeAssetModelCommand, DescribeAssetModelCommandInput } from "../commands/DescribeAssetModelCommand";
import { WaiterConfiguration, WaiterResult, WaiterState, createWaiter } from "@aws-sdk/util-waiter";

const checkState = async (client: IoTSiteWiseClient, input: DescribeAssetModelCommandInput): Promise<WaiterResult> => {
  let reason;
  try {
    let result: any = await client.send(new DescribeAssetModelCommand(input));
    reason = result;
    try {
      let returnComparator = () => {
        return result.assetModelStatus.state;
      };
      if (returnComparator() === "ACTIVE") {
        return { state: WaiterState.SUCCESS, reason };
      }
    } catch (e) {}
    try {
      let returnComparator = () => {
        return result.assetModelStatus.state;
      };
      if (returnComparator() === "FAILED") {
        return { state: WaiterState.FAILURE, reason };
      }
    } catch (e) {}
  } catch (exception) {
    reason = exception;
  }
  return { state: WaiterState.RETRY, reason };
};
/**
 *
 *  @deprecated in favor of waitUntilAssetModelActive. This does not throw on failure.
 *  @param params : Waiter configuration options.
 *  @param input : the input to DescribeAssetModelCommand for polling.
 */
export const waitForAssetModelActive = async (
  params: WaiterConfiguration<IoTSiteWiseClient>,
  input: DescribeAssetModelCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 3, maxDelay: 120 };
  return createWaiter({ ...serviceDefaults, ...params }, input, checkState);
};
/**
 *
 *  @param params : Waiter configuration options.
 *  @param input : the input to DescribeAssetModelCommand for polling.
 */
export const waitUntilAssetModelActive = async (
  params: WaiterConfiguration<IoTSiteWiseClient>,
  input: DescribeAssetModelCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 3, maxDelay: 120 };
  const result = await createWaiter({ ...serviceDefaults, ...params }, input, checkState);
  if (result.state != WaiterState.SUCCESS) {
    throw result;
  }
  return result;
};
