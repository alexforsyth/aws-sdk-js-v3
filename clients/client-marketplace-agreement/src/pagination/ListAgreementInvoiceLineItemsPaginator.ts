// smithy-typescript generated code
import { createPaginator } from "@smithy/core";
import type { Paginator } from "@smithy/types";

import {
  ListAgreementInvoiceLineItemsCommand,
  ListAgreementInvoiceLineItemsCommandInput,
  ListAgreementInvoiceLineItemsCommandOutput,
} from "../commands/ListAgreementInvoiceLineItemsCommand";
import { MarketplaceAgreementClient } from "../MarketplaceAgreementClient";
import type { MarketplaceAgreementPaginationConfiguration } from "./Interfaces";

/**
 * @public
 */
export const paginateListAgreementInvoiceLineItems: (
  config: MarketplaceAgreementPaginationConfiguration,
  input: ListAgreementInvoiceLineItemsCommandInput,
  ...rest: any[]
) => Paginator<ListAgreementInvoiceLineItemsCommandOutput> = createPaginator<
  MarketplaceAgreementPaginationConfiguration,
  ListAgreementInvoiceLineItemsCommandInput,
  ListAgreementInvoiceLineItemsCommandOutput
>(MarketplaceAgreementClient, ListAgreementInvoiceLineItemsCommand, "nextToken", "nextToken", "maxResults");
