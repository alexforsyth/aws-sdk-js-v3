import { DynamoDBClient } from "../DynamoDBClient";
import { WaiterOptions } from "@aws-sdk/util-waiter";

export interface DynamoDBClientWaiter extends WaiterOptions {
  client: DynamoDBClient;
}
