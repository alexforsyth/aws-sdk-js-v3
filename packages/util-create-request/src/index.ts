import { MiddlewareStack } from "@aws-sdk/middleware-stack";
import { Client, Command } from "@aws-sdk/smithy-client";
import { BuildMiddleware, HttpRequest, MetadataBearer } from "@aws-sdk/types";

export async function createRequest<
  InputTypesUnion extends object,
  InputType extends InputTypesUnion,
  OutputType extends MetadataBearer = MetadataBearer
>(
  client: Client<any, InputTypesUnion, MetadataBearer, any>,
  command: Command<InputType, OutputType, any, InputTypesUnion, MetadataBearer>
): Promise<HttpRequest> {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  const interceptMiddleware: BuildMiddleware<InputType, OutputType> = next => async args => {
    return { output: { request: args.request } as any, response: undefined };
  };
  const clientStack = client.middlewareStack.clone();

  //add middleware to the last of 'build' step
  clientStack.add(interceptMiddleware, {
    step: "build",
    priority: "low"
  });

  const handler = command.resolveMiddleware(clientStack as MiddlewareStack<any, any>, client.config, undefined);

  //@ts-ignore
  return await handler(command).then(output => output.output.request);
}
