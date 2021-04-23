import { EKSClient } from "../EKSClient";
import { DescribeAddonCommand, DescribeAddonCommandInput } from "../commands/DescribeAddonCommand";
import { WaiterConfiguration, WaiterResult, WaiterState, createWaiter } from "@aws-sdk/util-waiter";

const checkState = async (client: EKSClient, input: DescribeAddonCommandInput): Promise<WaiterResult> => {
  let reason;
  try {
    let result: any = await client.send(new DescribeAddonCommand(input));
    reason = result;
    try {
      let returnComparator = () => {
        return result.addon.status;
      };
      if (returnComparator() === "CREATE_FAILED") {
        return { state: WaiterState.FAILURE, reason };
      }
    } catch (e) {}
    try {
      let returnComparator = () => {
        return result.addon.status;
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
 *  @deprecated in favor of waitUntilAddonActive. This does not throw on failure.
 *  @param params : Waiter configuration options.
 *  @param input : the input to DescribeAddonCommand for polling.
 */
export const waitForAddonActive = async (
  params: WaiterConfiguration<EKSClient>,
  input: DescribeAddonCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 10, maxDelay: 120 };
  return createWaiter({ ...serviceDefaults, ...params }, input, checkState);
};
/**
 *
 *  @param params : Waiter configuration options.
 *  @param input : the input to DescribeAddonCommand for polling.
 */
export const waitUntilAddonActive = async (
  params: WaiterConfiguration<EKSClient>,
  input: DescribeAddonCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 10, maxDelay: 120 };
  const result = await createWaiter({ ...serviceDefaults, ...params }, input, checkState);
  if (result.state != WaiterState.SUCCESS) {
    throw result;
  }
  return result;
};
