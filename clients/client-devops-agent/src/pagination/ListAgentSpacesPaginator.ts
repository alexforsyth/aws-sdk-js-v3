// smithy-typescript generated code
import { createPaginator } from "@smithy/core";
import type { Paginator } from "@smithy/types";

import {
  ListAgentSpacesCommand,
  ListAgentSpacesCommandInput,
  ListAgentSpacesCommandOutput,
} from "../commands/ListAgentSpacesCommand";
import { DevOpsAgentClient } from "../DevOpsAgentClient";
import type { DevOpsAgentPaginationConfiguration } from "./Interfaces";

/**
 * @public
 */
export const paginateListAgentSpaces: (
  config: DevOpsAgentPaginationConfiguration,
  input: ListAgentSpacesCommandInput,
  ...rest: any[]
) => Paginator<ListAgentSpacesCommandOutput> = createPaginator<
  DevOpsAgentPaginationConfiguration,
  ListAgentSpacesCommandInput,
  ListAgentSpacesCommandOutput
>(DevOpsAgentClient, ListAgentSpacesCommand, "nextToken", "nextToken", "maxResults");
