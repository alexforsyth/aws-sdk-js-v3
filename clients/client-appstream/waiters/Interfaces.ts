import { AppStreamClient } from "../AppStreamClient";
import { WaiterOptions } from "@aws-sdk/util-waiter";

export interface AppStreamClientWaiter extends WaiterOptions {
  client: AppStreamClient;
}
