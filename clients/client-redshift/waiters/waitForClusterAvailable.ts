import { RedshiftClient } from "../RedshiftClient";
import { DescribeClustersCommand, DescribeClustersCommandInput } from "../commands/DescribeClustersCommand";
import { RedshiftClientWaiter } from "./Interfaces";
import { WaiterResult, WaiterState, createWaiter } from "@aws-sdk/util-waiter";

const checkState = async (client: RedshiftClient, input: DescribeClustersCommandInput): Promise<WaiterResult> => {
  try {
    let result: any = await client.send(new DescribeClustersCommand(input));
    try {
      let returnComparer = () => {
        let flat_1 = [].concat(...result.Clusters);
        let projection_3 = flat_1.map((element_2: any) => {
          return element_2.ClusterStatus;
        });
        return projection_3;
      };
      let allStringEq_5 = returnComparer().length > 0;
      for (let element_4 of returnComparer()) {
        allStringEq_5 = allStringEq_5 && element_4 == "available";
      }
      if (allStringEq_5) {
        return { state: WaiterState.SUCCESS };
      }
    } catch (e) {}
    try {
      let returnComparer = () => {
        let flat_1 = [].concat(...result.Clusters);
        let projection_3 = flat_1.map((element_2: any) => {
          return element_2.ClusterStatus;
        });
        return projection_3;
      };
      for (let anyStringEq_4 of returnComparer()) {
        if (anyStringEq_4 == "deleting") {
          return { state: WaiterState.FAILURE };
        }
      }
    } catch (e) {}
  } catch (exception) {
    if (exception.name && exception.name == "ClusterNotFound") {
      return { state: WaiterState.RETRY };
    }
  }
  return { state: WaiterState.RETRY };
};
/**
 *
 * @param params : waiter configuration options.
 * @param input : the input to DescribeClustersCommand for polling.
 */
const waitForClusterAvailable = async (
  params: RedshiftClientWaiter,
  input: DescribeClustersCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 60, maxDelay: 120 };
  return createWaiter({ ...serviceDefaults, ...params }, params.client, input, checkState);
};
