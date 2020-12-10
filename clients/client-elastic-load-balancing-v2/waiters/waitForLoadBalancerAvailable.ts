import { ElasticLoadBalancingV2Client } from "../ElasticLoadBalancingV2Client";
import {
  DescribeLoadBalancersCommand,
  DescribeLoadBalancersCommandInput,
} from "../commands/DescribeLoadBalancersCommand";
import { ElasticLoadBalancingV2ClientWaiter } from "./Interfaces";
import { WaiterResult, WaiterState, createWaiter } from "@aws-sdk/util-waiter";

const checkState = async (
  client: ElasticLoadBalancingV2Client,
  input: DescribeLoadBalancersCommandInput
): Promise<WaiterResult> => {
  try {
    let result: any = await client.send(new DescribeLoadBalancersCommand(input));
    try {
      let returnComparer = () => {
        let flat_1 = [].concat(...result.LoadBalancers);
        let projection_3 = flat_1.map((element_2: any) => {
          return element_2.State.Code;
        });
        return projection_3;
      };
      let allStringEq_5 = returnComparer().length > 0;
      for (let element_4 of returnComparer()) {
        allStringEq_5 = allStringEq_5 && element_4 == "active";
      }
      if (allStringEq_5) {
        return { state: WaiterState.SUCCESS };
      }
    } catch (e) {}
    try {
      let returnComparer = () => {
        let flat_1 = [].concat(...result.LoadBalancers);
        let projection_3 = flat_1.map((element_2: any) => {
          return element_2.State.Code;
        });
        return projection_3;
      };
      for (let anyStringEq_4 of returnComparer()) {
        if (anyStringEq_4 == "provisioning") {
          return { state: WaiterState.RETRY };
        }
      }
    } catch (e) {}
  } catch (exception) {
    if (exception.name && exception.name == "LoadBalancerNotFound") {
      return { state: WaiterState.RETRY };
    }
  }
  return { state: WaiterState.RETRY };
};
/**
 *
 * @param params : waiter configuration options.
 * @param input : the input to DescribeLoadBalancersCommand for polling.
 */
const waitForLoadBalancerAvailable = async (
  params: ElasticLoadBalancingV2ClientWaiter,
  input: DescribeLoadBalancersCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 15, maxDelay: 120 };
  return createWaiter({ ...serviceDefaults, ...params }, params.client, input, checkState);
};
