import {Mentions} from "antd";
import {Avatar} from "../image/Avatar";

const {Option} = Mentions;

export default function MentionInput({
  searchData,
  value,
  onChange,
  onSearch,
  loading,
  placeholder,
}) {
  const searchList = searchData.map(user => user.username
      ?
      <Option key={user.username} value={user.username}
              className="antd-demo-dynamic-option">
        <Avatar avatar={user.avatar} shape="square" name={user.name} size={20}/>
        <span className="mx-3">{user.username}</span>
      </Option>
      :
      <Option key={user} value={user}
              className="antd-demo-dynamic-option">
        <span className="mx-3">{user}</span>
      </Option>);

  return (
      <Mentions style={{width: "100%"}} loading={loading}
                placeholder={placeholder}
                className="form-control"
                onChange={onChange}
                value={value}
                prefix={["@", "#"]}
                onSearch={onSearch}
      >
        {searchList}
      </Mentions>
  );
}