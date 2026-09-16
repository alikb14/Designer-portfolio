import { describe, expect, it, vi } from "vitest";
import { log } from "@/lib/observability/logger";

describe("logger", () => {
  it("redacts sensitive context values", () => {
    const spy = vi.spyOn(console, "info").mockImplementation(() => undefined);

    log("info", "test.event", {
      nested: { accessToken: "private-value" },
      requestId: "safe-value",
    });

    expect(spy).toHaveBeenCalledWith(
      expect.stringContaining('"accessToken":"[redacted]"'),
    );
    expect(spy).toHaveBeenCalledWith(
      expect.stringContaining('"requestId":"safe-value"'),
    );
  });
});
