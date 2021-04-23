import { EKSClient } from "../EKSClient";
import { DescribeNodegroupCommand, DescribeNodegroupCommandInput } from "../commands/DescribeNodegroupCommand";
import { WaiterConfiguration, WaiterResult, WaiterState, createWaiter } from "@aws-sdk/util-waiter";

const checkState = async (client: EKSClient, input: DescribeNodegroupCommandInput): Promise<WaiterResult> => {
  let reason;
  try {
    let result: any = await client.send(new DescribeNodegroupCommand(input));
    reason = result;
    try {
      let returnComparator = () => {
        return result.nodegroup.status;
      };
      if (returnComparator() === "CREATE_FAILED") {
        return { state: WaiterState.FAILURE, reason };
      }
    } catch (e) {}
    try {
      let returnComparator = () => {
        return result.nodegroup.status;
      };
      if (returnComparator() === "ACTIVE") {
        return { state: WaiterState.SUCCESS, reason };
      }
    } catch (e) {}
  } catch (exception) {
    reason = exception;
  }
  return { state: WaiterState.RETRY, reason };
};
/**
 *
 *  @deprecated in favor of waitUntilNodegroupActive. This does not throw on failure.
 *  @param params : Waiter configuration options.
 *  @param input : the input to DescribeNodegroupCommand for polling.
 */
export const waitForNodegroupActive = async (
  params: WaiterConfiguration<EKSClient>,
  input: DescribeNodegroupCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 30, maxDelay: 120 };
  return createWaiter({ ...serviceDefaults, ...params }, input, checkState);
};
/**
 *
 *  @param params : Waiter configuration options.
 *  @param input : the input to DescribeNodegroupCommand for polling.
 */
export const waitUntilNodegroupActive = async (
  params: WaiterConfiguration<EKSClient>,
  input: DescribeNodegroupCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 30, maxDelay: 120 };
  const result = await createWaiter({ ...serviceDefaults, ...params }, input, checkState);
  if (result.state != WaiterState.SUCCESS) {
    throw result;
  }
  return result;
};
