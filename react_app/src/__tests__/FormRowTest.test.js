import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import FormRow from "../components/FormRow";

test("renders FormRow component", () => {
  const handleChange = jest.fn();
  const name = "name";
  const type = "text";
  const value = "john.doe";

  const { container, getByLabelText } = render(
    <FormRow
      name={name}
      type={type}
      value={value}
      handleChange={handleChange}
    />
  );

  const inputElement = getByLabelText(name);

  expect(inputElement).toBeDefined();
  expect(inputElement).toHaveAttribute("type", type);
  expect(inputElement).toHaveAttribute("name", name);

  fireEvent.change(inputElement, { target: { value: "new-value" } });

  expect(handleChange).toHaveBeenCalledTimes(1);
  expect(handleChange).toHaveBeenCalledWith(expect.any(Object));

  expect(container.firstChild).toMatchSnapshot();
});
