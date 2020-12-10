import { ECRClient } from "../ECRClient";
import {
  DescribeImageScanFindingsCommand,
  DescribeImageScanFindingsCommandInput,
} from "../commands/DescribeImageScanFindingsCommand";
import { ECRClientWaiter } from "./Interfaces";
import { WaiterResult, WaiterState, createWaiter } from "@aws-sdk/util-waiter";

const checkState = async (client: ECRClient, input: DescribeImageScanFindingsCommandInput): Promise<WaiterResult> => {
  try {
    let result: any = await client.send(new DescribeImageScanFindingsCommand(input));
    try {
      let returnComparer = () => {
        return result.imageScanStatus.status;
      };
      if (returnComparer() === "COMPLETE") {
        return { state: WaiterState.SUCCESS };
      }
    } catch (e) {}
    try {
      let returnComparer = () => {
        return result.imageScanStatus.status;
      };
      if (returnComparer() === "FAILED") {
        return { state: WaiterState.FAILURE };
      }
    } catch (e) {}
  } catch (exception) {}
  return { state: WaiterState.RETRY };
};
/**
 * Wait until an image scan is complete and findings can be accessed
 * @param params : waiter configuration options.
 * @param input : the input to DescribeImageScanFindingsCommand for polling.
 */
const waitForImageScanComplete = async (
  params: ECRClientWaiter,
  input: DescribeImageScanFindingsCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 5, maxDelay: 120 };
  return createWaiter({ ...serviceDefaults, ...params }, params.client, input, checkState);
};
