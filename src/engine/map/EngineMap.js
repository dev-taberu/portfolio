import { Component, useEffect, useState } from "react";
import EngineObject from "../object/EngineObject"
import groundLine from '../../assets/ground-line-texture.jpg';
import EngineMapArea from "./EngineMapArea";
import playerPng from '../../assets/player.png';

export default ({width, height}) => {

    const speed = 10;

    const [offset, setOffset] = useState({top: 0, y: 0});//useState({top: -(height - document.documentElement.clientHeight)/2,  left: -( width - document.documentElement.clientWidth)/2});
    const [playerPos, setPlayerPos] = useState({x: 390, y: 235});
    const [show, setShow] = useState(false);
    const keysDownState = {up: false, down: false, right: false, left: false};


    const onKeyDown = (event) => {
        let newKeyState = keysDownState;
        switch (event.code) {
            case 'KeyW':
                newKeyState.up = true;
                break;
            case 'KeyS':
                newKeyState.down = true;
                break;
            case 'KeyA':
                newKeyState.left = true;
                break;
            case 'KeyD':
                newKeyState.right = true;
                break;
            default:
                break;
        }
    }

    const onKeyUp = (event) => {
        let newKeyState = keysDownState;
        switch (event.code) {
            case 'KeyW':
                newKeyState.up = false;
                break;
            case 'KeyS':
                newKeyState.down = false;
                break;
            case 'KeyA':
                newKeyState.left = false;
                break;
            case 'KeyD':
                newKeyState.right = false;
                break;
            default:
                break;
        }
    }

    const camMove = () => {
        let {toX, toY} = {toX: window.scrollX, toY: window.scrollY};
        if(keysDownState.left || keysDownState.right)
            toX = playerPos.x - (document.documentElement.clientWidth / 2);
        if(keysDownState.up || keysDownState.down)
            toY = playerPos.y - (document.documentElement.clientHeight / 2);

        window.scrollTo(toX, toY);
    }

    const checkMovementPlayerLoop = () => {

        let {x, y} = playerPos;
        if(keysDownState.left)
            x -= speed;
        if(keysDownState.right)
            x += speed;
        if(keysDownState.up)
            y -= speed;
        if(keysDownState.down)
            y += speed;

        if(playerPos.x !== x || playerPos.y !== y) {
            playerPos.x = (x < 0)?0:(x > (width - 200))?(width - 200):x;
            playerPos.y = (y < 0)?0:(y > (height - 200))?(height - 200):y;
            camMove();
            setPlayerPos({x: x, y: y});
        }


        setTimeout(checkMovementPlayerLoop, 20);
    }

    useEffect(() => {
        checkMovementPlayerLoop();
        document.addEventListener('keydown', onKeyDown);
        document.addEventListener('keyup', onKeyUp);
    }, [])

    return(
        <div className='engine__map' style={{width: width, height: height, top: offset.top, left: offset.left}}>
            <EngineObject texture={{path: playerPng, height: 100, width: 120, transform: ''}} pos={{x: playerPos.x, y: playerPos.y}} />
            <EngineMapArea onPlayerEnter={() => setShow(true)} onPlayerLeave={() => setShow(false)} playerPos={playerPos} pos={{x: 370, y: 220}} height={150} width={150} >
                <EngineObject texture={{path: groundLine, height: 100, width: 100}} pos={{x: 1, y: 1}}/>
            </EngineMapArea>
        </div>
    )
}