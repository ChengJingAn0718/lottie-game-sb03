import "../stylesheets/styles.css";
import "../stylesheets/button.css";

import { useState, useEffect, useRef } from "react";
import BaseImage from "../components/BaseImage";
import { playEnvirAni, pauseEnvirAni, prePathUrl } from "../components/CommonFunctions";
import Lottie from "react-lottie-segments"
import { Player } from '@lottiefiles/react-lottie-player';
import loadAnimation from "../utils/loadAnimation"
import { returnAudioPath } from "../utils/loadSound";

const transformlist = [
    { x: -45, y: 25, s: 1.9 },
    { x: -20, y: -27, s: 2 },
    { x: -70, y: 25, s: 2.6 },
    { x: -27, y: -30, s: 1.6 },
    { x: 35, y: -30, s: 1.8 },
    { x: 0, y: -50, s: 2 },
    { x: -30, y: -50, s: 2 },
    { x: 0, y: -20, s: 1.6 },
    { x: 5, y: -60, s: 2.4 },
    { x: -5, y: -50, s: 2 },
]

const scaleImageList = [
    "sb03_bg_02",
    "sb03_bg_03_sky",
    "sb03_bg_04",
    "sb03_bg_05",
    "sb03_bg_06",
    "sb03_bg_07",
    "sb03_bg_08",
    "sb03_bg_09",
    "sb03_bg_10",
    "sb03_bg_11",
    "sb03_bg_12",
]

const propList = [
    {
        path: 'sb03_train_engine_fg', s: 0.175, l: 0.635, t: 0.256,
        style: { transform: 'rotate(-3deg)' }
    },
    { path: 'sb03_bird_fg', s: 0.22, l: 0.51, t: 0.465 },
    { path: 'sb03_hot_air_balloon_fg', s: 0.35, l: 0.6, t: 0.2 },
    { path: 'sb03_boat_fg', s: 0.55, l: 0.4, t: 0.4 },
    { path: 'sb03_rabbit_fg', s: 0.3, l: 0.15, t: 0.4 },
    { path: 'sb03_tent_fg', s: 0.6, l: 0.2, t: 0.45 },
    { path: 'sb03_ball_fg', s: 0.2, l: 0.55, t: 0.68 },
    { path: 'sb03_apple_tree_fg', s: 0.8, l: 0.1, t: 0.22 },
    { path: 'sb03_frog_fg', s: 0.4, l: 0.3, t: 0.53 },
    { path: 'sb03_watermelon_fg', s: 0.6, l: 0.25, t: 0.45 },
]

const trainInfo = {
    path: 'sb03_train_engine_fg', s: 0.25, l: 0.6, t: 0.188,
    style: { transform: 'rotate(-3deg)' }
}
const audioPathList = [
    '03', '10', '17a', '22b', '27b,29', '32c,32b,34a', '39b,39c,39a', '42b,42c,44', '49b,49c,49a', '52b,54'
]


let animationData = [];
new loadAnimation('character/intro.json').then(result => {
    animationData[0] = result;
}, () => { });
new loadAnimation('character/p1.json').then(result => {
    animationData[1] = result;
}, () => { });
new loadAnimation('character/p2.json').then(result => {
    animationData[2] = result;
}, () => { });
new loadAnimation('character/p3.json').then(result => {
    animationData[3] = result;
}, () => { });
new loadAnimation('character/bird.json').then(result => {
    animationData[4] = result;
}, () => { });
function returnOption(index) {
    return {
        loop: true,
        autoplay: true,
        animationData: animationData[index],
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };
}

let waitingTime = 0

const characterPosList = [
    { s: 1, l: 0, t: 0 },
    { s: 0.85, l: 0.08, t: -0.07 },
    { s: 0.92, l: 0.04, t: -0.08 },
    { s: 0.95, l: 0.025, t: -0.05 },
]

const ballenInfoList = [
    { x: 0, y: 0.05, n: 2 },
    { x: 0, y: 0, n: 1 },
    { x: 0, y: -0.12, n: 1 },
    { x: 0, y: 0.22, n: 2 },
    { x: 0.8, y: 0.16, n: 2, r: true },
    { x: -0.05, y: 0, n: 1 },
    { x: 0, y: 0, n: 1 },   //completed..
    { x: -0.1, y: 0.05, n: 2 },
    { x: -0.05, y: 0, n: 1 },
    { x: -0.1, y: 0.07, n: 2 },
]

const movePosList = [
    { fx: -170, at: 4, gt: 6, gx: 80 },
    { fx: -170, at: 4, gt: 6, gx: 80 },
    { fx: -170, at: 4, gt: 4, gx: 80 },
    { fx: -170, at: 4, gt: 3, gx: 40 },
    { fx: 170, at: 4, gt: 4, gx: -70 },
    { fx: -170, at: 4, gt: 4, gx: 60 },
    { fx: -170, at: 4, gt: 3.5, gx: 70 },
    { fx: -170, at: 4, gt: 2, gx: 10 },
    { fx: -170, at: 4, gt: 2, gx: 40 },
    { fx: -170, at: 4, gt: 2, gx: 10 },
]


const syncTimerList = [
    [100],
    [1000, 1000],
    [500, 500, 500],
    [1000, 1000, 1000, 1000],
    [3800, 4800, 5800, 6800, 7800],
    [6000, 7000, 8000, 9000, 10000, 11000],
    [6300, 7300, 8300, 9300, 10300, 11000, 11800],
    [6300, 7300, 8300, 9300, 10300, 11000, 11800, 12800],
    [9300, 10300, 11300, 12300, 13300, 14300, 15300, 16300, 17300],
    [2500, 3500, 4500, 5500, 6500, 7500, 8800, 9800, 10800, 11800],
]


const countObjectPosList = [
    [
        { s: 0.173, l: 0.636, t: 0.26, style: { transform: 'rotate(-3deg)' } }
    ],
    [
        { s: 0.061, l: 0.565, t: 0.533 },
        { s: 0.06, l: 0.614, t: 0.572 },
    ],
    [
        { s: 0.078, l: 0.667, t: 0.261, },
        { s: 0.055, l: 0.747, t: 0.356, },
        { s: 0.077, l: 0.805, t: 0.262, },
    ],
    [
        { s: 0.11, l: 0.43, t: 0.601, },
        { s: 0.11, l: 0.558, t: 0.603, },
        { s: 0.11, l: 0.681, t: 0.602, },
        { s: 0.11, l: 0.809, t: 0.603, },
    ],
    [
        { s: 0.039, l: 0.208, t: 0.621, },
        { s: 0.04, l: 0.242, t: 0.544, },
        { s: 0.045, l: 0.274, t: 0.62, },
        { s: 0.03, l: 0.329, t: 0.552, },
        { s: 0.051, l: 0.347, t: 0.641, },
    ],
    [
        { s: 0.075, l: 0.34, t: 0.691, },
        { s: 0.055, l: 0.398, t: 0.64, },
        { s: 0.075, l: 0.444, t: 0.695, },
        { s: 0.0535, l: 0.5015, t: 0.64, },
        { s: 0.078, l: 0.5435, t: 0.69, },
        { s: 0.049, l: 0.61, t: 0.652, },
    ],
    [
        { s: 0.033, l: 0.564, t: 0.7775, },
        { s: 0.032, l: 0.6, t: 0.7375, },
        { s: 0.032, l: 0.604, t: 0.7955, },
        { s: 0.032, l: 0.635, t: 0.7625, },
        { s: 0.032, l: 0.667, t: 0.732, },
        { s: 0.032, l: 0.671, t: 0.793, },
        { s: 0.032, l: 0.704, t: 0.765, },
    ],
    [
        { s: 0.11, l: 0.22, t: 0.52, },
        { s: 0.10, l: 0.319, t: 0.495, },
        { s: 0.095, l: 0.387, t: 0.585, },
        { s: 0.092, l: 0.456, t: 0.491, },
        { s: 0.1, l: 0.501, t: 0.595, },
        { s: 0.086, l: 0.565, t: 0.51, },
        { s: 0.09, l: 0.627, t: 0.59, },
        { s: 0.095, l: 0.683, t: 0.49, },

    ],
    [
        { s: 0.029, l: 0.3598, t: 0.724, },
        { s: 0.023, l: 0.381, t: 0.683, },
        { s: 0.022, l: 0.413, t: 0.72, },
        { s: 0.022, l: 0.433, t: 0.683, },
        { s: 0.027, l: 0.4495, t: 0.735, },
        { s: 0.022, l: 0.47, t: 0.687, },
        { s: 0.023, l: 0.496, t: 0.722, },
        { s: 0.027, l: 0.526, t: 0.738, },
        { s: 0.027, l: 0.584, t: 0.732, },

    ],
    [
        { s: 0.042, l: 0.365, t: 0.76, },
        { s: 0.042, l: 0.395, t: 0.69, },
        { s: 0.048, l: 0.435, t: 0.74, },
        { s: 0.045, l: 0.477, t: 0.69, },
        { s: 0.035, l: 0.52, t: 0.66, },
        { s: 0.05, l: 0.514, t: 0.74, },
        { s: 0.038, l: 0.556, t: 0.67, },
        { s: 0.049, l: 0.574, t: 0.735, },
        { s: 0.04, l: 0.61, t: 0.675, },
        { s: 0.051, l: 0.645, t: 0.725, },
    ]
]

let isTest = 1;
const outLineArray = [
    'train_engine',
    'bird',
    'hot_air_balloon',
    'boat',
    'rabbit',
    'tent',
    'ball',
    'apple_tree',
    'frog',
    'watermelon'
]

let timerList = []
let isDoubleAudio = 0;
let traingAniNum

export default function Scene({ nextFunc, _baseGeo, currentLetterNum, audioList, _geo
}) {
    const parentObject = useRef()
    const trainRefList = [useRef(), useRef(), useRef(), useRef()]
    const characterRef = useRef()
    const birdRef = useRef()
    const propRef = useRef(0)

    const countObjectList = Array.from({ length: (currentLetterNum + 1) }, ref => useRef())

    const [playerSegment, setPlaySegment] = useState(
        {
            segments: [10, 70],
            forceFlag: true
        }
    )
    const [isAniStop, setAniStop] = useState(true)
    const [aniNum, setAniNum] = useState(0)
    const [isObjAniStop, setObjAniStop] = useState(0)

    useEffect(() => {

        moveFunc(0, movePosList[currentLetterNum].fx)

        timerList[0] = setTimeout(() => {
            parentObject.current.style.transform = 'translate(0%,0%) scale(1)'
            parentObject.current.style.transition = '0s'
        }, 1000);

        timerList[1] = setTimeout(() => {
            appearFunc()
        }, 1800);



        return () => {
            audioList.audioPick.pause()
            audioList.audioPick.currentTime = 0

            audioList.bodyAudio1.pause()
            audioList.bodyAudio2.pause()
            audioList.bodyAudio3.pause()
            audioList.bodyAudio4.pause()
            audioList.bodyAudio5.pause()

            audioList.bodyAudio1.currentTime = 0
            audioList.bodyAudio3.currentTime = 0
            audioList.bodyAudio2.currentTime = 0
            audioList.bodyAudio4.currentTime = 0
            audioList.bodyAudio5.currentTime = 0

            timerList.map(timer => clearTimeout(timer))
        }

    }, [])

    const moveFunc = (transition, translateX) => {
        characterRef.current.style.transition = transition + 's'
        characterRef.current.style.transform = 'translateX(' + translateX + '%)'
    }

    const appearFunc = () => {
        audioList.bodyAudio1.src = returnAudioPath('01')
        audioList.bodyAudio2.src = returnAudioPath('02')

        if (audioPathList[currentLetterNum].includes(',')) {
            audioList.bodyAudio3.src = returnAudioPath(audioPathList[currentLetterNum].split(',')[0])
            audioList.bodyAudio4.src = returnAudioPath(audioPathList[currentLetterNum].split(',')[1])
            isDoubleAudio = 1
            if (audioPathList[currentLetterNum].split(',').length == 3) {
                audioList.bodyAudio5.src = returnAudioPath(audioPathList[currentLetterNum].split(',')[2])
                isDoubleAudio = 2
            }
        }
        else {
            audioList.bodyAudio3.src = returnAudioPath(audioPathList[currentLetterNum])
        }

        moveFunc(movePosList[currentLetterNum].at, 0)
        timerList[2] = setTimeout(() => {
            introFunc()
        }, movePosList[currentLetterNum].at * 1000);

    }

    const introFunc = () => {
        let duration = (audioList.bodyAudio1.duration + audioList.bodyAudio2.duration) * 1000

        audioList.bodyAudio1.play();
        timerList[3] = setTimeout(() => {
            setPlaySegment({
                segments: [85, 125],
                forceFlag: true
            })
            audioList.bodyAudio2.play()
        }, audioList.bodyAudio1.duration * 1000);

        setAniStop(false)
        timerList[4] = setTimeout(() => {
            setAniStop(true)
            setTimeout(() => {

                goFunc()
            }, 1000);
        }, duration);

    }

    const goFunc = () => {
        if (currentLetterNum == 0) {
            audioList.audioPick.play()
            traingAniNum = playEnvirAni(trainRefList, 300)
        }

        setPlaySegment({
            segments: [0, 100],
            forceFlag: true
        })
        setAniNum(ballenInfoList[currentLetterNum].n)

        moveFunc(movePosList[currentLetterNum].gt, movePosList[currentLetterNum].gx)
        timerList[5] = setTimeout(() => {
            pointerFunc()
        }, movePosList[currentLetterNum].gt * 1000 - 500);

        if (currentLetterNum == 1) {
            timerList[6] = setTimeout(() => {
                birdRef.current.style.transition = '4s linear'
                birdRef.current.style.transform = 'translateX(-300%)'

                timerList[10] = setTimeout(() => {
                    if (currentLetterNum == 1) {
                        propRef.current.setClass('showObject')
                        birdRef.current.style.transition = 'none'
                        birdRef.current.className = 'hideObject'
                        setObjAniStop(true)
                    }
                }, 4000);
            }, 2000);
        }
    }

    const pointerFunc = () => {

        syncTimerList[currentLetterNum].map((value, index) => {
            timerList[15 + index] = setTimeout(() => {
                countObjectList[index].current.setClass('appear')
                if (currentLetterNum == 0) {
                    audioList.audioPick.pause()
                    pauseEnvirAni(traingAniNum)
                    trainRefList.map(value => value.current.setClass('hideObject'))
                    propRef.current.setClass('showObject')
                }
            }, value);
        })

        setAniStop(false)
        audioList.bodyAudio3.play();
        waitingTime = 7500

        let sayingTime = audioList.bodyAudio3.duration * 1000
        if (isDoubleAudio > 0)
            sayingTime += audioList.bodyAudio4.duration * 1000
        if (isDoubleAudio > 1)
            sayingTime += audioList.bodyAudio5.duration * 1000

        if (sayingTime > waitingTime)
            waitingTime = sayingTime

        scaleFunc()

        timerList[8] = setTimeout(() => {
            if (isDoubleAudio > 0) {
                audioList.bodyAudio4.play()

                timerList[10] = setTimeout(() => {
                    if (isDoubleAudio > 1) {
                        audioList.bodyAudio5.play()
                        timerList[11] = setTimeout(() => {
                            setAniStop(true)
                        }, audioList.bodyAudio5.duration * 1000);
                    }
                    else
                        setAniStop(true)
                }, audioList.bodyAudio4.duration * 1000);
            }
            else
                setAniStop(true)
        }, audioList.bodyAudio3.duration * 1000);
    }

    const scaleFunc = () => {
        parentObject.current.style.transition = '5s'
        parentObject.current.style.transform =
            'translate(' + transformlist[currentLetterNum].x +
            '%,' + transformlist[currentLetterNum].y +
            '%) scale(' + transformlist[currentLetterNum].s + ')'
        timerList[9] = setTimeout(() => {
            nextFunc()
        }, waitingTime);
    }

    return (
        <div>
            <div
                className="aniObject"
                ref={parentObject}
                style={{
                    position: "fixed", width: _baseGeo.width + "px"
                    , height: _baseGeo.height + "px",
                    left: _baseGeo.left + 'px',
                    top: _baseGeo.bottom + 'px',
                }}
            >
                <div
                    style={{
                        position: "absolute", width: '100%'
                        , height: '100%',
                        left: '0%',
                        top: '0%'
                    }} >
                    <img
                        width={'100%'}
                        style={{
                            position: 'absolute',
                            left: '0%',
                            top: '0%',

                        }}
                        src={prePathUrl() + "images/sb_03_nt_bg/" + scaleImageList[currentLetterNum] + ".svg"}
                    />
                </div>
                {
                    currentLetterNum == 0 &&
                    trainRefList.map((value, index) =>
                        <BaseImage
                            ref={trainRefList[index]}
                            className={index != 0 ? 'hideObject' : ''}
                            url={'ani/0' + (index + 1) + '.svg'}
                            scale={trainInfo.s}
                            style={trainInfo.style}
                            posInfo={{ l: trainInfo.l, t: trainInfo.t }}
                        />
                    )
                }
                {
                    currentLetterNum == 1 &&
                    <div
                        ref={birdRef}
                        style={{
                            position: 'fixed',
                            width: _baseGeo.width * 0.15,
                            left: _baseGeo.left + _baseGeo.width * 1,
                            top: _baseGeo.bottom + _baseGeo.height * 0.55,
                            pointerEvents: 'none',
                        }}
                    >
                        <Lottie
                            options={returnOption(4)}
                            mouseDown={false}
                            isClickToPauseDisabled={true}
                            autoplay
                            loop
                            isStopped={isObjAniStop}
                        />

                    </div>
                }

                {
                    <BaseImage
                        ref={propRef}
                        url={'sb03_nt_fg/' + propList[currentLetterNum].path + '.svg'}
                        scale={propList[currentLetterNum].s}
                        style={propList[currentLetterNum].style ? propList[currentLetterNum].style : null}
                        posInfo={{ l: propList[currentLetterNum].l, t: propList[currentLetterNum].t }}
                        className={currentLetterNum > 1 ? '' : 'hideObject'}
                    />
                }

                {
                    countObjectList.map((value, index) =>
                        <BaseImage
                            className='hideObject'
                            scale={countObjectPosList[currentLetterNum][index].s}
                            posInfo={{
                                l: countObjectPosList[currentLetterNum][index].l,
                                t: countObjectPosList[currentLetterNum][index].t
                            }}
                            ref={value}
                            style={countObjectPosList[currentLetterNum][index].style ? countObjectPosList[currentLetterNum][index].style : null}
                            url={'sb03_nt_fg/sb03_' + outLineArray[currentLetterNum] + '_highlight_' + (index + 1) + '.svg'}
                        />
                    )}
                {/* character List */}

                <div
                    className="movingTopDown"
                    style={{
                        position: 'fixed',
                        width: _geo.width * 0.3,
                        height: _geo.width * 0.3,
                        left: _geo.left + _geo.width * (0.0 + ballenInfoList[currentLetterNum].x),
                        top: _geo.top + _geo.height * (-0.2 + ballenInfoList[currentLetterNum].y),
                        pointerEvents: 'none',

                    }}
                >
                    <div
                        ref={characterRef}

                        style={{ position: 'absolute', width: '100%', height: '100%', left: '0%', top: '0%', zIndex: 100 }}
                    >
                        {
                            [0, 1, 2, 3].map((value, index) =>
                                <div
                                    className={value === aniNum ? 'showObject' : 'hideObject'}
                                    style={{
                                        position: 'absolute',
                                        width: characterPosList[index].s * 100 + '%',
                                        left: characterPosList[index].l * 100 + '%',
                                        top: characterPosList[index].t * 100 + '%',
                                        transform: 'rotateY(' + (ballenInfoList[currentLetterNum].r ? '180deg)' : '0deg)'),
                                        pointerEvents: 'none',
                                    }}
                                >
                                    <Lottie
                                        options={returnOption(value)}
                                        mouseDown={false}
                                        isClickToPauseDisabled={true}

                                        playSegments={value == 0 ? playerSegment : {
                                            segments: [[30, 300], [0, 75], [30, 300]][value - 1],
                                            forceFlag: false
                                        }}
                                        isStopped={isAniStop}
                                    />
                                </div>
                            )}
                    </div>
                </div>
            </div>


            <div
                className="aniObject"
                onClick={() => {
                    setTimeout(() => {
                        nextFunc();
                    }, 200);
                }}
                style={{
                    position: "fixed", width: _geo.width * 0.055 + "px",
                    height: _geo.width * 0.055 + "px",
                    right: "2%"
                    , bottom: "5%", cursor: "pointer",
                }}>
                <img
                    draggable={false}
                    width={"100%"}
                    src={prePathUrl() + 'images/buttons/skip_blue.svg'}
                />
            </div>

        </div>
    );
}
