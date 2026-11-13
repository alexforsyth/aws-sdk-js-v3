import {
  AccessDeniedException,
  AccessDeniedException$,
  GetRevocationStatus$,
  GetRevocationStatusCommand,
  GetRevocationStatusRequest$,
  GetRevocationStatusResponse$,
  InternalServiceErrorException,
  InternalServiceErrorException$,
  SignerData,
  SignerDataClient,
  SignerDataServiceException,
  TooManyRequestsException,
  TooManyRequestsException$,
  ValidationException,
  ValidationException$,
} from "../dist-cjs/index.js";
import assert from "node:assert";
// clients
assert(typeof SignerDataClient === "function");
assert(typeof SignerData === "function");
// commands
assert(typeof GetRevocationStatusCommand === "function");
assert(typeof GetRevocationStatus$ === "object");
// structural schemas
assert(typeof GetRevocationStatusRequest$ === "object");
assert(typeof GetRevocationStatusResponse$ === "object");
// errors
assert(AccessDeniedException.prototype instanceof SignerDataServiceException);
assert(typeof AccessDeniedException$ === "object");
assert(InternalServiceErrorException.prototype instanceof SignerDataServiceException);
assert(typeof InternalServiceErrorException$ === "object");
assert(TooManyRequestsException.prototype instanceof SignerDataServiceException);
assert(typeof TooManyRequestsException$ === "object");
assert(ValidationException.prototype instanceof SignerDataServiceException);
assert(typeof ValidationException$ === "object");
assert(SignerDataServiceException.prototype instanceof Error);
console.log(`SignerData index test passed.`);
