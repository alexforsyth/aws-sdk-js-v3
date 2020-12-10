import { EC2Client } from "../EC2Client";
import { GetPasswordDataCommand, GetPasswordDataCommandInput } from "../commands/GetPasswordDataCommand";
import { EC2ClientWaiter } from "./Interfaces";
import { WaiterResult, WaiterState, createWaiter } from "@aws-sdk/util-waiter";

const checkState = async (client: EC2Client, input: GetPasswordDataCommandInput): Promise<WaiterResult> => {
  try {
    let result: any = await client.send(new GetPasswordDataCommand(input));
    try {
      let returnComparer = () => {
        return result.PasswordData.length > 0.0;
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
 * @param input : the input to GetPasswordDataCommand for polling.
 */
const waitForPasswordDataAvailable = async (
  params: EC2ClientWaiter,
  input: GetPasswordDataCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 15, maxDelay: 120 };
  return createWaiter({ ...serviceDefaults, ...params }, params.client, input, checkState);
};
