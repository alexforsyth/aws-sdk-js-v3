import { SignerClient } from "../SignerClient";
import { DescribeSigningJobCommand, DescribeSigningJobCommandInput } from "../commands/DescribeSigningJobCommand";
import { WaiterConfiguration, WaiterResult, WaiterState, createWaiter } from "@aws-sdk/util-waiter";

const checkState = async (client: SignerClient, input: DescribeSigningJobCommandInput): Promise<WaiterResult> => {
  let reason;
  try {
    let result: any = await client.send(new DescribeSigningJobCommand(input));
    reason = result;
    try {
      let returnComparator = () => {
        return result.status;
      };
      if (returnComparator() === "Succeeded") {
        return { state: WaiterState.SUCCESS, reason };
      }
    } catch (e) {}
    try {
      let returnComparator = () => {
        return result.status;
      };
      if (returnComparator() === "Failed") {
        return { state: WaiterState.FAILURE, reason };
      }
    } catch (e) {}
  } catch (exception) {
    reason = exception;
    if (exception.name && exception.name == "ResourceNotFoundException") {
      return { state: WaiterState.FAILURE, reason };
    }
  }
  return { state: WaiterState.RETRY, reason };
};
/**
 *
 *  @deprecated in favor of waitUntilSuccessfulSigningJob. This does not throw on failure.
 *  @param params : Waiter configuration options.
 *  @param input : the input to DescribeSigningJobCommand for polling.
 */
export const waitForSuccessfulSigningJob = async (
  params: WaiterConfiguration<SignerClient>,
  input: DescribeSigningJobCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 20, maxDelay: 120 };
  return createWaiter({ ...serviceDefaults, ...params }, input, checkState);
};
/**
 *
 *  @param params : Waiter configuration options.
 *  @param input : the input to DescribeSigningJobCommand for polling.
 */
export const waitUntilSuccessfulSigningJob = async (
  params: WaiterConfiguration<SignerClient>,
  input: DescribeSigningJobCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 20, maxDelay: 120 };
  const result = await createWaiter({ ...serviceDefaults, ...params }, input, checkState);
  if (result.state !== WaiterState.SUCCESS) {
    throw Object.assign(new Error(result.state), result.reason);
  }
  return result;
};
