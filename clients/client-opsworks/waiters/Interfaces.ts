import { OpsWorksClient } from "../OpsWorksClient";
import { WaiterOptions } from "@aws-sdk/util-waiter";

export interface OpsWorksClientWaiter extends WaiterOptions {
  client: OpsWorksClient;
}
