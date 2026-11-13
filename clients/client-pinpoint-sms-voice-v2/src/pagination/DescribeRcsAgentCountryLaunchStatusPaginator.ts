// smithy-typescript generated code
import { createPaginator } from "@smithy/core";
import type { Paginator } from "@smithy/types";

import {
  DescribeRcsAgentCountryLaunchStatusCommand,
  DescribeRcsAgentCountryLaunchStatusCommandInput,
  DescribeRcsAgentCountryLaunchStatusCommandOutput,
} from "../commands/DescribeRcsAgentCountryLaunchStatusCommand";
import { PinpointSMSVoiceV2Client } from "../PinpointSMSVoiceV2Client";
import type { PinpointSMSVoiceV2PaginationConfiguration } from "./Interfaces";

/**
 * @public
 */
export const paginateDescribeRcsAgentCountryLaunchStatus: (
  config: PinpointSMSVoiceV2PaginationConfiguration,
  input: DescribeRcsAgentCountryLaunchStatusCommandInput,
  ...rest: any[]
) => Paginator<DescribeRcsAgentCountryLaunchStatusCommandOutput> = createPaginator<
  PinpointSMSVoiceV2PaginationConfiguration,
  DescribeRcsAgentCountryLaunchStatusCommandInput,
  DescribeRcsAgentCountryLaunchStatusCommandOutput
>(PinpointSMSVoiceV2Client, DescribeRcsAgentCountryLaunchStatusCommand, "NextToken", "NextToken", "MaxResults");
