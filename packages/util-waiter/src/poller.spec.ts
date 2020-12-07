import { runPolling } from "./poller";
import { sleep } from "./utils/sleep";
import { WaiterState } from "./waiter";

jest.mock("./utils/sleep");

describe(runPolling.name, () => {
  const config = {
    minDelay: 2,
    maxDelay: 30,
    maxWaitTime: 99999,
  };
  const client = "mockClient";
  const input = "mockInput";
  const failureState = {
    state: WaiterState.FAILURE,
  };
  const successState = {
    state: WaiterState.SUCCESS,
  };
  const retryState = {
    state: WaiterState.RETRY,
  };

  let mockAcceptorChecks;

  beforeEach(() => {
    (sleep as jest.Mock).mockResolvedValueOnce("");
    jest.spyOn(global.Math, "random").mockReturnValue(0.5);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.spyOn(global.Math, "random").mockRestore();
  });

  it("should returns state in case of failure", async () => {
    mockAcceptorChecks = jest.fn().mockResolvedValueOnce(failureState);
    await expect(runPolling<string, string>(config, client, input, mockAcceptorChecks)).resolves.toStrictEqual(
      failureState
    );

    expect(mockAcceptorChecks).toHaveBeenCalled();
    expect(mockAcceptorChecks).toHaveBeenCalledTimes(1);
    expect(mockAcceptorChecks).toHaveBeenCalledWith(client, input);

    expect(sleep).toHaveBeenCalled();
    expect(sleep).toHaveBeenCalledTimes(1);
    expect(sleep).toHaveBeenCalledWith(config.minDelay);
  });

  it("returns state in case of success", async () => {
    const config = {
      minDelay: 2,
      maxDelay: 30,
      maxWaitTime: 99999,
    };

    mockAcceptorChecks = jest.fn().mockResolvedValueOnce(successState);
    await expect(runPolling<string, string>(config, client, input, mockAcceptorChecks)).resolves.toStrictEqual(
      successState
    );
    expect(sleep).toHaveBeenCalled();
    expect(sleep).toHaveBeenCalledTimes(1);
    expect(sleep).toHaveBeenCalledWith(config.minDelay);
  });

  it("sleeps as per exponentialBackoff in case of retry", async () => {
    mockAcceptorChecks = jest
      .fn()
      .mockResolvedValueOnce(retryState)
      .mockResolvedValueOnce(retryState)
      .mockResolvedValueOnce(retryState)
      .mockResolvedValueOnce(retryState)
      .mockResolvedValueOnce(retryState)
      .mockResolvedValueOnce(retryState)
      .mockResolvedValueOnce(successState);

    await expect(runPolling<string, string>(config, client, input, mockAcceptorChecks)).resolves.toStrictEqual(
      successState
    );

    expect(sleep).toHaveBeenCalled();
    expect(sleep).toHaveBeenCalledTimes(7);
    expect(sleep).toHaveBeenNthCalledWith(1, 2); // min delay
    expect(sleep).toHaveBeenNthCalledWith(2, 3); // +random() * 2
    expect(sleep).toHaveBeenNthCalledWith(3, 5); // +random() * 4
    expect(sleep).toHaveBeenNthCalledWith(4, 9); // +random() * 8
    expect(sleep).toHaveBeenNthCalledWith(5, 17); // +random() * 16
    expect(sleep).toHaveBeenNthCalledWith(6, 30); // max delay
    expect(sleep).toHaveBeenNthCalledWith(7, 30); // max delay
  });
});
