import { RekognitionClient } from "../RekognitionClient";
import { WaiterOptions } from "@aws-sdk/util-waiter";

export interface RekognitionClientWaiter extends WaiterOptions {
  client: RekognitionClient;
}
