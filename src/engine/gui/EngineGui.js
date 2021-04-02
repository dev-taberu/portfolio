import EngineObject from "../object/EngineObject"
import { useEffect, useState } from "react";

export default () => {

    const [texturePlayerTransform, setTexturePlayerTransform] = useState(false);

    const onKeyDown = (event) => {
        switch (event.code) {
            case 'KeyA':
                setTexturePlayerTransform(true);
                break;
            case 'KeyD':
                setTexturePlayerTransform(false);
                break;
            default:
                break;
        }
    }

    const onKeyUp = (event) => {
        switch (event.code) {
            case 'KeyA':
                setTexturePlayerTransform(false);
                break;

            case 'KeyD':
                setTexturePlayerTransform(true);
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', onKeyDown);
        document.addEventListener('keyup', onKeyUp);
    }, []);

    return(
        <div className='engine__gui'>
            <EngineObject pos={{x: 100, y: 100}} content={(
                <div>
                    this is GUI text 
                </div>
            )} />
        </div>
    )
}