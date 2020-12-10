import { SchemasClient } from "../SchemasClient";
import { WaiterOptions } from "@aws-sdk/util-waiter";

export interface SchemasClientWaiter extends WaiterOptions {
  client: SchemasClient;
}
