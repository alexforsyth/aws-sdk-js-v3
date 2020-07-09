import { HttpRequest } from "@aws-sdk/types";
import { buildQueryString } from "@aws-sdk/querystring-builder";

export function formatUrl(request: HttpRequest): string {
  const { port, query } = request;
  let { protocol, path, hostname } = request;
  if (protocol && protocol.substr(-1) !== ":") {
    protocol += ":";
  }
  if (port) {
    hostname += `:${port}`;
  }
  if (path && path.charAt(0) !== "/") {
    path = `/${path}`;
  }
  let queryString = query ? buildQueryString(query) : "";
  if (queryString && queryString[0] !== "?") {
    queryString = `?${queryString}`;
  }
  return `${protocol}//${hostname}${path}${queryString}`;
}
