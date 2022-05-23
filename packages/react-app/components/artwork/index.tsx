import { Typography, Input } from 'antd';

const { Paragraph, Title, Text } = Typography;
const { Search } = Input;

/**
 * WIP:
 * Artwork is something about text, like a book, a topic, a twitter or some words.
 * A(someone) create a artwork, then everybody cant join with it, comment or other actions ?
 * 1. the artwork is an nft, like an ip ?
 *   artwork value comes from 'hot'? (IP or AD value)
 *   everyone can resell
 * 2. these peoples create a DAO, the rules came from A (next project...)
 */
const Artwork = () => {

  const onSearch = () => {

  }

  return (
    <div>
      <Title level={4}>艺术品：</Title>
      <Search
        placeholder="input some words"
        allowClear
        enterButton="生成 NFT"
        size="large"
        onSearch={onSearch}
      />
    </div>
  )
}

export default Artwork
