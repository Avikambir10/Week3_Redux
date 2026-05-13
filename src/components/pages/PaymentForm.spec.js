import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { describe, expect, it, vi } from "vitest";

import cartReducer from "../../store/cartSlice";
import PaymentForm from "./PaymentForm";

const renderPaymentForm = (cart = []) => {
  const store = configureStore({
    reducer: {
      cartStore: cartReducer,
    },
    preloadedState: {
      cartStore: {
        cart,
      },
    },
  });

  render(
    React.createElement(
      Provider,
      { store },
      React.createElement(PaymentForm),
    ),
  );
};

describe("PaymentForm", () => {
  it("shows the payment form fields", async () => {
    renderPaymentForm();

    expect(
      screen.getByRole("heading", { name: /payment form/i }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/country/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/address/i)).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: /^male$/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/card number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/expiry date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/cvv/i)).toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: /terms/i })).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByRole("button", { name: /pay \$0.00/i })).toBeDisabled();
    });
  });

  it("shows the order summary based on cart items", async () => {
    const cart = [
      { id: 1, price: 100, qty: 2 },
      { id: 2, price: 50, qty: 1 },
    ];

    renderPaymentForm(cart);

    expect(screen.getByText("$250.00")).toBeInTheDocument();
    expect(screen.getByText("$20.00")).toBeInTheDocument();
    expect(screen.getByText("$270.00")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByRole("button", { name: /pay \$270.00/i })).toBeDisabled();
    });
  });

  it("shows validation messages when wrong values are typed", async () => {
    const user = userEvent.setup();

    renderPaymentForm();

    await user.type(screen.getByLabelText(/full name/i), "Al");
    await user.tab();
    expect(
      await screen.findByText(/name must be at least 3 characters/i),
    ).toBeInTheDocument();

    await user.type(screen.getByLabelText(/email/i), "wrong-email");
    await user.tab();
    expect(await screen.findByText(/invalid email address/i)).toBeInTheDocument();

    await user.type(screen.getByLabelText(/phone number/i), "abcdef");
    await user.tab();
    expect(await screen.findByText(/phone must be numbers only/i)).toBeInTheDocument();
  });

  it("allows payment when the form is filled correctly", async () => {
    const user = userEvent.setup();
    const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});

    renderPaymentForm([{ id: 1, price: 100, qty: 1 }]);

    await user.type(screen.getByLabelText(/full name/i), "Mithu Sharma");
    await user.type(screen.getByLabelText(/email/i), "Mithu@example.com");
    await user.type(screen.getByLabelText(/phone number/i), "9876543210");
    await user.selectOptions(screen.getByLabelText(/country/i), "India");
    await user.type(screen.getByLabelText(/address/i), "123 Main Street");
    await user.click(screen.getByRole("radio", { name: /^male$/i }));
    await user.type(screen.getByLabelText(/card number/i), "1234567890123456");
    await user.type(screen.getByLabelText(/expiry date/i), "12/30");
    await user.type(screen.getByLabelText(/cvv/i), "123");
    await user.click(screen.getByRole("checkbox", { name: /terms/i }));

    const payButton = screen.getByRole("button", { name: /pay \$108.00/i });

    await waitFor(() => {
      expect(payButton).toBeEnabled();
    });

    await user.click(payButton);

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalled();
    });
    expect(alertMock.mock.calls[0][0]).toContain("Payment Successful!");
    expect(alertMock.mock.calls[0][0]).toContain("Mithu Sharma");

    alertMock.mockRestore();
  });
});
