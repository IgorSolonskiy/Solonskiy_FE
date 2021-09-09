import {Button, Tooltip} from "antd";
import {ArrowLeftOutlined} from "@ant-design/icons";
import Link from "next/link";
import {useQuery} from "@redux-requests/react";
import {getUser} from "../../store/user/actions";

export default function ProfileCard() {
  const {data: {user:{username,name}}} = useQuery(getUser() );

  return (
      <div className="d-flex align-items-center w-100">
        <Link href={`/users/${username}`}>
          <Tooltip title="go back ">
            <Button shape="circle" icon={<ArrowLeftOutlined/>}/>
          </Tooltip>
        </Link>
        <div className="mx-3">
          <div className="mb-3 mt-1 fs-3"
               style={{marginBottom: "0px"}}>{name}</div>
          <div className="fs-4 text-muted">@{username}</div>
        </div>
      </div>
  );
}
