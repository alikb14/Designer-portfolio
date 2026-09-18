import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { WorkPreviewCard } from "@/components/media/WorkPreviewCard";

let intersection: IntersectionObserverCallback;
beforeEach(() => {
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      constructor(callback: IntersectionObserverCallback) {
        intersection = callback;
      }
      observe() {}
      disconnect() {}
    },
  );
  vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => {});
});
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

it("does not revive a stopped preview when a pending play completes", async () => {
  let finish!: () => void;
  vi.spyOn(HTMLMediaElement.prototype, "play").mockImplementation(
    () =>
      new Promise<void>((resolve) => {
        finish = resolve;
      }),
  );
  render(<WorkPreviewCard />);
  fireEvent.click(screen.getByRole("button", { name: "Preview" }));
  act(() =>
    intersection(
      [{ isIntersecting: false } as IntersectionObserverEntry],
      {} as IntersectionObserver,
    ),
  );
  await act(async () => finish());
  expect(screen.getByRole("button", { name: "Preview" })).toHaveAttribute(
    "aria-pressed",
    "false",
  );
  expect(HTMLMediaElement.prototype.pause).toHaveBeenCalled();
});

it("stops playback on page visibility loss and handles failed playback", async () => {
  const play = vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue();
  render(<WorkPreviewCard />);
  await act(async () =>
    fireEvent.click(screen.getByRole("button", { name: "Preview" })),
  );
  expect(screen.getByRole("button", { name: "Stop preview" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  vi.spyOn(document, "hidden", "get").mockReturnValue(true);
  fireEvent(document, new Event("visibilitychange"));
  expect(screen.getByRole("button", { name: "Preview" })).toHaveAttribute(
    "aria-pressed",
    "false",
  );
  vi.spyOn(document, "hidden", "get").mockReturnValue(false);
  play.mockRejectedValue(new Error("Playback denied"));
  await act(async () =>
    fireEvent.click(screen.getByRole("button", { name: "Preview" })),
  );
  expect(screen.getByRole("button", { name: "Preview" })).toHaveAttribute(
    "aria-pressed",
    "false",
  );
});
