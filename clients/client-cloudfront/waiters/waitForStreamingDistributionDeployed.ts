import { CloudFrontClient } from "../CloudFrontClient";
import {
  GetStreamingDistributionCommand,
  GetStreamingDistributionCommandInput,
} from "../commands/GetStreamingDistributionCommand";
import { CloudFrontClientWaiter } from "./Interfaces";
import { WaiterResult, WaiterState, createWaiter } from "@aws-sdk/util-waiter";

const checkState = async (
  client: CloudFrontClient,
  input: GetStreamingDistributionCommandInput
): Promise<WaiterResult> => {
  try {
    let result: any = await client.send(new GetStreamingDistributionCommand(input));
    try {
      let returnComparer = () => {
        return result.StreamingDistribution.Status;
      };
      if (returnComparer() === "Deployed") {
        return { state: WaiterState.SUCCESS };
      }
    } catch (e) {}
  } catch (exception) {}
  return { state: WaiterState.RETRY };
};
/**
 * Wait until a streaming distribution is deployed.
 * @param params : waiter configuration options.
 * @param input : the input to GetStreamingDistributionCommand for polling.
 */
const waitForStreamingDistributionDeployed = async (
  params: CloudFrontClientWaiter,
  input: GetStreamingDistributionCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 60, maxDelay: 120 };
  return createWaiter({ ...serviceDefaults, ...params }, params.client, input, checkState);
};
