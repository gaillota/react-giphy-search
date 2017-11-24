import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import './Item.css'
import Gif from '../components/Gif'

class Item extends Component {
    render() {
        const { gif } = this.props
        
        return (
            <Link
                className="gif-cell"
                to={`/${gif.id}`}
            >
                <Gif
                    gif={gif}
                    classes={`gif-image`}
                />
            </Link>
        
        )
    }
}

Item.propTypes = {
    gif: PropTypes.object.isRequired
}

export default Item
