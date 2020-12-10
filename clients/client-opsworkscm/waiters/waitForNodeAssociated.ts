import { OpsWorksCMClient } from "../OpsWorksCMClient";
import {
  DescribeNodeAssociationStatusCommand,
  DescribeNodeAssociationStatusCommandInput,
} from "../commands/DescribeNodeAssociationStatusCommand";
import { OpsWorksCMClientWaiter } from "./Interfaces";
import { WaiterResult, WaiterState, createWaiter } from "@aws-sdk/util-waiter";

const checkState = async (
  client: OpsWorksCMClient,
  input: DescribeNodeAssociationStatusCommandInput
): Promise<WaiterResult> => {
  try {
    let result: any = await client.send(new DescribeNodeAssociationStatusCommand(input));
    try {
      let returnComparer = () => {
        return result.NodeAssociationStatus;
      };
      if (returnComparer() === "SUCCESS") {
        return { state: WaiterState.SUCCESS };
      }
    } catch (e) {}
    try {
      let returnComparer = () => {
        return result.NodeAssociationStatus;
      };
      if (returnComparer() === "FAILED") {
        return { state: WaiterState.FAILURE };
      }
    } catch (e) {}
  } catch (exception) {}
  return { state: WaiterState.RETRY };
};
/**
 * Wait until node is associated or disassociated.
 * @param params : waiter configuration options.
 * @param input : the input to DescribeNodeAssociationStatusCommand for polling.
 */
const waitForNodeAssociated = async (
  params: OpsWorksCMClientWaiter,
  input: DescribeNodeAssociationStatusCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 15, maxDelay: 120 };
  return createWaiter({ ...serviceDefaults, ...params }, params.client, input, checkState);
};
