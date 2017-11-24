import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import moment from 'moment'

import NoMatch from '../../components/NotFound'
import Loading from '../../components/Loading'
import Gif from '../components/Gif'
import { fetchById } from '../action-creators'
import { Col, Container, Row } from 'reactstrap'

class Details extends Component {
    componentDidMount() {
        this.props.fetchById(this.props.match.params.gifId)
    }
    
    componentWillReceiveProps(nextProps) {
        console.log('nextProps:', nextProps)
        if (nextProps.match.params.gifId !== this.props.match.params.gifId && !nextProps.gif) {
            this.props.fetchById(nextProps.match.params.gifId)
        }
    }
    
    _formatDate(rawDate) {
        const date = moment(rawDate)
        
        return `${date.format('MMM Do YYYY, HH:mm')}`
    }
    
    
    render() {
        const { loading, gif, keywords } = this.props
        
        if (loading) {
            return <Loading/>
        }
        
        if (!gif) {
            return <NoMatch/>
        }
        
        return (
            <Container>
                <Row>
                    <Col md={3}>
                        <h2>Search:
                            <small>{keywords}</small>
                        </h2>
                        {gif.source && (
                            <div>
                                <h4>Source</h4>
                                <p className="text-overflow">
                                    <span className="glyphicon glyphicon-new-window"/> <a target="_blank"
                                                                                          href={gif.source}>{gif.source}</a>
                                </p>
                            </div>
                        )}
                        <h4>Infos</h4>
                        <p>
                            Creation: {this._formatDate(gif.create_datetime)}
                        </p>
                        <p>
                            Update: {this._formatDate(gif.update_datetime)}
                        </p>
                        {(gif.user || gif.username) && (
                            <p>
                                Author: {gif.username}
                            </p>
                        )}
                    </Col>
                    <Col md={9}>
                        <h2>{gif.title}</h2>
                        <Gif
                            gif={gif}
                            image={`original`}
                            classes={`img-responsive`}
                        />
                    </Col>
                </Row>
            </Container>
        )
    }
}

Details.propTypes = {
    loading: PropTypes.bool.isRequired,
    gif: PropTypes.object,
    keywords: PropTypes.string.isRequired,
    fetchById: PropTypes.func.isRequired,
}

export default connect(
    (state, ownProps) => ({
        loading: state.giphy.loading,
        gif: state.giphy.active,
        keywords: state.giphy.keywords,
    }),
    {
        fetchById,
    },
)(Details)
