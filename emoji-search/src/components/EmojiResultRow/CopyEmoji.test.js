import React from 'react';
import EmojiResults from '../EmojiResult/EmojiResults';
import emojiList from "../../emojiList.json";
import { render, fireEvent, screen } from '@testing-library/react';

test('should copy the relevant emoji when clicked', async() => {
    const mockSymbol = '😊'; 
    const mockTitle = 'Blush'; 

    const {getByText} = render(<EmojiResults emojiData={emojiList} />);
    
    // Get the emoji element by its title
    const clickedEmoji = getByText(mockTitle); 
    
    // Check if the emoji element has a non-empty "data-clipboard-text" attribute
    expect(clickedEmoji.parentElement.getAttribute("data-clipboard-text").length).toBeGreaterThan(0); 

    // Check if the "data-clipboard-text" attribute of the emoji element matches the mock symbol
    expect(clickedEmoji.parentElement.getAttribute("data-clipboard-text")).toBe(mockSymbol); 
});
