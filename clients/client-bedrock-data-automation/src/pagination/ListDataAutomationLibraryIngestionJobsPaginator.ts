// smithy-typescript generated code
import { createPaginator } from "@smithy/core";
import type { Paginator } from "@smithy/types";

import { BedrockDataAutomationClient } from "../BedrockDataAutomationClient";
import {
  ListDataAutomationLibraryIngestionJobsCommand,
  ListDataAutomationLibraryIngestionJobsCommandInput,
  ListDataAutomationLibraryIngestionJobsCommandOutput,
} from "../commands/ListDataAutomationLibraryIngestionJobsCommand";
import type { BedrockDataAutomationPaginationConfiguration } from "./Interfaces";

/**
 * @public
 */
export const paginateListDataAutomationLibraryIngestionJobs: (
  config: BedrockDataAutomationPaginationConfiguration,
  input: ListDataAutomationLibraryIngestionJobsCommandInput,
  ...rest: any[]
) => Paginator<ListDataAutomationLibraryIngestionJobsCommandOutput> = createPaginator<
  BedrockDataAutomationPaginationConfiguration,
  ListDataAutomationLibraryIngestionJobsCommandInput,
  ListDataAutomationLibraryIngestionJobsCommandOutput
>(BedrockDataAutomationClient, ListDataAutomationLibraryIngestionJobsCommand, "nextToken", "nextToken", "maxResults");
