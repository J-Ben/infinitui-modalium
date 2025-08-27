import { ModalAnimation } from '../types';
import { runSlideEnter, runSlideExit } from './slide';
import { runCenterCircleZoomEnter, runCenterCircleZoomExit } from './centerCircleZoom';
import { runParentZoomEnter, runParentZoomExit } from './parentZoom';

/*
import { runFadeEnter, runFadeExit } from './fade';
import { runCenterZoomEnter, runCenterZoomExit } from './centerZoom';
import { runParentZoomEnter, runParentZoomExit } from './parentZoom';
import { runWaouhEnter, runWaouhExit } from './waouh';
import { runDancingEnter, runDancingExit } from './dancing';
import { runVibrateEnter, runVibrateExit } from './vibrate';*/

export const animationRegistry: Record<string, ModalAnimation> = {
    slide: {
        runEnter: runSlideEnter,
        runExit: runSlideExit,
    },
    centercirclezoom: {
        runEnter: runCenterCircleZoomEnter,
        runExit: runCenterCircleZoomExit,
    },
    parentzoom: {
        runEnter: runParentZoomEnter,
        runExit: runParentZoomExit,
    },
    /*zoom: {
      runEnter: runZoomEnter,
      runExit: runZoomExit,
    },
    fade: {
      runEnter: runFadeEnter,
      runExit: runFadeExit,
    },
    centerZoom: {
      runEnter: runCenterZoomEnter,
      runExit: runCenterZoomExit,
    },
    parentZoom: {
      runEnter: runParentZoomEnter,
      runExit: runParentZoomExit,
    },
    waouh: {
      runEnter: runWaouhEnter,
      runExit: runWaouhExit,
    },
    dancing: {
      runEnter: runDancingEnter,
      runExit: runDancingExit,
    },
    vibrate: {
      runEnter: runVibrateEnter,
      runExit: runVibrateExit,
    },*/
};
