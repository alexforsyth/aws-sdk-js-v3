// smithy-typescript generated code
import { createPaginator } from "@smithy/core";
import type { Paginator } from "@smithy/types";

import {
  DescribeNotifyTemplatesCommand,
  DescribeNotifyTemplatesCommandInput,
  DescribeNotifyTemplatesCommandOutput,
} from "../commands/DescribeNotifyTemplatesCommand";
import { PinpointSMSVoiceV2Client } from "../PinpointSMSVoiceV2Client";
import type { PinpointSMSVoiceV2PaginationConfiguration } from "./Interfaces";

/**
 * @public
 */
export const paginateDescribeNotifyTemplates: (
  config: PinpointSMSVoiceV2PaginationConfiguration,
  input: DescribeNotifyTemplatesCommandInput,
  ...rest: any[]
) => Paginator<DescribeNotifyTemplatesCommandOutput> = createPaginator<
  PinpointSMSVoiceV2PaginationConfiguration,
  DescribeNotifyTemplatesCommandInput,
  DescribeNotifyTemplatesCommandOutput
>(PinpointSMSVoiceV2Client, DescribeNotifyTemplatesCommand, "NextToken", "NextToken", "MaxResults");
