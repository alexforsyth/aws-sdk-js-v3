import { RekognitionClient } from "../RekognitionClient";
import {
  DescribeProjectVersionsCommand,
  DescribeProjectVersionsCommandInput,
} from "../commands/DescribeProjectVersionsCommand";
import { RekognitionClientWaiter } from "./Interfaces";
import { WaiterResult, WaiterState, createWaiter } from "@aws-sdk/util-waiter";

const checkState = async (
  client: RekognitionClient,
  input: DescribeProjectVersionsCommandInput
): Promise<WaiterResult> => {
  try {
    let result: any = await client.send(new DescribeProjectVersionsCommand(input));
    try {
      let returnComparer = () => {
        let flat_1 = [].concat(...result.ProjectVersionDescriptions);
        let projection_3 = flat_1.map((element_2: any) => {
          return element_2.Status;
        });
        return projection_3;
      };
      let allStringEq_5 = returnComparer().length > 0;
      for (let element_4 of returnComparer()) {
        allStringEq_5 = allStringEq_5 && element_4 == "TRAINING_COMPLETED";
      }
      if (allStringEq_5) {
        return { state: WaiterState.SUCCESS };
      }
    } catch (e) {}
    try {
      let returnComparer = () => {
        let flat_1 = [].concat(...result.ProjectVersionDescriptions);
        let projection_3 = flat_1.map((element_2: any) => {
          return element_2.Status;
        });
        return projection_3;
      };
      for (let anyStringEq_4 of returnComparer()) {
        if (anyStringEq_4 == "TRAINING_FAILED") {
          return { state: WaiterState.FAILURE };
        }
      }
    } catch (e) {}
  } catch (exception) {}
  return { state: WaiterState.RETRY };
};
/**
 * Wait until the ProjectVersion training completes.
 * @param params : waiter configuration options.
 * @param input : the input to DescribeProjectVersionsCommand for polling.
 */
const waitForProjectVersionTrainingCompleted = async (
  params: RekognitionClientWaiter,
  input: DescribeProjectVersionsCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 120, maxDelay: 120 };
  return createWaiter({ ...serviceDefaults, ...params }, params.client, input, checkState);
};
