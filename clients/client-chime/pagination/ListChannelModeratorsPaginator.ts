import { Chime } from "../Chime";
import { ChimeClient } from "../ChimeClient";
import {
  ListChannelModeratorsCommand,
  ListChannelModeratorsCommandInput,
  ListChannelModeratorsCommandOutput,
} from "../commands/ListChannelModeratorsCommand";
import { ChimePaginationConfiguration } from "./Interfaces";
import { Paginator } from "@aws-sdk/types";

const makePagedClientRequest = async (
  client: ChimeClient,
  input: ListChannelModeratorsCommandInput,
  ...args: any
): Promise<ListChannelModeratorsCommandOutput> => {
  // @ts-ignore
  return await client.send(new ListChannelModeratorsCommand(input), ...args);
};
const makePagedRequest = async (
  client: Chime,
  input: ListChannelModeratorsCommandInput,
  ...args: any
): Promise<ListChannelModeratorsCommandOutput> => {
  // @ts-ignore
  return await client.listChannelModerators(input, ...args);
};
export async function* paginateListChannelModerators(
  config: ChimePaginationConfiguration,
  input: ListChannelModeratorsCommandInput,
  ...additionalArguments: any
): Paginator<ListChannelModeratorsCommandOutput> {
  let token: string | undefined = config.startingToken || undefined;
  let hasNext = true;
  let page: ListChannelModeratorsCommandOutput;
  while (hasNext) {
    input.NextToken = token;
    input["MaxResults"] = config.pageSize;
    if (config.client instanceof Chime) {
      page = await makePagedRequest(config.client, input, ...additionalArguments);
    } else if (config.client instanceof ChimeClient) {
      page = await makePagedClientRequest(config.client, input, ...additionalArguments);
    } else {
      throw new Error("Invalid client, expected Chime | ChimeClient");
    }
    yield page;
    token = page.NextToken;
    hasNext = !!token;
  }
  // @ts-ignore
  return undefined;
}
