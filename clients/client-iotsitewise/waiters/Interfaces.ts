import { IoTSiteWiseClient } from "../IoTSiteWiseClient";
import { WaiterOptions } from "@aws-sdk/util-waiter";

export interface IoTSiteWiseClientWaiter extends WaiterOptions {
  client: IoTSiteWiseClient;
}
