import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Button, Col, Form } from 'reactstrap'

import { paginate, reset, setKeywords } from '../action-creators'

class SearchForm extends Component {
    handleChange = (e) => {
        const keywords = e.target.value.trim()
        
        this.props.setKeywords(keywords)
    }
    
    handleSubmit = (e) => {
        e.preventDefault()
        
        this.props.reset()
        this.props.paginate(1)
    }
    
    render() {
        const { keywords } = this.props
        
        return (
            <Form onSubmit={this.handleSubmit}>
                <div className="form-row">
                    <Col>
                        <label htmlFor="keywords" className="sr-only">Keywords</label>
                        <input
                            type="text"
                            className="form-control"
                            onChange={this.handleChange}
                            value={keywords}
                        />
                    </Col>
                    <Col xs={2}>
                        <Button color="primary" onClick={this.handleSubmit}>Reload</Button>
                    </Col>
                </div>
            </Form>
        )
    }
}

SearchForm.propTypes = {
    keywords: PropTypes.string,
    setKeywords: PropTypes.func.isRequired,
    paginate: PropTypes.func.isRequired,
}

export default connect(
    (state) => ({
        keywords: state.giphy.keywords,
    }),
    {
        setKeywords,
        paginate,
        reset,
    },
)(SearchForm)
