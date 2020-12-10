import { ECSClient } from "../ECSClient";
import { DescribeServicesCommand, DescribeServicesCommandInput } from "../commands/DescribeServicesCommand";
import { ECSClientWaiter } from "./Interfaces";
import { WaiterResult, WaiterState, createWaiter } from "@aws-sdk/util-waiter";

const checkState = async (client: ECSClient, input: DescribeServicesCommandInput): Promise<WaiterResult> => {
  try {
    let result: any = await client.send(new DescribeServicesCommand(input));
    try {
      let returnComparer = () => {
        let flat_1 = [].concat(...result.failures);
        let projection_3 = flat_1.map((element_2: any) => {
          return element_2.reason;
        });
        return projection_3;
      };
      for (let anyStringEq_4 of returnComparer()) {
        if (anyStringEq_4 == "MISSING") {
          return { state: WaiterState.FAILURE };
        }
      }
    } catch (e) {}
    try {
      let returnComparer = () => {
        let flat_1 = [].concat(...result.services);
        let projection_3 = flat_1.map((element_2: any) => {
          return element_2.status;
        });
        return projection_3;
      };
      for (let anyStringEq_4 of returnComparer()) {
        if (anyStringEq_4 == "INACTIVE") {
          return { state: WaiterState.SUCCESS };
        }
      }
    } catch (e) {}
  } catch (exception) {}
  return { state: WaiterState.RETRY };
};
/**
 *
 * @param params : waiter configuration options.
 * @param input : the input to DescribeServicesCommand for polling.
 */
const waitForServicesInactive = async (
  params: ECSClientWaiter,
  input: DescribeServicesCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 15, maxDelay: 120 };
  return createWaiter({ ...serviceDefaults, ...params }, params.client, input, checkState);
};
