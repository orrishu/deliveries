import React, {Component} from 'react'
import { array, object, number } from 'prop-types'
import {translate} from 'react-polyglot'
import {inject, observer} from 'mobx-react'
import {observable, toJS} from 'mobx'
import {Row, Col, DropdownButton, MenuItem} from 'react-bootstrap'
import CSSModules from 'react-css-modules'
import styles from './deliveries.scss'

@translate()
//@inject('translationsStore')
//@inject('deliveriesStore')
@CSSModules(styles)
@observer
export default class DeliveryItem extends Component {

  static propTypes = {
    delivery: object,
    ix: number,
    employees: array
  }

  @observable isOpen = false

  openBig = () => {
    this.isOpen = !this.isOpen
  }

  render() {
    const {delivery, ix, employees, t} = this.props
    const show = this.isOpen ? {} : {display: 'none'}
    return (
      <div>
        <Row className="show-grid" onClick={this.openBig}>
          <Col xs={2} md={1}>
            <code>{`#${delivery.id}`}</code>
          </Col>
          <Col xs={8} md={4}>
            <code>{delivery.title}</code>
          </Col>
          <Col xs={8} md={4}>
            <code>{delivery.address}</code>
          </Col>
          <Col xs={6} md={3} style={{paddingBottom: '8px'}}>
            <code style={{padding: 0}}>{
              <DropdownButton
                bsStyle="default"
                bsSize="xsmall"
                title="choose"
                id={`dropdown-basic-${ix}`}
              >
                {
                  employees.map((employee, index) =>
                    <MenuItem key={index} eventKey={index} onClick={() => this.onClick(employee.id)}>{employee.name}</MenuItem>, this)
                }
              </DropdownButton>
            }</code>
          </Col>
        </Row>
        <Row className="show-grid" style={show}>
          <Col xs={24} md={12}>
            <code>aaaa</code>
          </Col>
        </Row>
      </div>
    )
  }
}
