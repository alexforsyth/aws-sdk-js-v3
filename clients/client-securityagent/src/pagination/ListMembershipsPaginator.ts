// smithy-typescript generated code
import { createPaginator } from "@smithy/core";
import type { Paginator } from "@smithy/types";

import {
  ListMembershipsCommand,
  ListMembershipsCommandInput,
  ListMembershipsCommandOutput,
} from "../commands/ListMembershipsCommand";
import { SecurityAgentClient } from "../SecurityAgentClient";
import type { SecurityAgentPaginationConfiguration } from "./Interfaces";

/**
 * @public
 */
export const paginateListMemberships: (
  config: SecurityAgentPaginationConfiguration,
  input: ListMembershipsCommandInput,
  ...rest: any[]
) => Paginator<ListMembershipsCommandOutput> = createPaginator<
  SecurityAgentPaginationConfiguration,
  ListMembershipsCommandInput,
  ListMembershipsCommandOutput
>(SecurityAgentClient, ListMembershipsCommand, "nextToken", "nextToken", "maxResults");
