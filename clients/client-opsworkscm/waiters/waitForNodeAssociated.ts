import { OpsWorksCMClient } from "../OpsWorksCMClient";
import {
  DescribeNodeAssociationStatusCommand,
  DescribeNodeAssociationStatusCommandInput,
} from "../commands/DescribeNodeAssociationStatusCommand";
import { WaiterConfiguration, WaiterResult, WaiterState, createWaiter } from "@aws-sdk/util-waiter";

const checkState = async (
  client: OpsWorksCMClient,
  input: DescribeNodeAssociationStatusCommandInput
): Promise<WaiterResult> => {
  let reason;
  try {
    let result: any = await client.send(new DescribeNodeAssociationStatusCommand(input));
    reason = result;
    try {
      let returnComparator = () => {
        return result.NodeAssociationStatus;
      };
      if (returnComparator() === "SUCCESS") {
        return { state: WaiterState.SUCCESS, reason };
      }
    } catch (e) {}
    try {
      let returnComparator = () => {
        return result.NodeAssociationStatus;
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
 * Wait until node is associated or disassociated.
 *  @deprecated in favor of waitUntilNodeAssociated. This does not throw on failure.
 *  @param params : Waiter configuration options.
 *  @param input : the input to DescribeNodeAssociationStatusCommand for polling.
 */
export const waitForNodeAssociated = async (
  params: WaiterConfiguration<OpsWorksCMClient>,
  input: DescribeNodeAssociationStatusCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 15, maxDelay: 120 };
  return createWaiter({ ...serviceDefaults, ...params }, input, checkState);
};
/**
 * Wait until node is associated or disassociated.
 *  @param params : Waiter configuration options.
 *  @param input : the input to DescribeNodeAssociationStatusCommand for polling.
 */
export const waitUntilNodeAssociated = async (
  params: WaiterConfiguration<OpsWorksCMClient>,
  input: DescribeNodeAssociationStatusCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 15, maxDelay: 120 };
  const result = await createWaiter({ ...serviceDefaults, ...params }, input, checkState);
  if (result.state != WaiterState.SUCCESS) {
    throw result;
  }
  return result;
};
