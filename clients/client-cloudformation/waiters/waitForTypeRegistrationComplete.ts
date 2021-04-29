import { CloudFormationClient } from "../CloudFormationClient";
import {
  DescribeTypeRegistrationCommand,
  DescribeTypeRegistrationCommandInput,
} from "../commands/DescribeTypeRegistrationCommand";
import { WaiterConfiguration, WaiterResult, WaiterState, createWaiter } from "@aws-sdk/util-waiter";

const checkState = async (
  client: CloudFormationClient,
  input: DescribeTypeRegistrationCommandInput
): Promise<WaiterResult> => {
  let reason;
  try {
    let result: any = await client.send(new DescribeTypeRegistrationCommand(input));
    reason = result;
    try {
      let returnComparator = () => {
        return result.ProgressStatus;
      };
      if (returnComparator() === "COMPLETE") {
        return { state: WaiterState.SUCCESS, reason };
      }
    } catch (e) {}
    try {
      let returnComparator = () => {
        return result.ProgressStatus;
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
 * Wait until type registration is COMPLETE.
 *  @deprecated in favor of waitUntilTypeRegistrationComplete. This does not throw on failure.
 *  @param params : Waiter configuration options.
 *  @param input : the input to DescribeTypeRegistrationCommand for polling.
 */
export const waitForTypeRegistrationComplete = async (
  params: WaiterConfiguration<CloudFormationClient>,
  input: DescribeTypeRegistrationCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 30, maxDelay: 120 };
  return createWaiter({ ...serviceDefaults, ...params }, input, checkState);
};
/**
 * Wait until type registration is COMPLETE.
 *  @param params : Waiter configuration options.
 *  @param input : the input to DescribeTypeRegistrationCommand for polling.
 */
export const waitUntilTypeRegistrationComplete = async (
  params: WaiterConfiguration<CloudFormationClient>,
  input: DescribeTypeRegistrationCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 30, maxDelay: 120 };
  const result = await createWaiter({ ...serviceDefaults, ...params }, input, checkState);
  if (result.state !== WaiterState.SUCCESS) {
    throw Object.assign(new Error(result.state), result.reason);
  }
  return result;
};
