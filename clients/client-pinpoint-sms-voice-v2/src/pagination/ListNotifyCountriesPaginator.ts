// smithy-typescript generated code
import { createPaginator } from "@smithy/core";
import type { Paginator } from "@smithy/types";

import {
  ListNotifyCountriesCommand,
  ListNotifyCountriesCommandInput,
  ListNotifyCountriesCommandOutput,
} from "../commands/ListNotifyCountriesCommand";
import { PinpointSMSVoiceV2Client } from "../PinpointSMSVoiceV2Client";
import type { PinpointSMSVoiceV2PaginationConfiguration } from "./Interfaces";

/**
 * @public
 */
export const paginateListNotifyCountries: (
  config: PinpointSMSVoiceV2PaginationConfiguration,
  input: ListNotifyCountriesCommandInput,
  ...rest: any[]
) => Paginator<ListNotifyCountriesCommandOutput> = createPaginator<
  PinpointSMSVoiceV2PaginationConfiguration,
  ListNotifyCountriesCommandInput,
  ListNotifyCountriesCommandOutput
>(PinpointSMSVoiceV2Client, ListNotifyCountriesCommand, "NextToken", "NextToken", "MaxResults");
