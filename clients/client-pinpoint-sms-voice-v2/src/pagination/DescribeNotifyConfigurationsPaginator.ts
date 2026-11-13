// smithy-typescript generated code
import { createPaginator } from "@smithy/core";
import type { Paginator } from "@smithy/types";

import {
  DescribeNotifyConfigurationsCommand,
  DescribeNotifyConfigurationsCommandInput,
  DescribeNotifyConfigurationsCommandOutput,
} from "../commands/DescribeNotifyConfigurationsCommand";
import { PinpointSMSVoiceV2Client } from "../PinpointSMSVoiceV2Client";
import type { PinpointSMSVoiceV2PaginationConfiguration } from "./Interfaces";

/**
 * @public
 */
export const paginateDescribeNotifyConfigurations: (
  config: PinpointSMSVoiceV2PaginationConfiguration,
  input: DescribeNotifyConfigurationsCommandInput,
  ...rest: any[]
) => Paginator<DescribeNotifyConfigurationsCommandOutput> = createPaginator<
  PinpointSMSVoiceV2PaginationConfiguration,
  DescribeNotifyConfigurationsCommandInput,
  DescribeNotifyConfigurationsCommandOutput
>(PinpointSMSVoiceV2Client, DescribeNotifyConfigurationsCommand, "NextToken", "NextToken", "MaxResults");
