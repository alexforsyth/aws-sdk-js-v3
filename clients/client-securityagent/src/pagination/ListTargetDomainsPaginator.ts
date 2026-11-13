// smithy-typescript generated code
import { createPaginator } from "@smithy/core";
import type { Paginator } from "@smithy/types";

import {
  ListTargetDomainsCommand,
  ListTargetDomainsCommandInput,
  ListTargetDomainsCommandOutput,
} from "../commands/ListTargetDomainsCommand";
import { SecurityAgentClient } from "../SecurityAgentClient";
import type { SecurityAgentPaginationConfiguration } from "./Interfaces";

/**
 * @public
 */
export const paginateListTargetDomains: (
  config: SecurityAgentPaginationConfiguration,
  input: ListTargetDomainsCommandInput,
  ...rest: any[]
) => Paginator<ListTargetDomainsCommandOutput> = createPaginator<
  SecurityAgentPaginationConfiguration,
  ListTargetDomainsCommandInput,
  ListTargetDomainsCommandOutput
>(SecurityAgentClient, ListTargetDomainsCommand, "nextToken", "nextToken", "maxResults");
