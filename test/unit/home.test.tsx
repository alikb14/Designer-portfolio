import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import FoundationHome from "@/app/page";

describe("foundation home", () => {
  it("links to the interaction risk spike", () => {
    render(<FoundationHome />);

    expect(
      screen.getByRole("link", {
        name: /open the earth and preview-card risk spike/i,
      }),
    ).toHaveAttribute("href", "/spikes/interactions");
  });
});
