import { useEffect, useState } from "react";

export default ({width, height, pos, children, playerPos, onPlayerEnter, onPlayerLeave}) => {


    const [playerInside, setPlayerInside] = useState(false);

    const isPlayerInside = () => {
        if(playerPos !== undefined) {
            return ((playerPos.x > pos.x && playerPos.x < pos.x + width) && (playerPos.y > pos.y && playerPos.y < pos.y + height));
        }
        return false;
    }

    useEffect(() => {
        if(isPlayerInside() === playerInside) {
            return;
        } else {
            let playerInsideState = !playerInside;
            setPlayerInside(playerInsideState);
            if(playerInsideState) {
                if(onPlayerEnter !== undefined)
                    onPlayerEnter();
            } else {
                if(onPlayerLeave !== undefined)
                    onPlayerLeave();
            }
        }
    }, [playerPos])

    return (
        <div className='engine__map__area' style={{top: pos.y, left: pos.x, width: width, height: height}}>
            {children}
        </div>
    )
}