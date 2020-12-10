import { SchemasClient } from "../SchemasClient";
import { DescribeCodeBindingCommand, DescribeCodeBindingCommandInput } from "../commands/DescribeCodeBindingCommand";
import { SchemasClientWaiter } from "./Interfaces";
import { WaiterResult, WaiterState, createWaiter } from "@aws-sdk/util-waiter";

const checkState = async (client: SchemasClient, input: DescribeCodeBindingCommandInput): Promise<WaiterResult> => {
  try {
    let result: any = await client.send(new DescribeCodeBindingCommand(input));
    try {
      let returnComparer = () => {
        return result.Status;
      };
      if (returnComparer() === "CREATE_COMPLETE") {
        return { state: WaiterState.SUCCESS };
      }
    } catch (e) {}
    try {
      let returnComparer = () => {
        return result.Status;
      };
      if (returnComparer() === "CREATE_IN_PROGRESS") {
        return { state: WaiterState.RETRY };
      }
    } catch (e) {}
    try {
      let returnComparer = () => {
        return result.Status;
      };
      if (returnComparer() === "CREATE_FAILED") {
        return { state: WaiterState.FAILURE };
      }
    } catch (e) {}
  } catch (exception) {
    if (exception.name && exception.name == "NotFoundException") {
      return { state: WaiterState.FAILURE };
    }
  }
  return { state: WaiterState.RETRY };
};
/**
 * Wait until code binding is generated
 * @param params : waiter configuration options.
 * @param input : the input to DescribeCodeBindingCommand for polling.
 */
const waitForCodeBindingExists = async (
  params: SchemasClientWaiter,
  input: DescribeCodeBindingCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 2, maxDelay: 120 };
  return createWaiter({ ...serviceDefaults, ...params }, params.client, input, checkState);
};
