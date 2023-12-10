import React from 'react';
import { render } from '@testing-library/react';
import EmojiResults from './EmojiResults';
import '@testing-library/jest-dom'
import emojiList from "../../emojiList.json";

describe('EmojiResults', () => {
  it('should render the emoji list', () => {

    // Render the EmojiResults component with the emoji list
    const { getByText } = render(<EmojiResults emojiData={emojiList} />);

    // Check if the first 20 emojis are rendered correctly
    emojiList.slice(0, 20).forEach((emoji) => {
    const emojiTitle = getByText(emoji.title);

    expect(emojiTitle).toBeInTheDocument();
    });
  });
});
