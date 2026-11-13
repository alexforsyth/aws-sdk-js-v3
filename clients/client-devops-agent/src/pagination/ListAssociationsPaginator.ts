// smithy-typescript generated code
import { createPaginator } from "@smithy/core";
import type { Paginator } from "@smithy/types";

import {
  ListAssociationsCommand,
  ListAssociationsCommandInput,
  ListAssociationsCommandOutput,
} from "../commands/ListAssociationsCommand";
import { DevOpsAgentClient } from "../DevOpsAgentClient";
import type { DevOpsAgentPaginationConfiguration } from "./Interfaces";

/**
 * @public
 */
export const paginateListAssociations: (
  config: DevOpsAgentPaginationConfiguration,
  input: ListAssociationsCommandInput,
  ...rest: any[]
) => Paginator<ListAssociationsCommandOutput> = createPaginator<
  DevOpsAgentPaginationConfiguration,
  ListAssociationsCommandInput,
  ListAssociationsCommandOutput
>(DevOpsAgentClient, ListAssociationsCommand, "nextToken", "nextToken", "maxResults");
