import React from 'react'
import { Container, Navbar, NavbarBrand } from 'reactstrap'

const Layout = ({ children }) => {
    return (
        <div>
            <Navbar light color="light" className="mb-3">
                <Container>
                    <NavbarBrand href="/">Giphy React App</NavbarBrand>
                </Container>
            </Navbar>
            {children}
        </div>
    )
}

export default Layout
