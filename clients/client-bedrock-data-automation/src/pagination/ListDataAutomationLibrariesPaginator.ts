// smithy-typescript generated code
import { createPaginator } from "@smithy/core";
import type { Paginator } from "@smithy/types";

import { BedrockDataAutomationClient } from "../BedrockDataAutomationClient";
import {
  ListDataAutomationLibrariesCommand,
  ListDataAutomationLibrariesCommandInput,
  ListDataAutomationLibrariesCommandOutput,
} from "../commands/ListDataAutomationLibrariesCommand";
import type { BedrockDataAutomationPaginationConfiguration } from "./Interfaces";

/**
 * @public
 */
export const paginateListDataAutomationLibraries: (
  config: BedrockDataAutomationPaginationConfiguration,
  input: ListDataAutomationLibrariesCommandInput,
  ...rest: any[]
) => Paginator<ListDataAutomationLibrariesCommandOutput> = createPaginator<
  BedrockDataAutomationPaginationConfiguration,
  ListDataAutomationLibrariesCommandInput,
  ListDataAutomationLibrariesCommandOutput
>(BedrockDataAutomationClient, ListDataAutomationLibrariesCommand, "nextToken", "nextToken", "maxResults");
