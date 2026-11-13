// smithy-typescript generated code
import { createPaginator } from "@smithy/core";
import type { Paginator } from "@smithy/types";

import {
  ListIntegrationsCommand,
  ListIntegrationsCommandInput,
  ListIntegrationsCommandOutput,
} from "../commands/ListIntegrationsCommand";
import { SecurityAgentClient } from "../SecurityAgentClient";
import type { SecurityAgentPaginationConfiguration } from "./Interfaces";

/**
 * @public
 */
export const paginateListIntegrations: (
  config: SecurityAgentPaginationConfiguration,
  input: ListIntegrationsCommandInput,
  ...rest: any[]
) => Paginator<ListIntegrationsCommandOutput> = createPaginator<
  SecurityAgentPaginationConfiguration,
  ListIntegrationsCommandInput,
  ListIntegrationsCommandOutput
>(SecurityAgentClient, ListIntegrationsCommand, "nextToken", "nextToken", "maxResults");
