import { useEffect } from "react";

export default ({width, height, pos, children, playerPos, onPlayerInside}) => {

    const isPlayerInside = () => {
        if(playerPos !== undefined) {
            return ((playerPos.x > pos.x && playerPos.x < pos.x + width) && (playerPos.y > pos.y && playerPos.y < pos.y + height));
        }
        return false;
    }

    const doPlayerInside = () => {
        if(isPlayerInside() && onPlayerInside !== undefined)
            onPlayerInside();
    }

    useEffect(() => {
        doPlayerInside();
    }, [playerPos])

    return (
        <div className='engine__map__area' style={{top: pos.y, left: pos.x, width: width, height: height}}>
            {children}
        </div>
    )
}