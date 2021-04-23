import { ACMPCAClient } from "../ACMPCAClient";
import {
  DescribeCertificateAuthorityAuditReportCommand,
  DescribeCertificateAuthorityAuditReportCommandInput,
} from "../commands/DescribeCertificateAuthorityAuditReportCommand";
import { WaiterConfiguration, WaiterResult, WaiterState, createWaiter } from "@aws-sdk/util-waiter";

const checkState = async (
  client: ACMPCAClient,
  input: DescribeCertificateAuthorityAuditReportCommandInput
): Promise<WaiterResult> => {
  let reason;
  try {
    let result: any = await client.send(new DescribeCertificateAuthorityAuditReportCommand(input));
    reason = result;
    try {
      let returnComparator = () => {
        return result.AuditReportStatus;
      };
      if (returnComparator() === "SUCCESS") {
        return { state: WaiterState.SUCCESS, reason };
      }
    } catch (e) {}
    try {
      let returnComparator = () => {
        return result.AuditReportStatus;
      };
      if (returnComparator() === "FAILED") {
        return { state: WaiterState.FAILURE, reason };
      }
    } catch (e) {}
  } catch (exception) {
    reason = exception;
  }
  return { state: WaiterState.RETRY, reason };
};
/**
 * Wait until a Audit Report is created
 *  @deprecated in favor of waitUntilAuditReportCreated. This does not throw on failure.
 *  @param params : Waiter configuration options.
 *  @param input : the input to DescribeCertificateAuthorityAuditReportCommand for polling.
 */
export const waitForAuditReportCreated = async (
  params: WaiterConfiguration<ACMPCAClient>,
  input: DescribeCertificateAuthorityAuditReportCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 3, maxDelay: 120 };
  return createWaiter({ ...serviceDefaults, ...params }, input, checkState);
};
/**
 * Wait until a Audit Report is created
 *  @param params : Waiter configuration options.
 *  @param input : the input to DescribeCertificateAuthorityAuditReportCommand for polling.
 */
export const waitUntilAuditReportCreated = async (
  params: WaiterConfiguration<ACMPCAClient>,
  input: DescribeCertificateAuthorityAuditReportCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 3, maxDelay: 120 };
  const result = await createWaiter({ ...serviceDefaults, ...params }, input, checkState);
  if (result.state != WaiterState.SUCCESS) {
    throw result;
  }
  return result;
};
