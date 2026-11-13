// smithy-typescript generated code
import { createPaginator } from "@smithy/core";
import type { Paginator } from "@smithy/types";

import {
  DescribeRcsAgentsCommand,
  DescribeRcsAgentsCommandInput,
  DescribeRcsAgentsCommandOutput,
} from "../commands/DescribeRcsAgentsCommand";
import { PinpointSMSVoiceV2Client } from "../PinpointSMSVoiceV2Client";
import type { PinpointSMSVoiceV2PaginationConfiguration } from "./Interfaces";

/**
 * @public
 */
export const paginateDescribeRcsAgents: (
  config: PinpointSMSVoiceV2PaginationConfiguration,
  input: DescribeRcsAgentsCommandInput,
  ...rest: any[]
) => Paginator<DescribeRcsAgentsCommandOutput> = createPaginator<
  PinpointSMSVoiceV2PaginationConfiguration,
  DescribeRcsAgentsCommandInput,
  DescribeRcsAgentsCommandOutput
>(PinpointSMSVoiceV2Client, DescribeRcsAgentsCommand, "NextToken", "NextToken", "MaxResults");
