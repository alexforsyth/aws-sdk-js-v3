// smithy-typescript generated code
import { createPaginator } from "@smithy/core";
import type { Paginator } from "@smithy/types";

import {
  ListBacklogTasksCommand,
  ListBacklogTasksCommandInput,
  ListBacklogTasksCommandOutput,
} from "../commands/ListBacklogTasksCommand";
import { DevOpsAgentClient } from "../DevOpsAgentClient";
import type { DevOpsAgentPaginationConfiguration } from "./Interfaces";

/**
 * @public
 */
export const paginateListBacklogTasks: (
  config: DevOpsAgentPaginationConfiguration,
  input: ListBacklogTasksCommandInput,
  ...rest: any[]
) => Paginator<ListBacklogTasksCommandOutput> = createPaginator<
  DevOpsAgentPaginationConfiguration,
  ListBacklogTasksCommandInput,
  ListBacklogTasksCommandOutput
>(DevOpsAgentClient, ListBacklogTasksCommand, "nextToken", "nextToken", "limit");
