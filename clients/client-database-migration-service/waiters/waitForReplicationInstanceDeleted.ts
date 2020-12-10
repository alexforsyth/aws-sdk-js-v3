import { DatabaseMigrationServiceClient } from "../DatabaseMigrationServiceClient";
import {
  DescribeReplicationInstancesCommand,
  DescribeReplicationInstancesCommandInput,
} from "../commands/DescribeReplicationInstancesCommand";
import { DatabaseMigrationServiceClientWaiter } from "./Interfaces";
import { WaiterResult, WaiterState, createWaiter } from "@aws-sdk/util-waiter";

const checkState = async (
  client: DatabaseMigrationServiceClient,
  input: DescribeReplicationInstancesCommandInput
): Promise<WaiterResult> => {
  try {
    let result: any = await client.send(new DescribeReplicationInstancesCommand(input));
    try {
      let returnComparer = () => {
        let flat_1 = [].concat(...result.ReplicationInstances);
        let projection_3 = flat_1.map((element_2: any) => {
          return element_2.ReplicationInstanceStatus;
        });
        return projection_3;
      };
      for (let anyStringEq_4 of returnComparer()) {
        if (anyStringEq_4 == "available") {
          return { state: WaiterState.FAILURE };
        }
      }
    } catch (e) {}
  } catch (exception) {
    if (exception.name && exception.name == "ResourceNotFoundFault") {
      return { state: WaiterState.SUCCESS };
    }
  }
  return { state: WaiterState.RETRY };
};
/**
 * Wait until DMS replication instance is deleted.
 * @param params : waiter configuration options.
 * @param input : the input to DescribeReplicationInstancesCommand for polling.
 */
const waitForReplicationInstanceDeleted = async (
  params: DatabaseMigrationServiceClientWaiter,
  input: DescribeReplicationInstancesCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 15, maxDelay: 120 };
  return createWaiter({ ...serviceDefaults, ...params }, params.client, input, checkState);
};
