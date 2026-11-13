// smithy-typescript generated code
import { createPaginator } from "@smithy/core";
import type { Paginator } from "@smithy/types";

import {
  ListJournalRecordsCommand,
  ListJournalRecordsCommandInput,
  ListJournalRecordsCommandOutput,
} from "../commands/ListJournalRecordsCommand";
import { DevOpsAgentClient } from "../DevOpsAgentClient";
import type { DevOpsAgentPaginationConfiguration } from "./Interfaces";

/**
 * @public
 */
export const paginateListJournalRecords: (
  config: DevOpsAgentPaginationConfiguration,
  input: ListJournalRecordsCommandInput,
  ...rest: any[]
) => Paginator<ListJournalRecordsCommandOutput> = createPaginator<
  DevOpsAgentPaginationConfiguration,
  ListJournalRecordsCommandInput,
  ListJournalRecordsCommandOutput
>(DevOpsAgentClient, ListJournalRecordsCommand, "nextToken", "nextToken", "limit");
