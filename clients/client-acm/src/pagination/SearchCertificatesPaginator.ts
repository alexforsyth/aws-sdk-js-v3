// smithy-typescript generated code
import { createPaginator } from "@smithy/core";
import type { Paginator } from "@smithy/types";

import { ACMClient } from "../ACMClient";
import {
  SearchCertificatesCommand,
  SearchCertificatesCommandInput,
  SearchCertificatesCommandOutput,
} from "../commands/SearchCertificatesCommand";
import type { ACMPaginationConfiguration } from "./Interfaces";

/**
 * @public
 */
export const paginateSearchCertificates: (
  config: ACMPaginationConfiguration,
  input: SearchCertificatesCommandInput,
  ...rest: any[]
) => Paginator<SearchCertificatesCommandOutput> = createPaginator<
  ACMPaginationConfiguration,
  SearchCertificatesCommandInput,
  SearchCertificatesCommandOutput
>(ACMClient, SearchCertificatesCommand, "NextToken", "NextToken", "MaxResults");
