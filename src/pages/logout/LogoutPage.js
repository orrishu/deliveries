import React, {Component} from 'react'
import LoginComponent from 'components/Login'
import { accountStore, routingStore } from 'stores'

export default class Logout extends Component {


  componentWillMount = () => {
    console.log('logout page')
    accountStore.logout()
    routingStore.push('/login')
  }
  //componentWillReceiveProps = (nextProps, nextState) => {};

  render(){
    return <div></div>
  }
}
