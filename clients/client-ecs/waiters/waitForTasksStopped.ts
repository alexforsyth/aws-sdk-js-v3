import { ECSClient } from "../ECSClient";
import { DescribeTasksCommand, DescribeTasksCommandInput } from "../commands/DescribeTasksCommand";
import { ECSClientWaiter } from "./Interfaces";
import { WaiterResult, WaiterState, createWaiter } from "@aws-sdk/util-waiter";

const checkState = async (client: ECSClient, input: DescribeTasksCommandInput): Promise<WaiterResult> => {
  try {
    let result: any = await client.send(new DescribeTasksCommand(input));
    try {
      let returnComparer = () => {
        let flat_1 = [].concat(...result.tasks);
        let projection_3 = flat_1.map((element_2: any) => {
          return element_2.lastStatus;
        });
        return projection_3;
      };
      let allStringEq_5 = returnComparer().length > 0;
      for (let element_4 of returnComparer()) {
        allStringEq_5 = allStringEq_5 && element_4 == "STOPPED";
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
 * @param input : the input to DescribeTasksCommand for polling.
 */
const waitForTasksStopped = async (
  params: ECSClientWaiter,
  input: DescribeTasksCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 6, maxDelay: 120 };
  return createWaiter({ ...serviceDefaults, ...params }, params.client, input, checkState);
};
