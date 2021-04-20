import React from 'react';
import {Link} from 'react-router-dom';
import './css/Setting.css'

const Setting = () => {
    return (
        <div className = "Setting">
            <div className="Setting-header">
                <Link to="/" className = "Backbutton">
                    &#60;
                </Link>
                <div className="Title">
                    설정
                </div>
            </div>
            <div className="Menu-List">
                메뉴목록
            </div>
        </div>
    )
}

export default Setting;