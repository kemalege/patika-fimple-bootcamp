import React from "react";
import '@testing-library/jest-dom'

import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("Header component", () => {
    let header;
    // Define the expected images
    const expectedImages = [
        {
            src: "//cdn.jsdelivr.net/emojione/assets/png/1f638.png",
            width: "32",
            height: "32"
        },
        {
            src: "//cdn.jsdelivr.net/emojione/assets/png/1f63a.png",
            width: "32",
            height: "32"
        }
    ];

    it("renders header section successfully", () => {
        // Render the Header component
        render(<Header/>);

        // Find and assert the presence of the header text
        header = screen.getByText(/Emoji Search/i);
        expect(header).toBeInTheDocument();

        // Find all images and assert their attributes
        const images = screen.getAllByRole("img");

        // Compare each image with the expected images
        expectedImages.forEach((expectedImage, index) => {
            expect(images[index]).toHaveAttribute("src", expectedImage.src);
            expect(images[index]).toHaveAttribute("width", expectedImage.width);
            expect(images[index]).toHaveAttribute("height", expectedImage.height);
        });
    });
})
