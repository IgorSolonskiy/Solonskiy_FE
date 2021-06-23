import {Spin} from "antd";

export default function Spinner() {
    return (
        <div className="w-100 h-100 d-flex align-items-center justify-content-center">
            <Spin size="large"/>
        </div>
    )
}