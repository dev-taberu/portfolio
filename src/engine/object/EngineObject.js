export default ({pos, texture, content}) => {

    const renderTexture = () => {
        if(texture !== undefined) {
            return <img src={texture.path} height={texture.height} width={texture.width} style={{position: 'absolute', transform: texture.transform}}/>
        }
    }
    
    const renderContent = () => {
        if(content !== undefined) {
            return content;
        }
    }

    return(
        <div className='engine__object' style={{top: pos.y, left: pos.x}}>
            {renderTexture()}
            {renderContent()}
        </div>
    )
}