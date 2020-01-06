import {
  RAMClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes
} from "../RAMClient";
import {
  UpdateResourceShareRequest,
  UpdateResourceShareResponse
} from "../models/index";
import {
  deserializeAws_restJson1_1UpdateResourceShareCommand,
  serializeAws_restJson1_1UpdateResourceShareCommand
} from "../protocols/Aws_restJson1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import {
  HttpRequest as __HttpRequest,
  HttpResponse as __HttpResponse
} from "@aws-sdk/protocol-http";
import { Command as $Command } from "@aws-sdk/smithy-client";
import {
  FinalizeHandlerArguments,
  Handler,
  HandlerExecutionContext,
  MiddlewareStack,
  SerdeContext,
  HttpHandlerOptions as __HttpHandlerOptions
} from "@aws-sdk/types";

export type UpdateResourceShareCommandInput = UpdateResourceShareRequest;
export type UpdateResourceShareCommandOutput = UpdateResourceShareResponse;

export class UpdateResourceShareCommand extends $Command<
  UpdateResourceShareCommandInput,
  UpdateResourceShareCommandOutput,
  RAMClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: UpdateResourceShareCommandInput) {
    // Start section: command_constructor
    super();
    // End section: command_constructor
  }

  resolveMiddleware(
    clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>,
    configuration: RAMClientResolvedConfig,
    options?: __HttpHandlerOptions
  ): Handler<
    UpdateResourceShareCommandInput,
    UpdateResourceShareCommandOutput
  > {
    this.middlewareStack.use(
      getSerdePlugin(configuration, this.serialize, this.deserialize)
    );

    const stack = clientStack.concat(this.middlewareStack);

    const handlerExecutionContext: HandlerExecutionContext = {
      logger: {} as any
    };
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(
    input: UpdateResourceShareCommandInput,
    context: SerdeContext
  ): Promise<__HttpRequest> {
    return serializeAws_restJson1_1UpdateResourceShareCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: SerdeContext
  ): Promise<UpdateResourceShareCommandOutput> {
    return deserializeAws_restJson1_1UpdateResourceShareCommand(
      output,
      context
    );
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}