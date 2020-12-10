import { KinesisClient } from "../KinesisClient";
import { WaiterOptions } from "@aws-sdk/util-waiter";

export interface KinesisClientWaiter extends WaiterOptions {
  client: KinesisClient;
}
