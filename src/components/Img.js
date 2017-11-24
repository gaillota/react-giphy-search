import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

const Img = ({ src, alt, classes }) => {
    return (
        <img src={src} alt={alt} className={classnames(classes)} />
    )
}

Img.propTypes = {
    src: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
    ]).isRequired,
    alt: PropTypes.string.isRequired,
    classes: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
};

export default Img
