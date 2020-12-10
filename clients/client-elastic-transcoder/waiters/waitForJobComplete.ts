import { ElasticTranscoderClient } from "../ElasticTranscoderClient";
import { ReadJobCommand, ReadJobCommandInput } from "../commands/ReadJobCommand";
import { ElasticTranscoderClientWaiter } from "./Interfaces";
import { WaiterResult, WaiterState, createWaiter } from "@aws-sdk/util-waiter";

const checkState = async (client: ElasticTranscoderClient, input: ReadJobCommandInput): Promise<WaiterResult> => {
  try {
    let result: any = await client.send(new ReadJobCommand(input));
    try {
      let returnComparer = () => {
        return result.Job.Status;
      };
      if (returnComparer() === "Complete") {
        return { state: WaiterState.SUCCESS };
      }
    } catch (e) {}
    try {
      let returnComparer = () => {
        return result.Job.Status;
      };
      if (returnComparer() === "Canceled") {
        return { state: WaiterState.FAILURE };
      }
    } catch (e) {}
    try {
      let returnComparer = () => {
        return result.Job.Status;
      };
      if (returnComparer() === "Error") {
        return { state: WaiterState.FAILURE };
      }
    } catch (e) {}
  } catch (exception) {}
  return { state: WaiterState.RETRY };
};
/**
 *
 * @param params : waiter configuration options.
 * @param input : the input to ReadJobCommand for polling.
 */
const waitForJobComplete = async (
  params: ElasticTranscoderClientWaiter,
  input: ReadJobCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 30, maxDelay: 120 };
  return createWaiter({ ...serviceDefaults, ...params }, params.client, input, checkState);
};
