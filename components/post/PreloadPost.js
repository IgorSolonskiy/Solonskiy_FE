import {Avatar} from "../image/Avatar";
import {getProfile} from "../../store/profile/actions";
import {useQuery} from "@redux-requests/react";

export default function PreloadPost({content}) {
    const {data: {profile}} = useQuery(getProfile());

    return (
        <li className="d-flex align-items-center position-relative w-100 list-group-item list-group-item-action " style={{opacity:'0.5'}}>
            <div className="d-flex flex-column w-100">
                    <div className="w-100">
                        <div className=" ms-2 me-auto w-100">
                            <div
                                className="d-flex justify-content-center align-items-center ">
                                <Avatar avatar={profile.avatar} name={profile.name}
                                        size={40}/>
                                <div style={{width: "200px"}}
                                     className="fw-bold mt-2 mx-3 text-center text-uppercase ">
                                    {profile.username}
                                </div>
                            </div>
                            <p className="mt-3" style={{whiteSpace: "pre"}}>
                                {content}
                            </p>
                        </div>
                    </div>
            </div>
        </li>
    );
}
