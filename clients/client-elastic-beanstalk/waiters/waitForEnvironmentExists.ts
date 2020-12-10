import { ElasticBeanstalkClient } from "../ElasticBeanstalkClient";
import { DescribeEnvironmentsCommand, DescribeEnvironmentsCommandInput } from "../commands/DescribeEnvironmentsCommand";
import { ElasticBeanstalkClientWaiter } from "./Interfaces";
import { WaiterResult, WaiterState, createWaiter } from "@aws-sdk/util-waiter";

const checkState = async (
  client: ElasticBeanstalkClient,
  input: DescribeEnvironmentsCommandInput
): Promise<WaiterResult> => {
  try {
    let result: any = await client.send(new DescribeEnvironmentsCommand(input));
    try {
      let returnComparer = () => {
        let flat_1 = [].concat(...result.Environments);
        let projection_3 = flat_1.map((element_2: any) => {
          return element_2.Status;
        });
        return projection_3;
      };
      let allStringEq_5 = returnComparer().length > 0;
      for (let element_4 of returnComparer()) {
        allStringEq_5 = allStringEq_5 && element_4 == "Ready";
      }
      if (allStringEq_5) {
        return { state: WaiterState.SUCCESS };
      }
    } catch (e) {}
    try {
      let returnComparer = () => {
        let flat_1 = [].concat(...result.Environments);
        let projection_3 = flat_1.map((element_2: any) => {
          return element_2.Status;
        });
        return projection_3;
      };
      let allStringEq_5 = returnComparer().length > 0;
      for (let element_4 of returnComparer()) {
        allStringEq_5 = allStringEq_5 && element_4 == "Launching";
      }
      if (allStringEq_5) {
        return { state: WaiterState.RETRY };
      }
    } catch (e) {}
  } catch (exception) {}
  return { state: WaiterState.RETRY };
};
/**
 *
 * @param params : waiter configuration options.
 * @param input : the input to DescribeEnvironmentsCommand for polling.
 */
const waitForEnvironmentExists = async (
  params: ElasticBeanstalkClientWaiter,
  input: DescribeEnvironmentsCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 20, maxDelay: 120 };
  return createWaiter({ ...serviceDefaults, ...params }, params.client, input, checkState);
};
