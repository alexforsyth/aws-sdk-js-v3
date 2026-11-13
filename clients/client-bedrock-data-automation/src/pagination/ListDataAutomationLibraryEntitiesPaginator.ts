// smithy-typescript generated code
import { createPaginator } from "@smithy/core";
import type { Paginator } from "@smithy/types";

import { BedrockDataAutomationClient } from "../BedrockDataAutomationClient";
import {
  ListDataAutomationLibraryEntitiesCommand,
  ListDataAutomationLibraryEntitiesCommandInput,
  ListDataAutomationLibraryEntitiesCommandOutput,
} from "../commands/ListDataAutomationLibraryEntitiesCommand";
import type { BedrockDataAutomationPaginationConfiguration } from "./Interfaces";

/**
 * @public
 */
export const paginateListDataAutomationLibraryEntities: (
  config: BedrockDataAutomationPaginationConfiguration,
  input: ListDataAutomationLibraryEntitiesCommandInput,
  ...rest: any[]
) => Paginator<ListDataAutomationLibraryEntitiesCommandOutput> = createPaginator<
  BedrockDataAutomationPaginationConfiguration,
  ListDataAutomationLibraryEntitiesCommandInput,
  ListDataAutomationLibraryEntitiesCommandOutput
>(BedrockDataAutomationClient, ListDataAutomationLibraryEntitiesCommand, "nextToken", "nextToken", "maxResults");
