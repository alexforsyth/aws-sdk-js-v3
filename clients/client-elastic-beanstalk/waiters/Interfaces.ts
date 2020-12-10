import { ElasticBeanstalkClient } from "../ElasticBeanstalkClient";
import { WaiterOptions } from "@aws-sdk/util-waiter";

export interface ElasticBeanstalkClientWaiter extends WaiterOptions {
  client: ElasticBeanstalkClient;
}
