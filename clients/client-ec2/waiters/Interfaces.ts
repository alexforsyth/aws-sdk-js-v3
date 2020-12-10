import { EC2Client } from "../EC2Client";
import { WaiterOptions } from "@aws-sdk/util-waiter";

export interface EC2ClientWaiter extends WaiterOptions {
  client: EC2Client;
}
