// smithy-typescript generated code
import { createPaginator } from "@smithy/core";
import type { Paginator } from "@smithy/types";

import {
  GetEstimatedCarbonEmissionsCommand,
  GetEstimatedCarbonEmissionsCommandInput,
  GetEstimatedCarbonEmissionsCommandOutput,
} from "../commands/GetEstimatedCarbonEmissionsCommand";
import { SustainabilityClient } from "../SustainabilityClient";
import type { SustainabilityPaginationConfiguration } from "./Interfaces";

/**
 * @public
 */
export const paginateGetEstimatedCarbonEmissions: (
  config: SustainabilityPaginationConfiguration,
  input: GetEstimatedCarbonEmissionsCommandInput,
  ...rest: any[]
) => Paginator<GetEstimatedCarbonEmissionsCommandOutput> = createPaginator<
  SustainabilityPaginationConfiguration,
  GetEstimatedCarbonEmissionsCommandInput,
  GetEstimatedCarbonEmissionsCommandOutput
>(SustainabilityClient, GetEstimatedCarbonEmissionsCommand, "NextToken", "NextToken", "MaxResults");
