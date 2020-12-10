import { CloudFrontClient } from "../CloudFrontClient";
import { GetDistributionCommand, GetDistributionCommandInput } from "../commands/GetDistributionCommand";
import { CloudFrontClientWaiter } from "./Interfaces";
import { WaiterResult, WaiterState, createWaiter } from "@aws-sdk/util-waiter";

const checkState = async (client: CloudFrontClient, input: GetDistributionCommandInput): Promise<WaiterResult> => {
  try {
    let result: any = await client.send(new GetDistributionCommand(input));
    try {
      let returnComparer = () => {
        return result.Distribution.Status;
      };
      if (returnComparer() === "Deployed") {
        return { state: WaiterState.SUCCESS };
      }
    } catch (e) {}
  } catch (exception) {}
  return { state: WaiterState.RETRY };
};
/**
 * Wait until a distribution is deployed.
 * @param params : waiter configuration options.
 * @param input : the input to GetDistributionCommand for polling.
 */
const waitForDistributionDeployed = async (
  params: CloudFrontClientWaiter,
  input: GetDistributionCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 60, maxDelay: 120 };
  return createWaiter({ ...serviceDefaults, ...params }, params.client, input, checkState);
};
