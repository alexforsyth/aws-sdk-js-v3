import { DatabaseMigrationServiceClient } from "../DatabaseMigrationServiceClient";
import { WaiterOptions } from "@aws-sdk/util-waiter";

export interface DatabaseMigrationServiceClientWaiter extends WaiterOptions {
  client: DatabaseMigrationServiceClient;
}
