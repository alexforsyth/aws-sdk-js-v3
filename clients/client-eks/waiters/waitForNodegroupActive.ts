import { EKSClient } from "../EKSClient";
import { DescribeNodegroupCommand, DescribeNodegroupCommandInput } from "../commands/DescribeNodegroupCommand";
import { EKSClientWaiter } from "./Interfaces";
import { WaiterResult, WaiterState, createWaiter } from "@aws-sdk/util-waiter";

const checkState = async (client: EKSClient, input: DescribeNodegroupCommandInput): Promise<WaiterResult> => {
  try {
    let result: any = await client.send(new DescribeNodegroupCommand(input));
    try {
      let returnComparer = () => {
        return result.nodegroup.status;
      };
      if (returnComparer() === "CREATE_FAILED") {
        return { state: WaiterState.FAILURE };
      }
    } catch (e) {}
    try {
      let returnComparer = () => {
        return result.nodegroup.status;
      };
      if (returnComparer() === "ACTIVE") {
        return { state: WaiterState.SUCCESS };
      }
    } catch (e) {}
  } catch (exception) {}
  return { state: WaiterState.RETRY };
};
/**
 *
 * @param params : waiter configuration options.
 * @param input : the input to DescribeNodegroupCommand for polling.
 */
const waitForNodegroupActive = async (
  params: EKSClientWaiter,
  input: DescribeNodegroupCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 30, maxDelay: 120 };
  return createWaiter({ ...serviceDefaults, ...params }, params.client, input, checkState);
};
