import { CloudFormationClient } from "../CloudFormationClient";
import { WaiterOptions } from "@aws-sdk/util-waiter";

export interface CloudFormationClientWaiter extends WaiterOptions {
  client: CloudFormationClient;
}
