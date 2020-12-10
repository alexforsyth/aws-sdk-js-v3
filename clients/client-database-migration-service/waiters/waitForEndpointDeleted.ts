import { DatabaseMigrationServiceClient } from "../DatabaseMigrationServiceClient";
import { DescribeEndpointsCommand, DescribeEndpointsCommandInput } from "../commands/DescribeEndpointsCommand";
import { DatabaseMigrationServiceClientWaiter } from "./Interfaces";
import { WaiterResult, WaiterState, createWaiter } from "@aws-sdk/util-waiter";

const checkState = async (
  client: DatabaseMigrationServiceClient,
  input: DescribeEndpointsCommandInput
): Promise<WaiterResult> => {
  try {
    let result: any = await client.send(new DescribeEndpointsCommand(input));
    try {
      let returnComparer = () => {
        let flat_1 = [].concat(...result.Endpoints);
        let projection_3 = flat_1.map((element_2: any) => {
          return element_2.Status;
        });
        return projection_3;
      };
      for (let anyStringEq_4 of returnComparer()) {
        if (anyStringEq_4 == "active") {
          return { state: WaiterState.FAILURE };
        }
      }
    } catch (e) {}
    try {
      let returnComparer = () => {
        let flat_1 = [].concat(...result.Endpoints);
        let projection_3 = flat_1.map((element_2: any) => {
          return element_2.Status;
        });
        return projection_3;
      };
      for (let anyStringEq_4 of returnComparer()) {
        if (anyStringEq_4 == "creating") {
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
 * Wait until testing endpoint is deleted.
 * @param params : waiter configuration options.
 * @param input : the input to DescribeEndpointsCommand for polling.
 */
const waitForEndpointDeleted = async (
  params: DatabaseMigrationServiceClientWaiter,
  input: DescribeEndpointsCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 5, maxDelay: 120 };
  return createWaiter({ ...serviceDefaults, ...params }, params.client, input, checkState);
};
