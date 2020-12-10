import { LambdaClient } from "../LambdaClient";
import { WaiterOptions } from "@aws-sdk/util-waiter";

export interface LambdaClientWaiter extends WaiterOptions {
  client: LambdaClient;
}
