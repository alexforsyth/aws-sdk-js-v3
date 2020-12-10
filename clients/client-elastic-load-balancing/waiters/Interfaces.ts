import { ElasticLoadBalancingClient } from "../ElasticLoadBalancingClient";
import { WaiterOptions } from "@aws-sdk/util-waiter";

export interface ElasticLoadBalancingClientWaiter extends WaiterOptions {
  client: ElasticLoadBalancingClient;
}
