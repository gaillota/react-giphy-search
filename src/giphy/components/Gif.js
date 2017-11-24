import React from 'react'

import Img from '../../components/Img'

const Gif = ({ gif, image = 'fixed_height', classes }) => {
    return (
        <Img
            src={gif.images[image].url}
            alt={gif.slug}
            classes={classes}
        />
    )
}

export default Gif
