import React, { PureComponent } from "react";
import Header from "./components/Header/Header";
import SearchInput from "./components/SearchInput/SearchInput";
import filterEmoji from "./components/utils/filterEmoji";
import EmojiResults from "./components/EmojiResult/EmojiResults";

export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      filteredEmoji: filterEmoji("", 20)
    };
  }

  handleSearchChange = event => {
    this.setState({
      filteredEmoji: filterEmoji(event.target.value, 20)
    });
  };

  render() {
    return (
      <div>
        <Header />
        <SearchInput textChange={this.handleSearchChange} />
        <EmojiResults emojiData={this.state.filteredEmoji} />
      </div>
    );
  }
}
