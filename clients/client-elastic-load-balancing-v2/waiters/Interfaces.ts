import { ElasticLoadBalancingV2Client } from "../ElasticLoadBalancingV2Client";
import { WaiterOptions } from "@aws-sdk/util-waiter";

export interface ElasticLoadBalancingV2ClientWaiter extends WaiterOptions {
  client: ElasticLoadBalancingV2Client;
}
