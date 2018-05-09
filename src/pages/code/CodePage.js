import React, {Component} from 'react'
import CodeComponent from 'components/Code'
//import CSSModules from 'react-css-modules'
//import styles from './Search.scss'

//@CSSModules(styles)
export default class Code extends Component {


  componentWillMount = () => {
    console.log('code page')
  }
  //componentWillReceiveProps = (nextProps, nextState) => {};

  render(){
    return <div><CodeComponent/></div>
  }
}
