import { SignerClient } from "../SignerClient";
import { DescribeSigningJobCommand, DescribeSigningJobCommandInput } from "../commands/DescribeSigningJobCommand";
import { SignerClientWaiter } from "./Interfaces";
import { WaiterResult, WaiterState, createWaiter } from "@aws-sdk/util-waiter";

const checkState = async (client: SignerClient, input: DescribeSigningJobCommandInput): Promise<WaiterResult> => {
  try {
    let result: any = await client.send(new DescribeSigningJobCommand(input));
    try {
      let returnComparer = () => {
        return result.status;
      };
      if (returnComparer() === "Succeeded") {
        return { state: WaiterState.SUCCESS };
      }
    } catch (e) {}
    try {
      let returnComparer = () => {
        return result.status;
      };
      if (returnComparer() === "Failed") {
        return { state: WaiterState.FAILURE };
      }
    } catch (e) {}
  } catch (exception) {
    if (exception.name && exception.name == "ResourceNotFoundException") {
      return { state: WaiterState.FAILURE };
    }
  }
  return { state: WaiterState.RETRY };
};
/**
 *
 * @param params : waiter configuration options.
 * @param input : the input to DescribeSigningJobCommand for polling.
 */
const waitForSuccessfulSigningJob = async (
  params: SignerClientWaiter,
  input: DescribeSigningJobCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 20, maxDelay: 120 };
  return createWaiter({ ...serviceDefaults, ...params }, params.client, input, checkState);
};
