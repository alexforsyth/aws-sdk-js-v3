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
    return { state: WaiterState.SUCCESS };
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
const waitForLoadBalancerExists = async (
  params: ElasticLoadBalancingV2ClientWaiter,
  input: DescribeLoadBalancersCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 15, maxDelay: 120 };
  return createWaiter({ ...serviceDefaults, ...params }, params.client, input, checkState);
};
