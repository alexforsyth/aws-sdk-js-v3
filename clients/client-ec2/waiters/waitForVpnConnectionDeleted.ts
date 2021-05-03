import { EC2Client } from "../EC2Client";
import {
  DescribeVpnConnectionsCommand,
  DescribeVpnConnectionsCommandInput,
} from "../commands/DescribeVpnConnectionsCommand";
import { WaiterConfiguration, WaiterResult, WaiterState, checkExceptions, createWaiter } from "@aws-sdk/util-waiter";

const checkState = async (client: EC2Client, input: DescribeVpnConnectionsCommandInput): Promise<WaiterResult> => {
  let reason;
  try {
    let result: any = await client.send(new DescribeVpnConnectionsCommand(input));
    reason = result;
    try {
      let returnComparator = () => {
        let flat_1: any[] = [].concat(...result.VpnConnections);
        let projection_3 = flat_1.map((element_2: any) => {
          return element_2.State;
        });
        return projection_3;
      };
      let allStringEq_5 = returnComparator().length > 0;
      for (let element_4 of returnComparator()) {
        allStringEq_5 = allStringEq_5 && element_4 == "deleted";
      }
      if (allStringEq_5) {
        return { state: WaiterState.SUCCESS, reason };
      }
    } catch (e) {}
    try {
      let returnComparator = () => {
        let flat_1: any[] = [].concat(...result.VpnConnections);
        let projection_3 = flat_1.map((element_2: any) => {
          return element_2.State;
        });
        return projection_3;
      };
      for (let anyStringEq_4 of returnComparator()) {
        if (anyStringEq_4 == "pending") {
          return { state: WaiterState.FAILURE, reason };
        }
      }
    } catch (e) {}
  } catch (exception) {
    reason = exception;
  }
  return { state: WaiterState.RETRY, reason };
};
/**
 *
 *  @deprecated In favor of waitUntilVpnConnectionDeleted. This does not throw on failure.
 *  @param params - Waiter configuration options.
 *  @param input - The input to DescribeVpnConnectionsCommand for polling.
 */
export const waitForVpnConnectionDeleted = async (
  params: WaiterConfiguration<EC2Client>,
  input: DescribeVpnConnectionsCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 15, maxDelay: 120 };
  return createWaiter({ ...serviceDefaults, ...params }, input, checkState);
};
/**
 *
 *  @param params - Waiter configuration options.
 *  @param input - The input to DescribeVpnConnectionsCommand for polling.
 */
export const waitUntilVpnConnectionDeleted = async (
  params: WaiterConfiguration<EC2Client>,
  input: DescribeVpnConnectionsCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 15, maxDelay: 120 };
  const result = await createWaiter({ ...serviceDefaults, ...params }, input, checkState);
  return checkExceptions(result);
};
