import { SchemasClient } from "../SchemasClient";
import { DescribeCodeBindingCommand, DescribeCodeBindingCommandInput } from "../commands/DescribeCodeBindingCommand";
import { WaiterConfiguration, WaiterResult, WaiterState, createWaiter } from "@aws-sdk/util-waiter";

const checkState = async (client: SchemasClient, input: DescribeCodeBindingCommandInput): Promise<WaiterResult> => {
  let reason;
  try {
    let result: any = await client.send(new DescribeCodeBindingCommand(input));
    reason = result;
    try {
      let returnComparator = () => {
        return result.Status;
      };
      if (returnComparator() === "CREATE_COMPLETE") {
        return { state: WaiterState.SUCCESS, reason };
      }
    } catch (e) {}
    try {
      let returnComparator = () => {
        return result.Status;
      };
      if (returnComparator() === "CREATE_IN_PROGRESS") {
        return { state: WaiterState.RETRY, reason };
      }
    } catch (e) {}
    try {
      let returnComparator = () => {
        return result.Status;
      };
      if (returnComparator() === "CREATE_FAILED") {
        return { state: WaiterState.FAILURE, reason };
      }
    } catch (e) {}
  } catch (exception) {
    reason = exception;
    if (exception.name && exception.name == "NotFoundException") {
      return { state: WaiterState.FAILURE, reason };
    }
  }
  return { state: WaiterState.RETRY, reason };
};
/**
 * Wait until code binding is generated
 *  @deprecated in favor of waitUntilCodeBindingExists. This does not throw on failure.
 *  @param params : Waiter configuration options.
 *  @param input : the input to DescribeCodeBindingCommand for polling.
 */
export const waitForCodeBindingExists = async (
  params: WaiterConfiguration<SchemasClient>,
  input: DescribeCodeBindingCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 2, maxDelay: 120 };
  return createWaiter({ ...serviceDefaults, ...params }, input, checkState);
};
/**
 * Wait until code binding is generated
 *  @param params : Waiter configuration options.
 *  @param input : the input to DescribeCodeBindingCommand for polling.
 */
export const waitUntilCodeBindingExists = async (
  params: WaiterConfiguration<SchemasClient>,
  input: DescribeCodeBindingCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 2, maxDelay: 120 };
  const result = await createWaiter({ ...serviceDefaults, ...params }, input, checkState);
  if (result.state !== WaiterState.SUCCESS) {
    throw Object.assign(new Error(result.state), result.reason);
  }
  return result;
};
