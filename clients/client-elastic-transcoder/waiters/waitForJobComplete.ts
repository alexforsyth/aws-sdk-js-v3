import { ElasticTranscoderClient } from "../ElasticTranscoderClient";
import { ReadJobCommand, ReadJobCommandInput } from "../commands/ReadJobCommand";
import { WaiterConfiguration, WaiterResult, WaiterState, createWaiter } from "@aws-sdk/util-waiter";

const checkState = async (client: ElasticTranscoderClient, input: ReadJobCommandInput): Promise<WaiterResult> => {
  let reason;
  try {
    let result: any = await client.send(new ReadJobCommand(input));
    reason = result;
    try {
      let returnComparator = () => {
        return result.Job.Status;
      };
      if (returnComparator() === "Complete") {
        return { state: WaiterState.SUCCESS, reason };
      }
    } catch (e) {}
    try {
      let returnComparator = () => {
        return result.Job.Status;
      };
      if (returnComparator() === "Canceled") {
        return { state: WaiterState.FAILURE, reason };
      }
    } catch (e) {}
    try {
      let returnComparator = () => {
        return result.Job.Status;
      };
      if (returnComparator() === "Error") {
        return { state: WaiterState.FAILURE, reason };
      }
    } catch (e) {}
  } catch (exception) {
    reason = exception;
  }
  return { state: WaiterState.RETRY, reason };
};
/**
 *
 *  @deprecated in favor of waitUntilJobComplete. This does not throw on failure.
 *  @param params : Waiter configuration options.
 *  @param input : the input to ReadJobCommand for polling.
 */
export const waitForJobComplete = async (
  params: WaiterConfiguration<ElasticTranscoderClient>,
  input: ReadJobCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 30, maxDelay: 120 };
  return createWaiter({ ...serviceDefaults, ...params }, input, checkState);
};
/**
 *
 *  @param params : Waiter configuration options.
 *  @param input : the input to ReadJobCommand for polling.
 */
export const waitUntilJobComplete = async (
  params: WaiterConfiguration<ElasticTranscoderClient>,
  input: ReadJobCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 30, maxDelay: 120 };
  const result = await createWaiter({ ...serviceDefaults, ...params }, input, checkState);
  if (result.state !== WaiterState.SUCCESS) {
    throw Object.assign(new Error(result.state), result.reason);
  }
  return result;
};
