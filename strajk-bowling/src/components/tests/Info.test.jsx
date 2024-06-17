import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import BookingInfo from "../BookingInfo/BookingInfo";

describe("BookingInfo Component", () => {
    let mockUpdateBookingDetails;

    beforeEach(() => {
        mockUpdateBookingDetails = vi.fn();
        render(<BookingInfo updateBookingDetails={mockUpdateBookingDetails} />);
    });

    it('should call updateBookingDetails on date change', () => {
        const dateInput = screen.getByLabelText(/date/i);
        fireEvent.change(dateInput, { target: { value: '2024-06-12' } });
        const event = mockUpdateBookingDetails.mock.calls[0][0];
    });

    
});
