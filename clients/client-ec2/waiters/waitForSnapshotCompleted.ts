import { EC2Client } from "../EC2Client";
import { DescribeSnapshotsCommand, DescribeSnapshotsCommandInput } from "../commands/DescribeSnapshotsCommand";
import { EC2ClientWaiter } from "./Interfaces";
import { WaiterResult, WaiterState, createWaiter } from "@aws-sdk/util-waiter";

const checkState = async (client: EC2Client, input: DescribeSnapshotsCommandInput): Promise<WaiterResult> => {
  try {
    let result: any = await client.send(new DescribeSnapshotsCommand(input));
    try {
      let returnComparer = () => {
        let flat_1 = [].concat(...result.Snapshots);
        let projection_3 = flat_1.map((element_2: any) => {
          return element_2.State;
        });
        return projection_3;
      };
      let allStringEq_5 = returnComparer().length > 0;
      for (let element_4 of returnComparer()) {
        allStringEq_5 = allStringEq_5 && element_4 == "completed";
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
 * @param input : the input to DescribeSnapshotsCommand for polling.
 */
const waitForSnapshotCompleted = async (
  params: EC2ClientWaiter,
  input: DescribeSnapshotsCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 15, maxDelay: 120 };
  return createWaiter({ ...serviceDefaults, ...params }, params.client, input, checkState);
};
