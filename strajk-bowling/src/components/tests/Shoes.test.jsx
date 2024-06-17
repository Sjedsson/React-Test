import React, { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import Shoes from "../Shoes/Shoes";
import { nanoid } from 'nanoid';

describe('Shoes Component', () => {
    const mockUpdateSize = vi.fn();
    const mockAddShoe = vi.fn();
    const mockRemoveShoe = vi.fn();

    const initialShoes = [ 
        { id: nanoid(), size: ""},
        { id: nanoid(), size: ""},
    ];

    const ShoeState = () => {
        const [shoes, setShoes] = useState(initialShoes);

        const addShoe = () => {
            const newShoe = { id: nanoid(), size: ""};
            setShoes([...shoes, newShoe]);
            mockAddShoe();
        };

        const removeShoe = (id) => {
            setShoes(shoes.filter(shoe => shoe.id !== id));
            mockRemoveShoe();
        };

        const updateSize = (id, size) => {
            setShoes(shoes.map(shoe => shoe.id === id ? {...shoe, size} : shoe));
            mockUpdateSize();
        };

        return (
            <Shoes 
                updateSize={updateSize}
                addShoe={addShoe}
                removeShoe={removeShoe}
                shoes={shoes}
            />
        );
    }

    beforeEach(() => {
        render(<ShoeState />);
    });

    it('should render the correct number of shoe inputs', () => {
        const shoeSizeInputs = screen.getAllByLabelText(/shoe size \/ person \d+/i);
        expect(shoeSizeInputs).toHaveLength(initialShoes.length);
    });

    it("should call addShoe when the add button is clicked", () => {
        const addButton = screen.getByText('+');
        fireEvent.click(addButton);
        expect(mockAddShoe).toHaveBeenCalled();

        // Check if a new input has been added
        const shoeSizeInputs = screen.getAllByLabelText(/shoe size \/ person \d+/i);
        expect(shoeSizeInputs).toHaveLength(initialShoes.length + 1);
    });

    it("should call removeShoe when the remove button is clicked", () => {
        const removeButton = screen.getAllByText("-")[0];
        fireEvent.click(removeButton);
        expect(mockRemoveShoe).toHaveBeenCalled();

        // Check if an input has been removed 
        const shoeSizeInputs = screen.getAllByLabelText(/shoe size \/ person \d+/i);
        expect(shoeSizeInputs).toHaveLength(initialShoes.length - 1);
    });

    it("should call updateSize when the shoe size input is changed", () => {
        const shoeSizeInput = screen.getAllByLabelText(/shoe size \/ person \d+/i)[0];
        fireEvent.change(shoeSizeInput, { target: { value: '42' } });
        expect(mockUpdateSize).toHaveBeenCalled();
    });

});
