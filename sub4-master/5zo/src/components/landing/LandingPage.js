import React from 'react';
import "./FontIndex.css"
import Header from "./Header";

export default function LandigPage(props) {
    return (
        <div>
            <Header/>
            {props.children}
        </div>
    );
}
