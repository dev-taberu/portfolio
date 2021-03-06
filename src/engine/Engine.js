import EngineGui from "./gui/EngineGui";
import EngineMap from "./map/EngineMap";
import './styles/engine.css';

export default () => {
    return(
        <div className='engine'>
            <EngineGui />
            <EngineMap height={2000} width={3000}/>
        </div>
    )
}