import { EC2Client } from "../EC2Client";
import { DescribeVpcsCommand, DescribeVpcsCommandInput } from "../commands/DescribeVpcsCommand";
import { EC2ClientWaiter } from "./Interfaces";
import { WaiterResult, WaiterState, createWaiter } from "@aws-sdk/util-waiter";

const checkState = async (client: EC2Client, input: DescribeVpcsCommandInput): Promise<WaiterResult> => {
  try {
    let result: any = await client.send(new DescribeVpcsCommand(input));
    try {
      let returnComparer = () => {
        let flat_1 = [].concat(...result.Vpcs);
        let projection_3 = flat_1.map((element_2: any) => {
          return element_2.State;
        });
        return projection_3;
      };
      let allStringEq_5 = returnComparer().length > 0;
      for (let element_4 of returnComparer()) {
        allStringEq_5 = allStringEq_5 && element_4 == "available";
      }
      if (allStringEq_5) {
        return { state: WaiterState.SUCCESS };
      }
    } catch (e) {}
  } catch (exception) {}
  return { state: WaiterState.RETRY };
};
/**
 *
 * @param params : waiter configuration options.
 * @param input : the input to DescribeVpcsCommand for polling.
 */
const waitForVpcAvailable = async (params: EC2ClientWaiter, input: DescribeVpcsCommandInput): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 15, maxDelay: 120 };
  return createWaiter({ ...serviceDefaults, ...params }, params.client, input, checkState);
};
