import React, {Component} from 'react'
import { array, object, number } from 'prop-types'
import {translate} from 'react-polyglot'
import {inject, observer} from 'mobx-react'
import {observable, toJS} from 'mobx'
import {Grid, Row, Col, DropdownButton, MenuItem} from 'react-bootstrap'
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
          <Col xs={1} md={1}>
            <code>{`#${delivery.id}`}</code>
          </Col>
          <Col xs={2} md={2}>
            <code>{delivery.receivedAt}</code>
          </Col>
          <Col xs={2} md={2}>
            <code>{delivery.fromAddress}</code>
          </Col>
          <Col xs={2} md={2}>
            <code>{delivery.toAddress}</code>
          </Col>
          <Col xs={2} md={2}>
            <code>{delivery.importance}</code>
          </Col>
          <Col xs={2} md={2}>
            <code>{delivery.courierDelivered}</code>
          </Col>
          <Col xs={1} md={1}>
            <code>{delivery.status}</code>
          </Col>
          {/*<Col xs={6} md={3} style={{paddingBottom: '8px'}}>
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
          </Col>*/}
        </Row>
        <Row className="show-grid" style={show}>
          <Col xs={12} md={12}>
            <Row>
              <Col xs={6} md={6}>
                <div>{t('deliveries.from')}: {delivery.from}</div>
                <div>{t('deliveries.to')}: {delivery.to}</div>
                <div>{t('deliveries.deliveryNote')}: {delivery.deliveryNote}</div>
                <div>{t('deliveries.name1')}: {delivery.name1}</div>
                <div>{t('deliveries.name2')}: {delivery.name2}</div>
              </Col>
              <Col xs={6} md={6}>
                <div>{t('deliveries.date')}: {delivery.date}</div>
                <div>{t('deliveries.description')}: {delivery.description}</div>
                <div>{t('deliveries.combo')}: {delivery.combo1}</div>
                <div>{t('deliveries.reciever1')}: {delivery.reciever1}</div>
                <div>{t('deliveries.collect')}: {delivery.collect}</div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    )
  }
}
