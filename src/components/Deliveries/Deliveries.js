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

  onSort = (sortBy) => {
    const {deliveriesStore} = this.props
    const sortDir = sortBy != deliveriesStore.sortBy ? 'asc' :
      deliveriesStore.sortDir == 'asc' ? 'desc' : 'asc'

    deliveriesStore.applySort(sortBy, sortDir)
    deliveriesStore.clearResults()
    deliveriesStore.loadDeliveries()
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
            <Col xs={1} md={1}>

            </Col>
            <Col xs={2} md={2}>
              <div>{t('deliveries.finishTime')}</div>
            </Col>
            <Col xs={2} md={2}>
              <div>{t('deliveries.deliveryTime')}</div>
            </Col>
            <Col xs={2} md={2}>
              <div onClick={() => this.onSort('CustomerName')}>
                {t('deliveries.customerName')}
                <SortIndicator
                  sortDir={deliveriesStore.sortDir}
                  show={deliveriesStore.sortBy == 'CustomerName'}
                />
              </div>
            </Col>
            <Col xs={2} md={2}>
              <div onClick={() => this.onSort('CompanyNameLet')}>
                {t('deliveries.from')}
                <SortIndicator
                  sortDir={deliveriesStore.sortDir}
                  show={deliveriesStore.sortBy == 'CompanyNameLet'}
                />
              </div>
            </Col>
            <Col xs={1} md={1}>
              <div onClick={() => this.onSort('MyOut')}>
                {t('deliveries.fromWhere')}
                <SortIndicator
                  sortDir={deliveriesStore.sortDir}
                  show={deliveriesStore.sortBy == 'MyOut'}
                />
              </div>
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
            {/*<Col xs={1} md={1}>
              <div>{t('deliveries.collect')}</div>
            </Col>*/}
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

const SortIndicator = ({sortDir, show}) => {
  const indicator = show ? sortDir == 'asc' ? '&uarr;' : '&darr;' : ''
  return <span style={{paddingRight: '5px'}} dangerouslySetInnerHTML={{__html: indicator}}></span>
}
