import { AutoScalingClient } from "../AutoScalingClient";
import {
  DescribeAutoScalingGroupsCommand,
  DescribeAutoScalingGroupsCommandInput,
} from "../commands/DescribeAutoScalingGroupsCommand";
import { AutoScalingClientWaiter } from "./Interfaces";
import { WaiterResult, WaiterState, createWaiter } from "@aws-sdk/util-waiter";

const checkState = async (
  client: AutoScalingClient,
  input: DescribeAutoScalingGroupsCommandInput
): Promise<WaiterResult> => {
  try {
    let result: any = await client.send(new DescribeAutoScalingGroupsCommand(input));
    try {
      let returnComparer = () => {
        let flat_1: any[] = [].concat(...result.AutoScalingGroups);
        let projection_3 = flat_1.map((element_2: any) => {
          let filterRes_5 = element_2.Instances.filter((element_4: any) => {
            return element_4.LifecycleState == "InService";
          });
          let result_6 = [];
          result_6.push(filterRes_5.length >= element_2.MinSize);
          element_2 = result_6;
          return element_2;
        });
        let flat_7: any[] = [].concat(...projection_3);
        return flat_7.includes(false);
      };
      if (returnComparer() == false) {
        return { state: WaiterState.SUCCESS };
      }
    } catch (e) {}
    try {
      let returnComparer = () => {
        let flat_1: any[] = [].concat(...result.AutoScalingGroups);
        let projection_3 = flat_1.map((element_2: any) => {
          let filterRes_5 = element_2.Instances.filter((element_4: any) => {
            return element_4.LifecycleState == "InService";
          });
          let result_6 = [];
          result_6.push(filterRes_5.length >= element_2.MinSize);
          element_2 = result_6;
          return element_2;
        });
        let flat_7: any[] = [].concat(...projection_3);
        return flat_7.includes(false);
      };
      if (returnComparer() == true) {
        return { state: WaiterState.RETRY };
      }
    } catch (e) {}
  } catch (exception) {}
  return { state: WaiterState.RETRY };
};
/**
 *
 * @param params : waiter configuration options.
 * @param input : the input to DescribeAutoScalingGroupsCommand for polling.
 */
const waitForGroupInService = async (
  params: AutoScalingClientWaiter,
  input: DescribeAutoScalingGroupsCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 15, maxDelay: 120 };
  return createWaiter({ ...serviceDefaults, ...params }, params.client, input, checkState);
};
