// smithy-typescript generated code
import { createPaginator } from "@smithy/core";
import type { Paginator } from "@smithy/types";

import {
  GetEstimatedCarbonEmissionsDimensionValuesCommand,
  GetEstimatedCarbonEmissionsDimensionValuesCommandInput,
  GetEstimatedCarbonEmissionsDimensionValuesCommandOutput,
} from "../commands/GetEstimatedCarbonEmissionsDimensionValuesCommand";
import { SustainabilityClient } from "../SustainabilityClient";
import type { SustainabilityPaginationConfiguration } from "./Interfaces";

/**
 * @public
 */
export const paginateGetEstimatedCarbonEmissionsDimensionValues: (
  config: SustainabilityPaginationConfiguration,
  input: GetEstimatedCarbonEmissionsDimensionValuesCommandInput,
  ...rest: any[]
) => Paginator<GetEstimatedCarbonEmissionsDimensionValuesCommandOutput> = createPaginator<
  SustainabilityPaginationConfiguration,
  GetEstimatedCarbonEmissionsDimensionValuesCommandInput,
  GetEstimatedCarbonEmissionsDimensionValuesCommandOutput
>(SustainabilityClient, GetEstimatedCarbonEmissionsDimensionValuesCommand, "NextToken", "NextToken", "MaxResults");
