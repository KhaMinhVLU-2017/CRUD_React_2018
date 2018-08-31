import React, { Component } from 'react'
import { Container, Row, Col, Alert } from 'reactstrap'
import './App.css'
import FormInput from './component/content'
import FooterMeo from './component/footer'
import Logo from './images/LogoNhiPNG.png'

class App extends Component {
  render () {
    return (
      <Container fluid>
        <Row >
          <Col className='first_img' md={12}>
            <img className='first_logo' src={Logo} alt='Nhi Cosmetics'/>
          </Col>
          <Col md={12}>
            <Alert style={{ textAlign: 'center' }} color='info'><h1 className='first_head'>Welcom to Todo Learn</h1></Alert>
          </Col>
          <FormInput />
          <Col className='last_foot' md={12}></Col>
          <FooterMeo />
        </Row>
      </Container>
    )
  }
}

export default App
