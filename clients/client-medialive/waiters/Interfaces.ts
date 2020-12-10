import { MediaLiveClient } from "../MediaLiveClient";
import { WaiterOptions } from "@aws-sdk/util-waiter";

export interface MediaLiveClientWaiter extends WaiterOptions {
  client: MediaLiveClient;
}
