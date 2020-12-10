import { SageMakerClient } from "../SageMakerClient";
import { DescribeEndpointCommand, DescribeEndpointCommandInput } from "../commands/DescribeEndpointCommand";
import { SageMakerClientWaiter } from "./Interfaces";
import { WaiterResult, WaiterState, createWaiter } from "@aws-sdk/util-waiter";

const checkState = async (client: SageMakerClient, input: DescribeEndpointCommandInput): Promise<WaiterResult> => {
  try {
    let result: any = await client.send(new DescribeEndpointCommand(input));
    try {
      let returnComparer = () => {
        return result.EndpointStatus;
      };
      if (returnComparer() === "Failed") {
        return { state: WaiterState.FAILURE };
      }
    } catch (e) {}
  } catch (exception) {
    if (exception.name && exception.name == "ValidationException") {
      return { state: WaiterState.SUCCESS };
    }
  }
  return { state: WaiterState.RETRY };
};
/**
 *
 * @param params : waiter configuration options.
 * @param input : the input to DescribeEndpointCommand for polling.
 */
const waitForEndpointDeleted = async (
  params: SageMakerClientWaiter,
  input: DescribeEndpointCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 30, maxDelay: 120 };
  return createWaiter({ ...serviceDefaults, ...params }, params.client, input, checkState);
};
