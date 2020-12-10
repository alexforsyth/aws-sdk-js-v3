import { SageMakerClient } from "../SageMakerClient";
import { WaiterOptions } from "@aws-sdk/util-waiter";

export interface SageMakerClientWaiter extends WaiterOptions {
  client: SageMakerClient;
}
