import {Mentions} from "antd";
import {Avatar} from "../image/Avatar";
import {useState} from "react";
import {Api} from "../../api";

const {Option} = Mentions;

export default function DynamicInput({
  value,
  onChange,
  placeholder,
}) {
  const [loading, setLoading] = useState(false);
  const [searchData, setSearchData] = useState([]);

  const handleSearch = async (search, prefix) => {
    setLoading(!!search);

    if (search.length > 1 && !searchData.length) {
      return setLoading(false);
    }

    const dynamicData = prefix === "@"
        ? await Api.Users.search(search)
        : await Api.Tags.search(search);

    setLoading(false);
    setSearchData(dynamicData);
  };

  const searchList = searchData.map(({name, username, avatar}) => {
    return (
        <Option key={username || name}
                value={username || name}
                className="antd-demo-dynamic-option">
          <Avatar avatar={avatar} shape="square"
                  name={username || "#"}
                  size={20}/>
          <span className="mx-3">{username || name}</span>
        </Option>
    );
  });

  return (
      <Mentions
          loading={loading} placeholder={placeholder} onChange={onChange}
          value={value} prefix={["@", "#"]} onSearch={handleSearch}
          style={{
            width: "50%",
            height: "40px",
            borderRadius: "10px",
            fontSize: "22px",
          }}
      >
        {searchList}
      </Mentions>
  );
}