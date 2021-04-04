import EngineObject from "../object/EngineObject"
import { useEffect, useState } from "react";

export default () => {
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