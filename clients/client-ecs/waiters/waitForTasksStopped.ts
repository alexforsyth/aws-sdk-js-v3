import { ECSClient } from "../ECSClient";
import { DescribeTasksCommand, DescribeTasksCommandInput } from "../commands/DescribeTasksCommand";
import { WaiterConfiguration, WaiterResult, WaiterState, createWaiter } from "@aws-sdk/util-waiter";

const checkState = async (client: ECSClient, input: DescribeTasksCommandInput): Promise<WaiterResult> => {
  let reason;
  try {
    let result: any = await client.send(new DescribeTasksCommand(input));
    reason = result;
    try {
      let returnComparator = () => {
        let flat_1: any[] = [].concat(...result.tasks);
        let projection_3 = flat_1.map((element_2: any) => {
          return element_2.lastStatus;
        });
        return projection_3;
      };
      let allStringEq_5 = returnComparator().length > 0;
      for (let element_4 of returnComparator()) {
        allStringEq_5 = allStringEq_5 && element_4 == "STOPPED";
      }
      if (allStringEq_5) {
        return { state: WaiterState.SUCCESS, reason };
      }
    } catch (e) {}
  } catch (exception) {
    reason = exception;
  }
  return { state: WaiterState.RETRY, reason };
};
/**
 *
 *  @deprecated in favor of waitUntilTasksStopped. This does not throw on failure.
 *  @param params : Waiter configuration options.
 *  @param input : the input to DescribeTasksCommand for polling.
 */
export const waitForTasksStopped = async (
  params: WaiterConfiguration<ECSClient>,
  input: DescribeTasksCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 6, maxDelay: 120 };
  return createWaiter({ ...serviceDefaults, ...params }, input, checkState);
};
/**
 *
 *  @param params : Waiter configuration options.
 *  @param input : the input to DescribeTasksCommand for polling.
 */
export const waitUntilTasksStopped = async (
  params: WaiterConfiguration<ECSClient>,
  input: DescribeTasksCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 6, maxDelay: 120 };
  const result = await createWaiter({ ...serviceDefaults, ...params }, input, checkState);
  if (result.state != WaiterState.SUCCESS) {
    throw result;
  }
  return result;
};
