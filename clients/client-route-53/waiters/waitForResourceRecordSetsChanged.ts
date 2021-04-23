import { Route53Client } from "../Route53Client";
import { GetChangeCommand, GetChangeCommandInput } from "../commands/GetChangeCommand";
import { WaiterConfiguration, WaiterResult, WaiterState, createWaiter } from "@aws-sdk/util-waiter";

const checkState = async (client: Route53Client, input: GetChangeCommandInput): Promise<WaiterResult> => {
  let reason;
  try {
    let result: any = await client.send(new GetChangeCommand(input));
    reason = result;
    try {
      let returnComparator = () => {
        return result.ChangeInfo.Status;
      };
      if (returnComparator() === "INSYNC") {
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
 *  @deprecated in favor of waitUntilResourceRecordSetsChanged. This does not throw on failure.
 *  @param params : Waiter configuration options.
 *  @param input : the input to GetChangeCommand for polling.
 */
export const waitForResourceRecordSetsChanged = async (
  params: WaiterConfiguration<Route53Client>,
  input: GetChangeCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 30, maxDelay: 120 };
  return createWaiter({ ...serviceDefaults, ...params }, input, checkState);
};
/**
 *
 *  @param params : Waiter configuration options.
 *  @param input : the input to GetChangeCommand for polling.
 */
export const waitUntilResourceRecordSetsChanged = async (
  params: WaiterConfiguration<Route53Client>,
  input: GetChangeCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 30, maxDelay: 120 };
  const result = await createWaiter({ ...serviceDefaults, ...params }, input, checkState);
  if (result.state != WaiterState.SUCCESS) {
    throw result;
  }
  return result;
};
