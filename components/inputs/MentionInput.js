import {Mentions} from 'antd';
import {Avatar} from '../image/Avatar';

const {Option} = Mentions;

export default function MentionInput({
  searchData,
  value,
  onChange,
  onSearch,
  loading,
  placeholder,
  style,
}) {
  const searchList = searchData.map(data => data.username
      ?
      <Option key={data.username} value={data.username}
              className="antd-demo-dynamic-option">
        <Avatar avatar={data.avatar} shape="square" name={data.name} size={20}/>
        <span className="mx-3">{data.username}</span>
      </Option>
      :
      <Option key={data.name} value={data.name}
              className="antd-demo-dynamic-option">
        <Avatar shape="square" name="#" size={20}/>
        <span className="mx-3">{data.name}</span>
      </Option>);

  return (
      <Mentions style={style} loading={loading}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                prefix={['@', '#']}
                onSearch={onSearch}
      >
        {searchList}
      </Mentions>
  );
}