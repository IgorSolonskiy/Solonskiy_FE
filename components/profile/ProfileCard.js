import {Button, Tooltip} from "antd";
import {ArrowLeftOutlined} from "@ant-design/icons";
import {useSelector} from "react-redux";
import {getQuerySelector} from "@redux-requests/core";
import {setProfile} from "../../store/profile/actions";
import Link from "next/link";

export default function ProfileCard() {
  const {data: {profile}} = useSelector(getQuerySelector(setProfile()));

  return (
      <div className="d-flex align-items-center w-100">
        <Link href="/profile">
          <Tooltip title="go back ">
            <Button shape="circle" icon={<ArrowLeftOutlined/>}/>
          </Tooltip>
        </Link>
        <div className="mx-3">
          <div className="mb-3 mt-1 fs-3" style={{marginBottom:'0px'}}>{profile.name}</div>
          <div className="fs-4 text-muted">@{profile.username}</div>
        </div>
      </div>
  );
}
