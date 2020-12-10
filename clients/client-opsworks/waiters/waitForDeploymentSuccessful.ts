import { OpsWorksClient } from "../OpsWorksClient";
import { DescribeDeploymentsCommand, DescribeDeploymentsCommandInput } from "../commands/DescribeDeploymentsCommand";
import { OpsWorksClientWaiter } from "./Interfaces";
import { WaiterResult, WaiterState, createWaiter } from "@aws-sdk/util-waiter";

const checkState = async (client: OpsWorksClient, input: DescribeDeploymentsCommandInput): Promise<WaiterResult> => {
  try {
    let result: any = await client.send(new DescribeDeploymentsCommand(input));
    try {
      let returnComparer = () => {
        let flat_1 = [].concat(...result.Deployments);
        let projection_3 = flat_1.map((element_2: any) => {
          return element_2.Status;
        });
        return projection_3;
      };
      let allStringEq_5 = returnComparer().length > 0;
      for (let element_4 of returnComparer()) {
        allStringEq_5 = allStringEq_5 && element_4 == "successful";
      }
      if (allStringEq_5) {
        return { state: WaiterState.SUCCESS };
      }
    } catch (e) {}
    try {
      let returnComparer = () => {
        let flat_1 = [].concat(...result.Deployments);
        let projection_3 = flat_1.map((element_2: any) => {
          return element_2.Status;
        });
        return projection_3;
      };
      for (let anyStringEq_4 of returnComparer()) {
        if (anyStringEq_4 == "failed") {
          return { state: WaiterState.FAILURE };
        }
      }
    } catch (e) {}
  } catch (exception) {}
  return { state: WaiterState.RETRY };
};
/**
 * Wait until a deployment has completed successfully.
 * @param params : waiter configuration options.
 * @param input : the input to DescribeDeploymentsCommand for polling.
 */
const waitForDeploymentSuccessful = async (
  params: OpsWorksClientWaiter,
  input: DescribeDeploymentsCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 15, maxDelay: 120 };
  return createWaiter({ ...serviceDefaults, ...params }, params.client, input, checkState);
};
