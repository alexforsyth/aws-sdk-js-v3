// smithy-typescript generated code
import { createPaginator } from "@smithy/core";
import type { Paginator } from "@smithy/types";

import {
  ListDiscoveredEndpointsCommand,
  ListDiscoveredEndpointsCommandInput,
  ListDiscoveredEndpointsCommandOutput,
} from "../commands/ListDiscoveredEndpointsCommand";
import { SecurityAgentClient } from "../SecurityAgentClient";
import type { SecurityAgentPaginationConfiguration } from "./Interfaces";

/**
 * @public
 */
export const paginateListDiscoveredEndpoints: (
  config: SecurityAgentPaginationConfiguration,
  input: ListDiscoveredEndpointsCommandInput,
  ...rest: any[]
) => Paginator<ListDiscoveredEndpointsCommandOutput> = createPaginator<
  SecurityAgentPaginationConfiguration,
  ListDiscoveredEndpointsCommandInput,
  ListDiscoveredEndpointsCommandOutput
>(SecurityAgentClient, ListDiscoveredEndpointsCommand, "nextToken", "nextToken", "maxResults");
