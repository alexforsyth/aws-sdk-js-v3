import { OpsWorksClient } from "../OpsWorksClient";
import { DescribeAppsCommand, DescribeAppsCommandInput } from "../commands/DescribeAppsCommand";
import { OpsWorksClientWaiter } from "./Interfaces";
import { WaiterResult, WaiterState, createWaiter } from "@aws-sdk/util-waiter";

const checkState = async (client: OpsWorksClient, input: DescribeAppsCommandInput): Promise<WaiterResult> => {
  try {
    let result: any = await client.send(new DescribeAppsCommand(input));
    return { state: WaiterState.SUCCESS };
  } catch (exception) {
    return { state: WaiterState.FAILURE };
  }
  return { state: WaiterState.RETRY };
};
/**
 *
 * @param params : waiter configuration options.
 * @param input : the input to DescribeAppsCommand for polling.
 */
const waitForAppExists = async (
  params: OpsWorksClientWaiter,
  input: DescribeAppsCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 1, maxDelay: 120 };
  return createWaiter({ ...serviceDefaults, ...params }, params.client, input, checkState);
};
