// smithy-typescript generated code
import { createPaginator } from "@smithy/core";
import type { Paginator } from "@smithy/types";

import {
  ListAgentSpacesCommand,
  ListAgentSpacesCommandInput,
  ListAgentSpacesCommandOutput,
} from "../commands/ListAgentSpacesCommand";
import { SecurityAgentClient } from "../SecurityAgentClient";
import type { SecurityAgentPaginationConfiguration } from "./Interfaces";

/**
 * @public
 */
export const paginateListAgentSpaces: (
  config: SecurityAgentPaginationConfiguration,
  input: ListAgentSpacesCommandInput,
  ...rest: any[]
) => Paginator<ListAgentSpacesCommandOutput> = createPaginator<
  SecurityAgentPaginationConfiguration,
  ListAgentSpacesCommandInput,
  ListAgentSpacesCommandOutput
>(SecurityAgentClient, ListAgentSpacesCommand, "nextToken", "nextToken", "maxResults");
