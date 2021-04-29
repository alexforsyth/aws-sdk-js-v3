import { ACMPCAClient } from "../ACMPCAClient";
import { GetCertificateCommand, GetCertificateCommandInput } from "../commands/GetCertificateCommand";
import { WaiterConfiguration, WaiterResult, WaiterState, createWaiter } from "@aws-sdk/util-waiter";

const checkState = async (client: ACMPCAClient, input: GetCertificateCommandInput): Promise<WaiterResult> => {
  let reason;
  try {
    let result: any = await client.send(new GetCertificateCommand(input));
    reason = result;
    return { state: WaiterState.SUCCESS, reason };
  } catch (exception) {
    reason = exception;
    if (exception.name && exception.name == "RequestInProgressException") {
      return { state: WaiterState.RETRY, reason };
    }
  }
  return { state: WaiterState.RETRY, reason };
};
/**
 * Wait until a certificate is issued
 *  @deprecated in favor of waitUntilCertificateIssued. This does not throw on failure.
 *  @param params : Waiter configuration options.
 *  @param input : the input to GetCertificateCommand for polling.
 */
export const waitForCertificateIssued = async (
  params: WaiterConfiguration<ACMPCAClient>,
  input: GetCertificateCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 3, maxDelay: 120 };
  return createWaiter({ ...serviceDefaults, ...params }, input, checkState);
};
/**
 * Wait until a certificate is issued
 *  @param params : Waiter configuration options.
 *  @param input : the input to GetCertificateCommand for polling.
 */
export const waitUntilCertificateIssued = async (
  params: WaiterConfiguration<ACMPCAClient>,
  input: GetCertificateCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 3, maxDelay: 120 };
  const result = await createWaiter({ ...serviceDefaults, ...params }, input, checkState);
  if (result.state !== WaiterState.SUCCESS) {
    throw Object.assign(new Error(result.state), result.reason);
  }
  return result;
};
