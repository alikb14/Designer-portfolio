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
  it("renders the approved introduction and Work reel link", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", { name: /yaad a 2d motion designer/i }),
    ).toBeVisible();
    expect(
      screen.getByRole("link", { name: /view selected work/i }),
    ).toHaveAttribute("href", "/work");
  });
});
