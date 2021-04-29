import { EC2Client } from "../EC2Client";
import {
  DescribeInstanceStatusCommand,
  DescribeInstanceStatusCommandInput,
} from "../commands/DescribeInstanceStatusCommand";
import { WaiterConfiguration, WaiterResult, WaiterState, createWaiter } from "@aws-sdk/util-waiter";

const checkState = async (client: EC2Client, input: DescribeInstanceStatusCommandInput): Promise<WaiterResult> => {
  let reason;
  try {
    let result: any = await client.send(new DescribeInstanceStatusCommand(input));
    reason = result;
    try {
      let returnComparator = () => {
        let flat_1: any[] = [].concat(...result.InstanceStatuses);
        let projection_3 = flat_1.map((element_2: any) => {
          return element_2.SystemStatus.Status;
        });
        return projection_3;
      };
      let allStringEq_5 = returnComparator().length > 0;
      for (let element_4 of returnComparator()) {
        allStringEq_5 = allStringEq_5 && element_4 == "ok";
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
 *  @deprecated in favor of waitUntilSystemStatusOk. This does not throw on failure.
 *  @param params : Waiter configuration options.
 *  @param input : the input to DescribeInstanceStatusCommand for polling.
 */
export const waitForSystemStatusOk = async (
  params: WaiterConfiguration<EC2Client>,
  input: DescribeInstanceStatusCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 15, maxDelay: 120 };
  return createWaiter({ ...serviceDefaults, ...params }, input, checkState);
};
/**
 *
 *  @param params : Waiter configuration options.
 *  @param input : the input to DescribeInstanceStatusCommand for polling.
 */
export const waitUntilSystemStatusOk = async (
  params: WaiterConfiguration<EC2Client>,
  input: DescribeInstanceStatusCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 15, maxDelay: 120 };
  const result = await createWaiter({ ...serviceDefaults, ...params }, input, checkState);
  if (result.state !== WaiterState.SUCCESS) {
    throw Object.assign(new Error(result.state), result.reason);
  }
  return result;
};
