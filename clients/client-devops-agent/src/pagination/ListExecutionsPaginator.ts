// smithy-typescript generated code
import { createPaginator } from "@smithy/core";
import type { Paginator } from "@smithy/types";

import {
  ListExecutionsCommand,
  ListExecutionsCommandInput,
  ListExecutionsCommandOutput,
} from "../commands/ListExecutionsCommand";
import { DevOpsAgentClient } from "../DevOpsAgentClient";
import type { DevOpsAgentPaginationConfiguration } from "./Interfaces";

/**
 * @public
 */
export const paginateListExecutions: (
  config: DevOpsAgentPaginationConfiguration,
  input: ListExecutionsCommandInput,
  ...rest: any[]
) => Paginator<ListExecutionsCommandOutput> = createPaginator<
  DevOpsAgentPaginationConfiguration,
  ListExecutionsCommandInput,
  ListExecutionsCommandOutput
>(DevOpsAgentClient, ListExecutionsCommand, "nextToken", "nextToken", "limit");
