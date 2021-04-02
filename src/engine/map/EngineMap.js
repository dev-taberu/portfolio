import { Component, useEffect, useState } from "react";
import EngineObject from "../object/EngineObject"
import groundLine from '../../assets/ground-line-texture.jpg';
import EngineMapArea from "./EngineMapArea";
import playerPng from '../../assets/player.png';

export default ({width, height}) => {

    const speed = 10;

    const [offset, setOffset] = useState({top: -(height - document.documentElement.clientHeight)/2,  left: -( width - document.documentElement.clientWidth)/2});
    const [playerPos, setPlayerPos] = useState({x: 3900, y: 2350});
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

    const mapMoveUp = () => {
        if(offset.top + speed <= 0 && ((height - playerPos.y) > document.documentElement.clientHeight /2 ))
            return (offset.top + speed);
        
        return offset.top;
    }

    const mapMoveDown = () => {
        if((document.documentElement.clientHeight - height - offset.top + speed) <= 0 && (playerPos.y > (document.documentElement.clientHeight / 2)))
            return (offset.top - speed);
        return offset.top;
    }

    const mapMoveLeft = () => {

        if(offset.left + speed <= 0 && ((width - playerPos.x) > document.documentElement.clientWidth /2 ))
            return (offset.left + speed);
        else
            return offset.left;
    }
 
    const mapMoveRight = () => {
        if((document.documentElement.clientWidth - width - offset.left + speed) <= 0 && (playerPos.x > document.documentElement.clientWidth /2 ))
            return (offset.left - speed);
        return offset.left;
    }

    const mapMove = async () => {
        let {top, left} = offset;
        if(keysDownState.left)
            left = mapMoveLeft();
        if(keysDownState.right)
            left = mapMoveRight();
        if(keysDownState.up)
            top = mapMoveUp();
        if(keysDownState.down)
            top = mapMoveDown();

        if(offset.top !== top || offset.left !== left) {
            offset.top = top;
            offset.left = left;
            setOffset(offset);
        }
    }

    const checkMovementPlayerLoop = async () => {

        let {x, y} = playerPos;
        if(keysDownState.left)
            x -= 10;
        if(keysDownState.right)
            x += 10
        if(keysDownState.up)
            y -= 10
        if(keysDownState.down)
            y += 10

        if(playerPos.x !== x || playerPos.y !== y) {
            playerPos.x = x;
            playerPos.y = y;
            await mapMove();
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
            <EngineMapArea playerPos={playerPos} pos={{x: 3700, y: 2200}} height={500} width={500} onPlayerInside={() => {console.log('YEAG')}}>
                <EngineObject texture={{path: groundLine, height: 100, width: 100}} pos={{x: 1, y: 1}}/>
            </EngineMapArea>
        </div>
    )
}