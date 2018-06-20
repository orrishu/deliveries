import React, {Component} from 'react'
import {getData} from 'common/services/apiService'
import {translate} from 'react-polyglot'
import {inject, observer} from 'mobx-react'
import {observable, toJS} from 'mobx'
import {Jumbotron, Grid, Row, Col} from 'react-bootstrap'
import List from 'components/List'
import Filters from 'common/components/Filters'
import {doFilter} from 'common/utils/filter'
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

  onFilter = (field, value) => {
    //console.log(field, value)
    const {deliveriesStore} = this.props
    doFilter(deliveriesStore, field, value)
    //console.log(deliveriesStore.filters)
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
        <Filters />
        <Grid styleName="show-grid" style={{paddingTop: '45px'}}>
          <Row className="show-grid" styleName="head-row">
            {/*<Col xs={1} md={1}>
              <div>{t('deliveries.id')}</div>
            </Col>*/}
            <Col xs={2} md={2}>
              <div>{t('deliveries.finishTime')}</div>
            </Col>
            <Col xs={2} md={2}>
              <div>{t('deliveries.deliveryTime')}</div>
            </Col>
            <Col xs={2} md={2}>
              <div>{t('deliveries.customerName')}</div>
            </Col>
            <Col xs={2} md={2}>
              <div>{t('deliveries.from')}</div>
            </Col>
            <Col xs={1} md={1}>
              <div>{t('deliveries.fromWhere')}</div>
            </Col>
            <Col xs={1} md={1}>
              <div>{t('deliveries.cityName')}</div>
            </Col>
            <Col xs={1} md={1}>
              <div>{t('deliveries.area')}</div>
            </Col>
            <Col xs={1} md={1}>
              <div>{t('deliveries.update')}</div>
            </Col>
            <Col xs={1} md={1}>
              <div>{t('deliveries.to')}</div>
            </Col>
            <Col xs={1} md={1}>
              <div>{t('deliveries.toWhere')}</div>
            </Col>
            <Col xs={1} md={1}>
              <div>{t('deliveries.destCityName')}</div>
            </Col>
            <Col xs={1} md={1}>
              <div>{t('deliveries.destArea')}</div>
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
            <Col xs={1} md={1}>
              <div>{t('deliveries.endDeliveryTime')}</div>
            </Col>
            <Col xs={1} md={1}>
              <div>{t('deliveries.urgency')}</div>
            </Col>
            <Col xs={1} md={1}>
              <div>{t('deliveries.collect')}</div>
            </Col>
          </Row>
          <div>
            <List
              store={deliveriesStore}
              loadMore={deliveriesStore.loadDeliveries}
              onFilter={this.onFilter}
            />
          </div>
        </Grid>
      </div>
    )
  }
}
