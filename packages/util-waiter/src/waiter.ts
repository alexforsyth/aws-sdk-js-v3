import { AbortController } from "@aws-sdk/types";

export interface WaiterConfiguration<Client> {
  /**
   * Required service client
   */
  client: Client;

  /**
   * The amount of time in seconds a user is willing to wait for a waiter to complete.
   */
  maxWaitTime: number;

  /**
   * Abort controller. Used for ending the waiter early.
   */
  abortController?: AbortController;

  /**
   * The minimum amount of time to delay between retries in seconds. This value defaults
   * to service default if not specified. If specified, this value MUST be greater than
   * or equal to 1 and less than or equal to maxDelay.
   */
  minDelay?: number;

  /**
   * The maximum amount of time to delay between retries in seconds. The maximum amount
   * of time in seconds to delay between each retry. This value defaults to service default
   * if not specified. If specified, this value MUST be greater than or equal to 1.
   */
  maxDelay?: number;
}

/**
 * @private
 */
export const waiterServiceDefaults = {
  minDelay: 2,
  maxDelay: 120,
};

/**
 * @private
 */
export type WaiterOptions<Client> = WaiterConfiguration<Client> &
  Required<Pick<WaiterConfiguration<Client>, "minDelay" | "maxDelay">>;

export enum WaiterState {
  ABORTED = "ABORTED",
  FAILURE = "FAILURE",
  SUCCESS = "SUCCESS",
  RETRY = "RETRY",
  TIMEOUT = "TIMEOUT",
}

export type WaiterResult = {
  state: WaiterState;
};
