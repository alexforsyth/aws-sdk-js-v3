import { RDSClient } from "../RDSClient";
import { WaiterOptions } from "@aws-sdk/util-waiter";

export interface RDSClientWaiter extends WaiterOptions {
  client: RDSClient;
}
