import { ACMPCAClient } from "../ACMPCAClient";
import {
  DescribeCertificateAuthorityAuditReportCommand,
  DescribeCertificateAuthorityAuditReportCommandInput,
} from "../commands/DescribeCertificateAuthorityAuditReportCommand";
import { ACMPCAClientWaiter } from "./Interfaces";
import { WaiterResult, WaiterState, createWaiter } from "@aws-sdk/util-waiter";

const checkState = async (
  client: ACMPCAClient,
  input: DescribeCertificateAuthorityAuditReportCommandInput
): Promise<WaiterResult> => {
  try {
    let result: any = await client.send(new DescribeCertificateAuthorityAuditReportCommand(input));
    try {
      let returnComparer = () => {
        return result.AuditReportStatus;
      };
      if (returnComparer() === "SUCCESS") {
        return { state: WaiterState.SUCCESS };
      }
    } catch (e) {}
    try {
      let returnComparer = () => {
        return result.AuditReportStatus;
      };
      if (returnComparer() === "FAILED") {
        return { state: WaiterState.FAILURE };
      }
    } catch (e) {}
  } catch (exception) {}
  return { state: WaiterState.RETRY };
};
/**
 * Wait until a Audit Report is created
 * @param params : waiter configuration options.
 * @param input : the input to DescribeCertificateAuthorityAuditReportCommand for polling.
 */
const waitForAuditReportCreated = async (
  params: ACMPCAClientWaiter,
  input: DescribeCertificateAuthorityAuditReportCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 3, maxDelay: 120 };
  return createWaiter({ ...serviceDefaults, ...params }, params.client, input, checkState);
};
