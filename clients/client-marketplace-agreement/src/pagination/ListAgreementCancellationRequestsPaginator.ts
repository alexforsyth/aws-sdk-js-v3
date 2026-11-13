// smithy-typescript generated code
import { createPaginator } from "@smithy/core";
import type { Paginator } from "@smithy/types";

import {
  ListAgreementCancellationRequestsCommand,
  ListAgreementCancellationRequestsCommandInput,
  ListAgreementCancellationRequestsCommandOutput,
} from "../commands/ListAgreementCancellationRequestsCommand";
import { MarketplaceAgreementClient } from "../MarketplaceAgreementClient";
import type { MarketplaceAgreementPaginationConfiguration } from "./Interfaces";

/**
 * @public
 */
export const paginateListAgreementCancellationRequests: (
  config: MarketplaceAgreementPaginationConfiguration,
  input: ListAgreementCancellationRequestsCommandInput,
  ...rest: any[]
) => Paginator<ListAgreementCancellationRequestsCommandOutput> = createPaginator<
  MarketplaceAgreementPaginationConfiguration,
  ListAgreementCancellationRequestsCommandInput,
  ListAgreementCancellationRequestsCommandOutput
>(MarketplaceAgreementClient, ListAgreementCancellationRequestsCommand, "nextToken", "nextToken", "maxResults");
