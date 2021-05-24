import {useSelector} from "react-redux";
import { Spin, Pagination } from 'antd';

import UserInfo from "../user/UserInfo";

export default function UsersPaginateList({onChange}) {
    const {paginateUsers} = useSelector((state) => state.users)
    const users =  paginateUsers.data;

    const usersList = users ?
        <div className='d-flex flex-column w-100 flex-grow-1 align-items-center'>
            <ul className='list-group w-100 mt-3 border border-bottom-0 flex-grow-1 mb-3' style={{minHeight:'760px'}}>
                {users.map(user => <UserInfo user={user} key={user.id}/>)}
            </ul>
            <Pagination defaultCurrent={1}
                        pageSize={paginateUsers.meta.per_page}
                        total={paginateUsers.meta.total}
                        onChange={onChange}
                        className='mt-3 mb-3'/>
        </div>
        :
        <div className='w-100 h-50 d-flex align-items-center justify-content-center'>
            <Spin size="large" />
        </div>

    return usersList;
}