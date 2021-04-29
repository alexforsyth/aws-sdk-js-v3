import { ACMPCAClient } from "../ACMPCAClient";
import {
  GetCertificateAuthorityCsrCommand,
  GetCertificateAuthorityCsrCommandInput,
} from "../commands/GetCertificateAuthorityCsrCommand";
import { WaiterConfiguration, WaiterResult, WaiterState, createWaiter } from "@aws-sdk/util-waiter";

const checkState = async (
  client: ACMPCAClient,
  input: GetCertificateAuthorityCsrCommandInput
): Promise<WaiterResult> => {
  let reason;
  try {
    let result: any = await client.send(new GetCertificateAuthorityCsrCommand(input));
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
 * Wait until a Certificate Authority CSR is created
 *  @deprecated in favor of waitUntilCertificateAuthorityCSRCreated. This does not throw on failure.
 *  @param params : Waiter configuration options.
 *  @param input : the input to GetCertificateAuthorityCsrCommand for polling.
 */
export const waitForCertificateAuthorityCSRCreated = async (
  params: WaiterConfiguration<ACMPCAClient>,
  input: GetCertificateAuthorityCsrCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 3, maxDelay: 120 };
  return createWaiter({ ...serviceDefaults, ...params }, input, checkState);
};
/**
 * Wait until a Certificate Authority CSR is created
 *  @param params : Waiter configuration options.
 *  @param input : the input to GetCertificateAuthorityCsrCommand for polling.
 */
export const waitUntilCertificateAuthorityCSRCreated = async (
  params: WaiterConfiguration<ACMPCAClient>,
  input: GetCertificateAuthorityCsrCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 3, maxDelay: 120 };
  const result = await createWaiter({ ...serviceDefaults, ...params }, input, checkState);
  if (result.state !== WaiterState.SUCCESS) {
    throw Object.assign(new Error(result.state), result.reason);
  }
  return result;
};
