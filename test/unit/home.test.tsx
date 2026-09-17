import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import HomePage from "@/app/page";

vi.mock("next/navigation", () => ({ usePathname: () => "/" }));
vi.mock("@/components/earth/AsciiEarthCanvas", () => ({
  AsciiEarthCanvas: () => (
    <div aria-label="Animated two-dimensional ASCII Earth" />
  ),
}));

describe("portfolio home", () => {
  it("renders the approved introduction and Vimeo reel", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", { name: /yaad a 2d motion designer/i }),
    ).toBeVisible();
    expect(screen.getByTitle("You got hacked 4k final")).toHaveAttribute(
      "src",
      "https://player.vimeo.com/video/1227330980?badge=0&autopause=0&player_id=0&app_id=58479",
    );
  });
});
