import { ACMPCAClient } from "../ACMPCAClient";
import { WaiterOptions } from "@aws-sdk/util-waiter";

export interface ACMPCAClientWaiter extends WaiterOptions {
  client: ACMPCAClient;
}
