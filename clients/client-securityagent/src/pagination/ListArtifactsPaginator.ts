// smithy-typescript generated code
import { createPaginator } from "@smithy/core";
import type { Paginator } from "@smithy/types";

import {
  ListArtifactsCommand,
  ListArtifactsCommandInput,
  ListArtifactsCommandOutput,
} from "../commands/ListArtifactsCommand";
import { SecurityAgentClient } from "../SecurityAgentClient";
import type { SecurityAgentPaginationConfiguration } from "./Interfaces";

/**
 * @public
 */
export const paginateListArtifacts: (
  config: SecurityAgentPaginationConfiguration,
  input: ListArtifactsCommandInput,
  ...rest: any[]
) => Paginator<ListArtifactsCommandOutput> = createPaginator<
  SecurityAgentPaginationConfiguration,
  ListArtifactsCommandInput,
  ListArtifactsCommandOutput
>(SecurityAgentClient, ListArtifactsCommand, "nextToken", "nextToken", "maxResults");
