import { CloudWatchClient } from "../CloudWatchClient";
import { DescribeAlarmsCommand, DescribeAlarmsCommandInput } from "../commands/DescribeAlarmsCommand";
import { CloudWatchClientWaiter } from "./Interfaces";
import { WaiterResult, WaiterState, createWaiter } from "@aws-sdk/util-waiter";

const checkState = async (client: CloudWatchClient, input: DescribeAlarmsCommandInput): Promise<WaiterResult> => {
  try {
    let result: any = await client.send(new DescribeAlarmsCommand(input));
    try {
      let returnComparer = () => {
        let flat_1 = [].concat(...result.CompositeAlarms);
        return flat_1.length > 0.0;
      };
      if (returnComparer() == true) {
        return { state: WaiterState.SUCCESS };
      }
    } catch (e) {}
  } catch (exception) {}
  return { state: WaiterState.RETRY };
};
/**
 *
 * @param params : waiter configuration options.
 * @param input : the input to DescribeAlarmsCommand for polling.
 */
const waitForCompositeAlarmExists = async (
  params: CloudWatchClientWaiter,
  input: DescribeAlarmsCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 5, maxDelay: 120 };
  return createWaiter({ ...serviceDefaults, ...params }, params.client, input, checkState);
};
