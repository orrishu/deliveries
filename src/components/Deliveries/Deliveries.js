import React, {Component} from 'react'
import {getData} from 'common/services/apiService'
import {translate} from 'react-polyglot'
import {inject, observer} from 'mobx-react'
import {observable, toJS} from 'mobx'
import {Jumbotron, Grid, Row, Col} from 'react-bootstrap'
import List from 'components/List'
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
        <Jumbotron>
          <h1>{t('deliveries.title')}</h1>
          <p>
            {t('deliveries.subtitle')}
          </p>
        </Jumbotron>
        <Grid styleName="show-grid">
          <Row className="show-grid" styleName="head-row">
            <Col xs={1} md={1}>
              <div>{t('deliveries.id')}</div>
            </Col>
            <Col xs={2} md={2}>
              <div>{t('deliveries.receivedAt')}</div>
            </Col>
            <Col xs={1} md={1}>
              <div>{t('deliveries.fromAddress')}</div>
            </Col>
            <Col xs={2} md={2}>
              <div>{t('deliveries.toAddress')}</div>
            </Col>
            <Col xs={1} md={1}>
              <div>{t('deliveries.importance')}</div>
            </Col>
            <Col xs={2} md={2}>
              <div>{t('deliveries.courierDelivered')}</div>
            </Col>
            <Col xs={2} md={2}>
              <div>{t('deliveries.courierCollected')}</div>
            </Col>
            <Col xs={1} md={1}>
              <div>{t('deliveries.status')}</div>
            </Col>
          </Row>
          <div>
            <List
              store={deliveriesStore}
              loadMore={deliveriesStore.loadDeliveries}
            />
          </div>
        </Grid>
      </div>
    )
  }
}
