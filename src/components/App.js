
import React, { useState, useEffect, useRef } from 'react';

import TitleScene from "../Scenes/TitleScene";
import ScaleScene from "../Scenes/ScaleScene";
import DrawingScene from "../Scenes/DrawingScene";
import ExcellentScene from "../Scenes/ExcellentScene";
import { MusicButton } from './CommonButtons';

import "../stylesheets/styles.css";
import "../stylesheets/button.css";


const Switch = props => {
  const { test, children } = props
  // filter out only children with a matching prop
  return children.find(child => {
    return child.props.value === test
  })
}

var __geo;
var backgroundImageIndex = 0;
var currentLetterNum = 0;

var backgroundImageList = [
  "intro", //1
  "sb03_leter_tracing_bg", //1
  "sb03_leter_tracing_bg", //1
  "sb_03_bg_01_sl_07"
];


const App = ({ geo, _setBackground, __controlBacksound, _startTransition,
  _hideIntroTitle, _showIntroTitle, baseGeo, _isBackloaded, _audioList, currentSceneNumber
}, ref) => {

  const [index, setIndex] = useState(0);
  const [_isBackSoundPlaying, _setBackgroundPlaying] = useState(true);
  const [currentNum, setCurrentNum] = useState(currentSceneNumber)
  const musicRef = useRef();
  __geo = geo;

  useEffect(
    () => {
      return () => {
      }
    }, []
  )

  function controlBacksound() {
    __controlBacksound();
    if (_isBackSoundPlaying) {
      _setBackgroundPlaying(false);
    }
    else {
      _setBackgroundPlaying(true);
    }
  }

  const transitionSceneList = [3, 8, 15]
  function changeBackgroundImage(judgeNum) {
    if (judgeNum == 1)
      _hideIntroTitle();
    let sendNum = -1;
    if (judgeNum == 0)
      sendNum = 0;
    if (transitionSceneList.includes(judgeNum))
      sendNum = 1;
    if (judgeNum != backgroundImageIndex) {
      backgroundImageIndex = judgeNum;
      _setBackground(backgroundImageList[judgeNum], sendNum);
    }
  }

  function setFomart(sceneNum) {
    if (sceneNum == 1 && musicRef.current.className != 'commonButton') {
      musicRef.current.className =    'introText'
      setTimeout(() => {
        musicRef.current.className = 'commonButton'
      }, 1000);

    }
    setIndex(sceneNum);
    changeBackgroundImage(sceneNum);
  }

  React.useImperativeHandle(ref, () => ({
    nextFunc: () => {
      if (currentLetterNum == 0)
        setFomart(2)
      else if (currentSceneNumber < 11)
        setFomart(1);
      else
        setFomart(2);

      musicRef.current.fomartSound()

      _hideIntroTitle()
    },
    showMusicBtn: () => {

    }
  }))

  function nextFunc() {
    setFomart(index + 1);

  }

  function goHome() {
    currentLetterNum = 0;
    backgroundImageIndex = 0;
    musicRef.current.setClass('hideObject')

    _audioList.backAudio.pause();
    _audioList.backAudio.currentTime = 0;

    setIndex(0);
    // _showIntroTitle();
    _setBackground(backgroundImageList[0])
  }

  return (
    <div >
      <div className={_isBackloaded ? '' : 'hideObject'}>
        <Switch test={index}>
          <TitleScene nextFunc={nextFunc} _baseGeo={baseGeo} _geo={__geo} value={0} />

          <ScaleScene currentLetterNum={currentSceneNumber} nextFunc={nextFunc} _baseGeo={baseGeo} audioList={_audioList} _geo={__geo} value={1} />
          <DrawingScene
            startTransition={_startTransition}
            currentLetterNum={currentNum} nextFunc={nextFunc} _baseGeo={baseGeo} audioList={_audioList} _geo={__geo} value={2} />
          <ExcellentScene nextFunc={goHome} _baseGeo={baseGeo} audioList={_audioList} _geo={__geo} value={3} />
        </Switch>
      </div>

      <MusicButton ref={musicRef} _geo={__geo}
        backAudio={_audioList.backAudio} className='hideObject' />
    </div >
  );
}

export default React.forwardRef(App);
