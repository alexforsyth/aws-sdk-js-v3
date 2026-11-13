// smithy-typescript generated code
import { createPaginator } from "@smithy/core";
import type { Paginator } from "@smithy/types";

import {
  ListServicesCommand,
  ListServicesCommandInput,
  ListServicesCommandOutput,
} from "../commands/ListServicesCommand";
import { DevOpsAgentClient } from "../DevOpsAgentClient";
import type { DevOpsAgentPaginationConfiguration } from "./Interfaces";

/**
 * @public
 */
export const paginateListServices: (
  config: DevOpsAgentPaginationConfiguration,
  input: ListServicesCommandInput,
  ...rest: any[]
) => Paginator<ListServicesCommandOutput> = createPaginator<
  DevOpsAgentPaginationConfiguration,
  ListServicesCommandInput,
  ListServicesCommandOutput
>(DevOpsAgentClient, ListServicesCommand, "nextToken", "nextToken", "maxResults");
