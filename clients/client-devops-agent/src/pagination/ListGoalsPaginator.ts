// smithy-typescript generated code
import { createPaginator } from "@smithy/core";
import type { Paginator } from "@smithy/types";

import { ListGoalsCommand, ListGoalsCommandInput, ListGoalsCommandOutput } from "../commands/ListGoalsCommand";
import { DevOpsAgentClient } from "../DevOpsAgentClient";
import type { DevOpsAgentPaginationConfiguration } from "./Interfaces";

/**
 * @public
 */
export const paginateListGoals: (
  config: DevOpsAgentPaginationConfiguration,
  input: ListGoalsCommandInput,
  ...rest: any[]
) => Paginator<ListGoalsCommandOutput> = createPaginator<
  DevOpsAgentPaginationConfiguration,
  ListGoalsCommandInput,
  ListGoalsCommandOutput
>(DevOpsAgentClient, ListGoalsCommand, "nextToken", "nextToken", "limit");
