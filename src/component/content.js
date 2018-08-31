import React, { Component } from 'react'
import { Col, Button, Alert, Container } from 'reactstrap'
import axios from 'axios'
import loadImg from '../images/loading4.gif'
import loadingImgDetail from '../images/loading.gif'

class FormInput extends Component {
  constructor (props) {
    super(props)
    this.state = {
      mText: '',
      sport: [],
      edit: false,
      placeHol: 'Input Field',
      notifi: null,
      label: null,
      loading: true,
      loadingDetail: false,
      ixLoad: null
    }
    this.apiUrl = 'https://5b88bee01863df001433e83a.mockapi.io/todos'
    this.handerChange = this.handerChange.bind(this)
    this.HanderDelete = this.HanderDelete.bind(this)
    this.UpdateMeo = this.UpdateMeo.bind(this)
    this.UpdateFinish = this.UpdateFinish.bind(this)
  }
  handerChange (e) {
    this.setState({ mText: e.target.value })
  }
  async HanderDelete (index) {
    // console.log(index)
    let ArrCore = this.state.sport
    let ObjectDelete = ArrCore[index]// get Object From Array for convert ID original for delete
    let message = 'Delete ' + ArrCore[index].name + ' Complete'
    let label = 'danger'
    this.setState({ loadingDetail: true, ixLoad: index })
    let self = this
    await axios.delete(`${this.apiUrl}/${ObjectDelete.id}`).then(function (response) {
      delete ArrCore[index]
      self.setState({ sport: ArrCore, loadingDetail: false })
      self.alert(message, label)
    })
    // console.log(ArrCore)
  }
  async addTodo () {
    let name = this.state.mText
    if (name !== '') {
      const response = await axios.post(`${this.apiUrl}`, {
        name
      }) // 1 name because name first indentical with name inside mockapi
      // console.log(response) Data nearly post
      let arrNew = this.state.sport // get Arr Old
      // let meoObj = {
      //   id: this.state.sport.length + 1,
      //   name: name
      // }
      arrNew.push(response.data) // Add inside arr
      this.setState({ sport: arrNew })
      let message = 'Add ' + name + ' Complete'
      this.alert(message, 'warning')
      // console.log(this.state.sport)
    } else {
      this.setState({
        placeHol: 'Please input in Field'
      })
    }
  }
  UpdateMeo (index) {
    let position = index
    this.setState({
      edit: true, mText: this.state.sport[position].name, only: position
    })
  }
  async UpdateFinish () {
    let index = this.state.only // Get VI tri Index
    let ArrOld = this.state.sport // get Array
    let ObjectUpdate = ArrOld[index]
    ObjectUpdate.name = this.state.mText
    const response = await axios.put(`${this.apiUrl}/${ObjectUpdate.id}`, { name: ObjectUpdate.name }) // Update Value On Cloud
    let message = 'Upadate ' + this.state.mText + ' Complete'
    console.log(message + ' ' + response.status)
    let label = 'success'
    this.setState({ sport: ArrOld, edit: false })
    this.alert(message, label)
  }
  alert (notification, label) {
    this.setState({
      notifi: notification,
      label
    })
    setTimeout(() => {
      this.setState({ notifi: null })
    }, 2000)
  }
  validate () {
    if (this.state.mText.trim().length < 5) {
      return true
    }
    return false
  }
  async componentDidMount () {
    let self = this
    await axios.get(`${this.apiUrl}`).then(function (response) {
      self.setState({
        sport: response.data,
        loading: false
      })
      // console.log(response)
    }).catch(function (error) {
      console.log(error)
    }) // get Data From API
    // console.log(response.data)
  }
  render () {
    // console.log(this.state.mText)
    let arrSportReve = this.state.sport
    return (
      <Container >
        <Col style={{ textAlign: 'center' }} sm={12} md={12}>
          {this.state.notifi && <Alert color={this.state.label}>{this.state.notifi}</Alert>}
          <input placeholder={this.state.placeHol} required value={this.state.mText} onChange={this.handerChange} name='todo' type='text' className='form-control col-md-12 ip_Conte' />
          <br />
          <Button style={{height: 60}} size='lg' onClick={this.state.edit ? this.UpdateFinish : this.addTodo.bind(this)} className='btn-success form-control'
            disabled={this.state.mText.trim().length < 5}
          >{this.state.edit ? <h3>Update Todo</h3> : <h3>Add Todo</h3>}</Button>
          <br />
          {this.state.loading && <img className='load_img' src={loadImg} alt='loading' />}
          {!this.state.edit &&
            <Col className='mt-3' sm={12} md={12} >
              {arrSportReve.map((item, index) => (<p md={12} key={index} style={{ fontFamily: 'inhert', fontWeight: 'bold', textAlign: 'center', fontSize: 40, height: 75, margin: '20px 0' }}
                className='form-control item_div' id={item.id}>
                <Button size='sm' outline color='success' onClick={() => this.UpdateMeo(index)}>U</Button>
                &ensp;<span>{item.name}</span>&ensp;
                <Button size='sm' outline color='danger' onClick={() => { this.HanderDelete(index) }}>X</Button>
                &ensp;
                {this.state.loadingDetail && this.state.ixLoad === index && <img className='load_img_detail' src={loadingImgDetail} alt='load item' />}
              </p>))}
            </Col>
          }
        </Col>
      </Container>
    )
  }
}
export default FormInput
