import { ElastiCache } from "../ElastiCache";
import { ElastiCacheClient } from "../ElastiCacheClient";
import {
  DescribeReplicationGroupsCommand,
  DescribeReplicationGroupsCommandInput,
  DescribeReplicationGroupsCommandOutput,
} from "../commands/DescribeReplicationGroupsCommand";
import { ElastiCachePaginationConfiguration } from "./Interfaces";
import { Paginator } from "@aws-sdk/types";

const makePagedClientRequest = async (
  client: ElastiCacheClient,
  input: DescribeReplicationGroupsCommandInput,
  ...args: any
): Promise<DescribeReplicationGroupsCommandOutput> => {
  // @ts-ignore
  return await client.send(new DescribeReplicationGroupsCommand(input, ...args));
};
const makePagedRequest = async (
  client: ElastiCache,
  input: DescribeReplicationGroupsCommandInput,
  ...args: any
): Promise<DescribeReplicationGroupsCommandOutput> => {
  // @ts-ignore
  return await client.describeReplicationGroups(input, ...args);
};
export async function* describeReplicationGroupsPaginate(
  config: ElastiCachePaginationConfiguration,
  input: DescribeReplicationGroupsCommandInput,
  ...additionalArguments: any
): Paginator<DescribeReplicationGroupsCommandOutput> {
  let token: string | undefined = config.startingToken || "";
  let hasNext = true;
  let page: DescribeReplicationGroupsCommandOutput;
  while (hasNext) {
    input["Marker"] = token;
    input["MaxRecords"] = config.pageSize;
    if (config.client instanceof ElastiCache) {
      page = await makePagedRequest(config.client, input, ...additionalArguments);
    } else if (config.client instanceof ElastiCacheClient) {
      page = await makePagedClientRequest(config.client, input, ...additionalArguments);
    } else {
      throw new Error("Invalid client, expected ElastiCache | ElastiCacheClient");
    }
    yield page;
    token = page["Marker"];
    hasNext = !!token;
  }
  // @ts-ignore
  return undefined;
}
