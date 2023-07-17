import React from "react";
import { render } from "@testing-library/react";
import PurchasedGraphEl from "../pages/admin/pages/PurchasedGraphEl";
import "jest-canvas-mock";

test("renders PurchasedGraphEl component", () => {
  const purchased = [10, 20, 30];
  const games = ["Game 1", "Game 2", "Game 3"];

  render(<PurchasedGraphEl purchased={purchased} games={games} />);
});
