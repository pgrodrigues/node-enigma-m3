import Logger from "../src/logger";

describe("Logger", () => {
  test("Should not log error messages when logging is disabled", () => {
    const logSpy = jest.spyOn(console, "error");
    const logger = new Logger(false);
    const message = "Test message";

    logger.error(message);

    expect(logSpy).not.toHaveBeenCalled();
  });

  test("Should not log info messages when logging is disabled", () => {
    const logSpy = jest.spyOn(console, "info");
    const logger = new Logger(false);
    const message = "Test message";

    logger.info(message);

    expect(logSpy).not.toHaveBeenCalled();
  });

  test("Should log error messages when logging is enabled", () => {
    const logSpy = jest.spyOn(console, "error");
    const logger = new Logger(true);
    const message = "Test message";

    logger.error(message);

    expect(logSpy).toHaveBeenCalledWith(message);
  });

  test("Should log info messages when logging is enabled", () => {
    const logSpy = jest.spyOn(console, "info");
    const logger = new Logger(true);
    const message = "Test message";

    logger.info(message);

    expect(logSpy).toHaveBeenCalledWith(message);
  });
});
