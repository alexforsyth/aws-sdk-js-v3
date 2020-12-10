import { ElastiCacheClient } from "../ElastiCacheClient";
import { WaiterOptions } from "@aws-sdk/util-waiter";

export interface ElastiCacheClientWaiter extends WaiterOptions {
  client: ElastiCacheClient;
}
