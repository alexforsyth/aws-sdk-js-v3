import { EKSClient } from "../EKSClient";
import { DescribeClusterCommand, DescribeClusterCommandInput } from "../commands/DescribeClusterCommand";
import { EKSClientWaiter } from "./Interfaces";
import { WaiterResult, WaiterState, createWaiter } from "@aws-sdk/util-waiter";

const checkState = async (client: EKSClient, input: DescribeClusterCommandInput): Promise<WaiterResult> => {
  try {
    let result: any = await client.send(new DescribeClusterCommand(input));
    try {
      let returnComparer = () => {
        return result.cluster.status;
      };
      if (returnComparer() === "ACTIVE") {
        return { state: WaiterState.FAILURE };
      }
    } catch (e) {}
    try {
      let returnComparer = () => {
        return result.cluster.status;
      };
      if (returnComparer() === "CREATING") {
        return { state: WaiterState.FAILURE };
      }
    } catch (e) {}
  } catch (exception) {
    if (exception.name && exception.name == "ResourceNotFoundException") {
      return { state: WaiterState.SUCCESS };
    }
  }
  return { state: WaiterState.RETRY };
};
/**
 *
 * @param params : waiter configuration options.
 * @param input : the input to DescribeClusterCommand for polling.
 */
const waitForClusterDeleted = async (
  params: EKSClientWaiter,
  input: DescribeClusterCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 30, maxDelay: 120 };
  return createWaiter({ ...serviceDefaults, ...params }, params.client, input, checkState);
};
