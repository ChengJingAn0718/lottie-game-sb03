import React from 'react';
import "../stylesheets/styles.css";
import { prePathUrl } from '../components/CommonFunctions';
import { Player } from '@lottiefiles/react-lottie-player';


export default function Scene1({ nextFunc, _geo, _baseGeo }) {

    return (
        <div className='aniObject'>
            {/* <div
                style={{
                    position: "fixed", width: _baseGeo.width * 1,
                    left: _baseGeo.width * 0 + _baseGeo.left
                    , bottom: (_baseGeo.height * 0.0 + _baseGeo.bottom) + "px",
                    pointerEvents: 'none',
                    userSelect: 'none'
                }}>
                <img draggable={false} width={"100%"}
                    src={prePathUrl() + "images/intro/sb03_intro_page_mountains.svg"}
                />
            </div>


            <div
                style={{
                    position: "fixed", width: _baseGeo.width * 0.15,
                    left: _baseGeo.width * 0.1 + _baseGeo.left
                    , bottom: (_baseGeo.height * 0.8 + _baseGeo.bottom) + "px",
                    pointerEvents: 'none',
                    userSelect: 'none'
                }}>
                <img draggable={false} width={"100%"}
                    src={prePathUrl() + "images/intro/sb03_intro_page_cloud_01.svg"}
                />
            </div>
            <div
                style={{
                    position: "fixed", width: _baseGeo.width * 0.15,
                    left: _baseGeo.width * 0.7 + _baseGeo.left
                    , bottom: (_baseGeo.height * 0.75 + _baseGeo.bottom) + "px",
                    pointerEvents: 'none',
                    userSelect: 'none'
                }}>
                <img draggable={false} width={"100%"}
                    src={prePathUrl() + "images/intro/sb03_intro_page_cloud_02.svg"}
                />
            </div>
            <div
                style={{
                    position: "fixed", width: _geo.width * 0.15,
                    left: _geo.width * 0.7 + _geo.left
                    , bottom: (_geo.height * 0.4 + _geo.top) + "px",
                    pointerEvents: 'none',
                    userSelect: 'none'
                }}>
                <img draggable={false} width={"100%"}
                    src={prePathUrl() + "images/intro/sb03_intro_page_prop_01.svg"}
                />
            </div>
            <div
                style={{
                    position: "fixed", width: _geo.width * 0.15,
                    left: _geo.width * 0.7 + _geo.left
                    , bottom: (_geo.height * 0.4 + _geo.top) + "px",
                    pointerEvents: 'none',
                    userSelect: 'none'
                }}>
                <img draggable={false} width={"100%"}
                    src={prePathUrl() + "images/intro/sb03_intro_page_prop_01.svg"}
                />
            </div>
            <div
                style={{
                    position: "fixed", width: _geo.width * 0.15,
                    left: _geo.width * 0.2 + _geo.left
                    , bottom: (_geo.height * 0.4 + _geo.top) + "px",
                    pointerEvents: 'none',
                    userSelect: 'none'
                }}>
                <img draggable={false} width={"100%"}
                    src={prePathUrl() + "images/intro/sb03_intro_page_prop_02.svg"}
                />
            </div> */}



        </div>
    );
}
