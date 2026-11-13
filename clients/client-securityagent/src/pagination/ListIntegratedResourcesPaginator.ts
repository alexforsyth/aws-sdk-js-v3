// smithy-typescript generated code
import { createPaginator } from "@smithy/core";
import type { Paginator } from "@smithy/types";

import {
  ListIntegratedResourcesCommand,
  ListIntegratedResourcesCommandInput,
  ListIntegratedResourcesCommandOutput,
} from "../commands/ListIntegratedResourcesCommand";
import { SecurityAgentClient } from "../SecurityAgentClient";
import type { SecurityAgentPaginationConfiguration } from "./Interfaces";

/**
 * @public
 */
export const paginateListIntegratedResources: (
  config: SecurityAgentPaginationConfiguration,
  input: ListIntegratedResourcesCommandInput,
  ...rest: any[]
) => Paginator<ListIntegratedResourcesCommandOutput> = createPaginator<
  SecurityAgentPaginationConfiguration,
  ListIntegratedResourcesCommandInput,
  ListIntegratedResourcesCommandOutput
>(SecurityAgentClient, ListIntegratedResourcesCommand, "nextToken", "nextToken", "maxResults");
