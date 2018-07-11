import React, {Component} from 'react'
import LoginComponent from 'components/Login'
//import CSSModules from 'react-css-modules'
//import styles from './Search.scss'

//@CSSModules(styles)
export default class Login extends Component {


  componentWillMount = () => {
    console.log('login page')
  }
  //componentWillReceiveProps = (nextProps, nextState) => {};

  render(){
    return <div><LoginComponent/></div>
  }
}
