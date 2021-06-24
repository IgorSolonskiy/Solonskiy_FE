import {Avatar} from "../image/Avatar";

export default function UserInfo({user}) {
    return (
        <li className="card w-100 mb-3" style={{borderRadius:'40px'}}>
            <div className="d-flex justify-content-around align-items-center">
                <div className="card-img-top w-25" style={{marginLeft:'10px'}}>
                    <Avatar avatar={user.avatar}  name={user.name}
                            size={35}/>
                </div>
                <div className="card-body w-100 flex-nowrap flex-grow-0"
                     style={{textOverflow: 'ellipsis', overflow: "hidden", padding: '0 5px', marginRight:'5px'}}>
                    <div className="card-title" style={{
                        fontSize: '14px',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        overflow: "hidden"
                    }}>Name: {user.name}</div>
                    <div className="card-title" style={{
                        fontSize: '14px',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        overflow: "hidden"
                    }}>Login: {user.username}</div>
                </div>
            </div>
        </li>
    );
}