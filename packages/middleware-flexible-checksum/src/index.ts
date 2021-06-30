import { HttpRequest } from "@aws-sdk/protocol-http";
import {
  BuildHandler,
  BuildHandlerArguments,
  BuildHandlerOutput,
  BuildMiddleware,
  MetadataBearer,
} from "@aws-sdk/types";

const chooseAlgorithm = () => {
  //resolves a checksum algorithm properly
  return "awesomeAlgo";
};

const resolveChecksum = (algorithm: string, request: any) => {
  return "1223344567890-1234567890";
};

export function addChecksumHeadersMiddleware(): BuildMiddleware<any, any> {
  return <Output extends MetadataBearer>(next: BuildHandler<any, Output>): BuildHandler<any, Output> =>
    async (args: BuildHandlerArguments<any>): Promise<BuildHandlerOutput<Output>> => {
      const request = args.request;
      if (HttpRequest.isInstance(request)) {
        let headers = request.headers;
        const body = request.body;
        if (body) {
          const algo = chooseAlgorithm();
          const checkSum = resolveChecksum(algo, request);

          headers = {
            ...headers,
            [`x-amz-checksm-${algo}`]: checkSum,
          };

          // Update request headers with new set of headers.
          request.headers = headers;
        }
      }

      return next({
        ...args,
        request,
      });
    };
}
