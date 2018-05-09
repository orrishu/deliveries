import React, {Component} from 'react'
import {getData} from 'common/services/apiService'
import {translate} from 'react-polyglot'
import {inject, observer} from 'mobx-react'
import {observable, toJS} from 'mobx'
import {Jumbotron, Grid, Row, Col, DropdownButton, MenuItem} from 'react-bootstrap'
import CSSModules from 'react-css-modules'
import styles from './deliveries.scss'

@translate()
@inject('translationsStore')
@inject('deliveriesStore')
@CSSModules(styles)
@observer
export default class Deliveries extends Component {

  componentWillMount() {
    console.log('deliveries component')
    const {deliveriesStore} = this.props
    deliveriesStore.loadDeliveries()
    deliveriesStore.loadEmployees()
  }

  onClick = (id) => {
    console.log('id', id)
  }

  render() {
    const {deliveriesStore, t} = this.props

    return (
      <div className="container theme-showcase">
        {/*
          results.map((item, index) =>
            <div key={index}>{item.Title} - {item.Publisher} - {item.TenderType}</div>
          )
        */}
        <Jumbotron>
          <h1>{t('deliveries.title')}</h1>
          <p>
            {t('code.test')}
          </p>
        </Jumbotron>
        <Grid styleName="show-grid">
          {
            deliveriesStore.deliveries.map((delivery, index) =>
              <Row key={index} className="show-grid">
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
                      id={`dropdown-basic-${index}`}
                    >
                      {
                        deliveriesStore.employees.map((employee, index) =>
                          <MenuItem key={index} eventKey={index} onClick={() => this.onClick(employee.id)}>{employee.name}</MenuItem>, this)
                      }
                    </DropdownButton>
                  }</code>
                </Col>
              </Row>
            )
          }

          {/*<Row className="show-grid">
            <Col xs={12} md={8}>
              <code>&lt;{'Col xs={12} md={8}'} /&gt;</code>
            </Col>
            <Col xs={6} md={4}>
              <code>&lt;{'Col xs={6} md={4}'} /&gt;</code>
            </Col>
          </Row>

          <Row className="show-grid">
            <Col xs={6} md={4}>
              <code>&lt;{'Col xs={6} md={4}'} /&gt;</code>
            </Col>
            <Col xs={6} md={4}>
              <code>&lt;{'Col xs={6} md={4}'} /&gt;</code>
            </Col>
            <Col xsHidden md={4}>
              <code>&lt;{'Col xsHidden md={4}'} /&gt;</code>
            </Col>
          </Row>

          <Row className="show-grid">
            <Col xs={6} xsOffset={6}>
              <code>&lt;{'Col xs={6} xsOffset={6}'} /&gt;</code>
            </Col>
          </Row>

          <Row className="show-grid">
            <Col md={6} mdPush={6}>
              <code>&lt;{'Col md={6} mdPush={6}'} /&gt;</code>
            </Col>
            <Col md={6} mdPull={6}>
              <code>&lt;{'Col md={6} mdPull={6}'} /&gt;</code>
            </Col>
          </Row>*/}
        </Grid>
      </div>
    )
  }
}
