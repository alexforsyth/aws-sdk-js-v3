// smithy-typescript generated code
/**
 * <p>Request structure for checking revocation status.</p>
 * @public
 */
export interface GetRevocationStatusRequest {
  /**
   * <p>The timestamp when the artifact was signed, in ISO 8601 format.</p>
   * @public
   */
  signatureTimestamp: Date | undefined;

  /**
   * <p>The platform identifier for the signing platform used.</p>
   * @public
   */
  platformId: string | undefined;

  /**
   * <p>The ARN of the signing profile version used to sign the artifact.</p>
   * @public
   */
  profileVersionArn: string | undefined;

  /**
   * <p>The ARN of the signing job that produced the signature.</p>
   * @public
   */
  jobArn: string | undefined;

  /**
   * <p>List of certificate hashes to check for revocation.</p>
   * @public
   */
  certificateHashes: string[] | undefined;
}

/**
 * <p>Response containing the list of revoked entities.</p>
 * @public
 */
export interface GetRevocationStatusResponse {
  /**
   * <p>List of entity identifiers that have been revoked. Empty if no revocations found.</p>
   * @public
   */
  revokedEntities?: string[] | undefined;
}
