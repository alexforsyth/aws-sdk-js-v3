import { RedshiftClient } from "../RedshiftClient";
import { WaiterOptions } from "@aws-sdk/util-waiter";

export interface RedshiftClientWaiter extends WaiterOptions {
  client: RedshiftClient;
}
