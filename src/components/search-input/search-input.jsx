import { Input } from 'antd';
import debounce from 'lodash.debounce';
import { Component } from 'react';
class SearchInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: props.text,
    };
  }

  render() {
    const { onSearchChange } = this.props;
    const { text } = this.state;

    const debouncedSearch = debounce((e) => {
      this.setState({ text: e.target.value });
      onSearchChange(e.target.value);
    }, 1500);

    return <Input onChange={debouncedSearch} defaultValue={text} placeholder="Type to search..." size="large" />;
  }
}

export default SearchInput;
