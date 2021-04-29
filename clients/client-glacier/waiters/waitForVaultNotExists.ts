import { GlacierClient } from "../GlacierClient";
import { DescribeVaultCommand, DescribeVaultCommandInput } from "../commands/DescribeVaultCommand";
import { WaiterConfiguration, WaiterResult, WaiterState, checkExceptions, createWaiter } from "@aws-sdk/util-waiter";

const checkState = async (client: GlacierClient, input: DescribeVaultCommandInput): Promise<WaiterResult> => {
  let reason;
  try {
    let result: any = await client.send(new DescribeVaultCommand(input));
    reason = result;
    return { state: WaiterState.RETRY, reason };
  } catch (exception) {
    reason = exception;
    if (exception.name && exception.name == "ResourceNotFoundException") {
      return { state: WaiterState.SUCCESS, reason };
    }
  }
  return { state: WaiterState.RETRY, reason };
};
/**
 *
 *  @deprecated in favor of waitUntilVaultNotExists. This does not throw on failure.
 *  @param params : Waiter configuration options.
 *  @param input : the input to DescribeVaultCommand for polling.
 */
export const waitForVaultNotExists = async (
  params: WaiterConfiguration<GlacierClient>,
  input: DescribeVaultCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 3, maxDelay: 120 };
  return createWaiter({ ...serviceDefaults, ...params }, input, checkState);
};
/**
 *
 *  @param params : Waiter configuration options.
 *  @param input : the input to DescribeVaultCommand for polling.
 */
export const waitUntilVaultNotExists = async (
  params: WaiterConfiguration<GlacierClient>,
  input: DescribeVaultCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 3, maxDelay: 120 };
  const result = await createWaiter({ ...serviceDefaults, ...params }, input, checkState);
  return checkExceptions(result);
};
