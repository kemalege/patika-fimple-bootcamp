import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import emojiList from "../../emojiList.json";
import EmojiResults from '../EmojiResult/EmojiResults';
import SearchInput from '../SearchInput/SearchInput';
import App from '../../App';

describe('EmojiResults', () => {
    it('should render the emoji list', () => {
        let input
        const filter = "wink";
        
        // Render the App component
        const { getAllByText, getByRole } = render(<App/>);

        // Get the input field
        input = getByRole("textbox");

        // Filter the emoji list based on the given filter
        emojiList.filter(item => item.keywords.toLowerCase().match(filter));

        // Simulate a change event on the input field with the filter value
        fireEvent.change(input,{target:{value:filter}});

        // Expect that there are 2 elements with the text "wink" in the rendered output
        expect(getAllByText(/wink/i)).toHaveLength(2);
    });
});
