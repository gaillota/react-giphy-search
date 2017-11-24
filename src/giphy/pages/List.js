import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Loading from '../../components/Loading'
import Item from './Item'

import './List.css'

const List = ({ gifs = [], loading }) => {
    
    return (
        <div>
            <section className="gifs-grid">
                {gifs.map(gif => <Item gif={gif} key={gif.id}/>)}
            </section>
            {loading && (
                <Loading/>
            )}
        </div>
    )
}

List.propTypes = {
    gifs: PropTypes.array.isRequired,
}

export default connect(
    (state) => ({
        gifs: state.giphy.gifs,
        loading: state.giphy.loading,
    }),
)(List)
