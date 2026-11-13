// smithy-typescript generated code
import { createPaginator } from "@smithy/core";
import type { Paginator } from "@smithy/types";

import {
  ListApplicationsCommand,
  ListApplicationsCommandInput,
  ListApplicationsCommandOutput,
} from "../commands/ListApplicationsCommand";
import { SecurityAgentClient } from "../SecurityAgentClient";
import type { SecurityAgentPaginationConfiguration } from "./Interfaces";

/**
 * @public
 */
export const paginateListApplications: (
  config: SecurityAgentPaginationConfiguration,
  input: ListApplicationsCommandInput,
  ...rest: any[]
) => Paginator<ListApplicationsCommandOutput> = createPaginator<
  SecurityAgentPaginationConfiguration,
  ListApplicationsCommandInput,
  ListApplicationsCommandOutput
>(SecurityAgentClient, ListApplicationsCommand, "nextToken", "nextToken", "maxResults");
