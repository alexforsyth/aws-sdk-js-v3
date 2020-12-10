import { EC2Client } from "../EC2Client";
import { DescribeInstancesCommand, DescribeInstancesCommandInput } from "../commands/DescribeInstancesCommand";
import { EC2ClientWaiter } from "./Interfaces";
import { WaiterResult, WaiterState, createWaiter } from "@aws-sdk/util-waiter";

const checkState = async (client: EC2Client, input: DescribeInstancesCommandInput): Promise<WaiterResult> => {
  try {
    let result: any = await client.send(new DescribeInstancesCommand(input));
    try {
      let returnComparer = () => {
        let flat_1 = [].concat(...result.Reservations);
        let projection_3 = flat_1.map((element_2: any) => {
          return element_2.Instances;
        });
        let flat_4 = [].concat(...projection_3);
        let projection_6 = flat_4.map((element_5: any) => {
          return element_5.State.Name;
        });
        return projection_6;
      };
      let allStringEq_8 = returnComparer().length > 0;
      for (let element_7 of returnComparer()) {
        allStringEq_8 = allStringEq_8 && element_7 == "terminated";
      }
      if (allStringEq_8) {
        return { state: WaiterState.SUCCESS };
      }
    } catch (e) {}
    try {
      let returnComparer = () => {
        let flat_1 = [].concat(...result.Reservations);
        let projection_3 = flat_1.map((element_2: any) => {
          return element_2.Instances;
        });
        let flat_4 = [].concat(...projection_3);
        let projection_6 = flat_4.map((element_5: any) => {
          return element_5.State.Name;
        });
        return projection_6;
      };
      for (let anyStringEq_7 of returnComparer()) {
        if (anyStringEq_7 == "pending") {
          return { state: WaiterState.FAILURE };
        }
      }
    } catch (e) {}
    try {
      let returnComparer = () => {
        let flat_1 = [].concat(...result.Reservations);
        let projection_3 = flat_1.map((element_2: any) => {
          return element_2.Instances;
        });
        let flat_4 = [].concat(...projection_3);
        let projection_6 = flat_4.map((element_5: any) => {
          return element_5.State.Name;
        });
        return projection_6;
      };
      for (let anyStringEq_7 of returnComparer()) {
        if (anyStringEq_7 == "stopping") {
          return { state: WaiterState.FAILURE };
        }
      }
    } catch (e) {}
  } catch (exception) {}
  return { state: WaiterState.RETRY };
};
/**
 *
 * @param params : waiter configuration options.
 * @param input : the input to DescribeInstancesCommand for polling.
 */
const waitForInstanceTerminated = async (
  params: EC2ClientWaiter,
  input: DescribeInstancesCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 15, maxDelay: 120 };
  return createWaiter({ ...serviceDefaults, ...params }, params.client, input, checkState);
};
