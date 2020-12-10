import { ElasticLoadBalancingV2Client } from "../ElasticLoadBalancingV2Client";
import { DescribeTargetHealthCommand, DescribeTargetHealthCommandInput } from "../commands/DescribeTargetHealthCommand";
import { ElasticLoadBalancingV2ClientWaiter } from "./Interfaces";
import { WaiterResult, WaiterState, createWaiter } from "@aws-sdk/util-waiter";

const checkState = async (
  client: ElasticLoadBalancingV2Client,
  input: DescribeTargetHealthCommandInput
): Promise<WaiterResult> => {
  try {
    let result: any = await client.send(new DescribeTargetHealthCommand(input));
    try {
      let returnComparer = () => {
        let flat_1 = [].concat(...result.TargetHealthDescriptions);
        let projection_3 = flat_1.map((element_2: any) => {
          return element_2.TargetHealth.State;
        });
        return projection_3;
      };
      let allStringEq_5 = returnComparer().length > 0;
      for (let element_4 of returnComparer()) {
        allStringEq_5 = allStringEq_5 && element_4 == "unused";
      }
      if (allStringEq_5) {
        return { state: WaiterState.SUCCESS };
      }
    } catch (e) {}
  } catch (exception) {
    if (exception.name && exception.name == "InvalidTarget") {
      return { state: WaiterState.SUCCESS };
    }
  }
  return { state: WaiterState.RETRY };
};
/**
 *
 * @param params : waiter configuration options.
 * @param input : the input to DescribeTargetHealthCommand for polling.
 */
const waitForTargetDeregistered = async (
  params: ElasticLoadBalancingV2ClientWaiter,
  input: DescribeTargetHealthCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 15, maxDelay: 120 };
  return createWaiter({ ...serviceDefaults, ...params }, params.client, input, checkState);
};
