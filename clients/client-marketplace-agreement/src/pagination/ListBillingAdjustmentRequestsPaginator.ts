// smithy-typescript generated code
import { createPaginator } from "@smithy/core";
import type { Paginator } from "@smithy/types";

import {
  ListBillingAdjustmentRequestsCommand,
  ListBillingAdjustmentRequestsCommandInput,
  ListBillingAdjustmentRequestsCommandOutput,
} from "../commands/ListBillingAdjustmentRequestsCommand";
import { MarketplaceAgreementClient } from "../MarketplaceAgreementClient";
import type { MarketplaceAgreementPaginationConfiguration } from "./Interfaces";

/**
 * @public
 */
export const paginateListBillingAdjustmentRequests: (
  config: MarketplaceAgreementPaginationConfiguration,
  input: ListBillingAdjustmentRequestsCommandInput,
  ...rest: any[]
) => Paginator<ListBillingAdjustmentRequestsCommandOutput> = createPaginator<
  MarketplaceAgreementPaginationConfiguration,
  ListBillingAdjustmentRequestsCommandInput,
  ListBillingAdjustmentRequestsCommandOutput
>(MarketplaceAgreementClient, ListBillingAdjustmentRequestsCommand, "nextToken", "nextToken", "maxResults");
