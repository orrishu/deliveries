import React, {Component} from 'react'
import DeliveriesComponent from 'components/Deliveries'
//import CSSModules from 'react-css-modules'
//import styles from './Results.scss'

//@CSSModules(styles)
export default class Deliveries extends Component {


  componentWillMount = () => {
    console.log('deliveries page')
  }
  //componentWillReceiveProps = (nextProps, nextState) => {};

  render(){
    return <div><DeliveriesComponent/></div>
  }
}
