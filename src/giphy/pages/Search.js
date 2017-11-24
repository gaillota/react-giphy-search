import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Button, Col, Container, Row } from 'reactstrap'

import { paginate } from '../action-creators'
import Form from './Form'
import List from './List'

class Search extends Component {
    componentWillMount() {
        this.props.paginate(1)
    }
    
    handleLoadMore = () => {
        const { pagination, limit } = this.props
        const { count = 0, offset = 0 } = pagination
        const page = ~~((count + offset) / limit)
        
        this.props.paginate(page + 1)
    }
    
    render() {
        const { pagination } = this.props
        const { total_count, count = 0, offset = 0 } = pagination
        const hasMorePage = total_count > offset + count
        
        return (
            <Container fluid>
                <Row className="justify-content-center mb-3">
                    <Col lg={2} md={4}>
                        <img src="/images/logo.png" alt="Logo" className="img-fluid"/>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col lg={4} md={6}>
                        <Form/>
                    </Col>
                </Row>
                
                <List/>
                
                {hasMorePage && (
                    <Row className="justify-content-center">
                        <Button outline color="primary" onClick={this.handleLoadMore}>Load more</Button>
                    </Row>
                )}
            </Container>
        )
    }
}

Search.propTypes = {
    pagination: PropTypes.object,
    limit: PropTypes.number.isRequired,
    paginate: PropTypes.func.isRequired,
}

export default connect(
    (state) => ({
        pagination: state.giphy.pagination,
        limit: state.giphy.limit,
    }),
    {
        paginate,
    },
)(Search)
