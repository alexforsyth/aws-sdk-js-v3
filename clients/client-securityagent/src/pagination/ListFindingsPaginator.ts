// smithy-typescript generated code
import { createPaginator } from "@smithy/core";
import type { Paginator } from "@smithy/types";

import {
  ListFindingsCommand,
  ListFindingsCommandInput,
  ListFindingsCommandOutput,
} from "../commands/ListFindingsCommand";
import { SecurityAgentClient } from "../SecurityAgentClient";
import type { SecurityAgentPaginationConfiguration } from "./Interfaces";

/**
 * @public
 */
export const paginateListFindings: (
  config: SecurityAgentPaginationConfiguration,
  input: ListFindingsCommandInput,
  ...rest: any[]
) => Paginator<ListFindingsCommandOutput> = createPaginator<
  SecurityAgentPaginationConfiguration,
  ListFindingsCommandInput,
  ListFindingsCommandOutput
>(SecurityAgentClient, ListFindingsCommand, "nextToken", "nextToken", "maxResults");
