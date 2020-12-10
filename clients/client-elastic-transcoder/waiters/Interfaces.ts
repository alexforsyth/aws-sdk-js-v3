import { ElasticTranscoderClient } from "../ElasticTranscoderClient";
import { WaiterOptions } from "@aws-sdk/util-waiter";

export interface ElasticTranscoderClientWaiter extends WaiterOptions {
  client: ElasticTranscoderClient;
}
