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
//@inject('translationsStore')
@inject('accountStore')
@inject('deliveriesStore')
@CSSModules(styles)
@observer
export default class Deliveries extends Component {

  componentWillMount() {
    console.log('deliveries component')
    /*  //this caused a problem - profile is loaded after that event is triggered
    const {accountStore, deliveriesStore} = this.props
    if (accountStore.profile) {
      deliveriesStore.loadDeliveries()
      deliveriesStore.loadEmployees()
      deliveriesStore.loadStatuses()
    }*/
  }

  componentWillReceiveProps(nextProps) {
    //console.log('receive props', nextProps)
    //use that here because this event is triggered after profile is loaded (accountStore prop changed)
    const {accountStore, deliveriesStore} = this.props
    if (accountStore.profile) {
      if (deliveriesStore.employees.length == 0) deliveriesStore.loadEmployees()
      if (deliveriesStore.statuses.length == 0) deliveriesStore.loadStatuses()
    }
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
    const {accountStore, deliveriesStore, t} = this.props

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
          {accountStore.profile &&
          <Row className="show-grid" styleName="head-row">
            <Col xs={1} md={1}>

            </Col>
            <Col xs={2} md={2}>
              <div styleName="head-col" onClick={() => this.onSort('FinishtimeSenc')}>
                {t('deliveries.finishTime')}
                <SortIndicator
                  sortDir={deliveriesStore.sortDir}
                  show={deliveriesStore.sortBy == 'FinishtimeSenc'}
                />
              </div>
            </Col>
            <Col xs={2} md={2}>
              <div styleName="head-col" onClick={() => this.onSort('DeliveryTime')}>
                {t('deliveries.deliveryTime')}
                <SortIndicator
                  sortDir={deliveriesStore.sortDir}
                  show={deliveriesStore.sortBy == 'DeliveryTime'}
                />
              </div>
            </Col>
            <Col xs={2} md={2}>
              <div styleName="head-col" onClick={() => this.onSort('CustomerName')}>
                {t('deliveries.customerName')}
                <SortIndicator
                  sortDir={deliveriesStore.sortDir}
                  show={deliveriesStore.sortBy == 'CustomerName'}
                />
              </div>
            </Col>
            <Col xs={2} md={2}>
              <div styleName="head-col" onClick={() => this.onSort('CompanyNameLet')}>
                {t('deliveries.from')}
                <SortIndicator
                  sortDir={deliveriesStore.sortDir}
                  show={deliveriesStore.sortBy == 'CompanyNameLet'}
                />
              </div>
            </Col>
            <Col xs={1} md={1}>
              <div styleName="head-col" onClick={() => this.onSort('MyOut')}>
                {t('deliveries.fromWhere')}
                <SortIndicator
                  sortDir={deliveriesStore.sortDir}
                  show={deliveriesStore.sortBy == 'MyOut'}
                />
              </div>
            </Col>
            <Col xs={1} md={1}>
              <div styleName="head-col" onClick={() => this.onSort('CityName_1')}>
                {t('deliveries.cityName')}
                <SortIndicator
                  sortDir={deliveriesStore.sortDir}
                  show={deliveriesStore.sortBy == 'CityName_1'}
                />
              </div>
            </Col>
            <Col xs={1} md={1}>
              <div styleName="head-col" onClick={() => this.onSort('archOut')}>
                {t('deliveries.area')}
                <SortIndicator
                  sortDir={deliveriesStore.sortDir}
                  show={deliveriesStore.sortBy == 'archOut'}
                />
              </div>
            </Col>
            {/*<Col xs={1} md={1}>
              <div>{t('deliveries.update')}</div>
            </Col>*/}
            <Col xs={1} md={1}>
              <div styleName="head-col" onClick={() => this.onSort('CompanyNameGet')}>
                {t('deliveries.to')}
                <SortIndicator
                  sortDir={deliveriesStore.sortDir}
                  show={deliveriesStore.sortBy == 'CompanyNameGet'}
                />
              </div>
            </Col>
            <Col xs={1} md={1}>
              <div styleName="head-col" onClick={() => this.onSort('Mydes')}>
                {t('deliveries.toWhere')}
                <SortIndicator
                  sortDir={deliveriesStore.sortDir}
                  show={deliveriesStore.sortBy == 'Mydes'}
                />
              </div>
            </Col>
            <Col xs={1} md={1}>
              <div styleName="head-col" onClick={() => this.onSort('cityName')}>
                {t('deliveries.destCityName')}
                <SortIndicator
                  sortDir={deliveriesStore.sortDir}
                  show={deliveriesStore.sortBy == 'cityName'}
                />
              </div>
            </Col>
            <Col xs={1} md={1}>
              <div styleName="head-col" onClick={() => this.onSort('archDes')}>
                {t('deliveries.destArea')}
                <SortIndicator
                  sortDir={deliveriesStore.sortDir}
                  show={deliveriesStore.sortBy == 'archDes'}
                />
              </div>
            </Col>
            <Col xs={2} md={2}>
              <div>{t('deliveries.courierDelivered')}</div>
            </Col>
            <Col xs={2} md={2}>
              <div>{t('deliveries.courierCollected')}</div>
            </Col>
            <Col xs={2} md={2}>
              <div>{t('deliveries.status')}</div>
            </Col>
            <Col xs={1} md={1}>
              <div styleName="head-col" onClick={() => this.onSort('FinishTime')}>
                {t('deliveries.endDeliveryTime')}
                <SortIndicator
                  sortDir={deliveriesStore.sortDir}
                  show={deliveriesStore.sortBy == 'FinishTime'}
                />
              </div>
            </Col>
            <Col xs={1} md={1}>
              <div styleName="head-col" onClick={() => this.onSort('UrgencysName')}>
                {t('deliveries.urgency')}
                <SortIndicator
                  sortDir={deliveriesStore.sortDir}
                  show={deliveriesStore.sortBy == 'UrgencysName'}
                />
              </div>
            </Col>
            {/*<Col xs={1} md={1}>
              <div>{t('deliveries.collect')}</div>
            </Col>*/}
          </Row>}
          {accountStore.profile ?
            <div>
              <List
                store={deliveriesStore}
                loadMore={deliveriesStore.loadDeliveries}
                onFilter={this.onFilter}
              />
            </div>
            :
            <Row>
              <Col xs={24} md={24}>
                {t('login.pleaseLog')}
              </Col>
            </Row>
          }
        </Grid>
      </div>
    )
  }
}

const SortIndicator = ({sortDir, show}) => {
  const indicator = show ? sortDir == 'asc' ? '&uarr;' : '&darr;' : ''
  return <span style={{paddingRight: '5px'}} dangerouslySetInnerHTML={{__html: indicator}}></span>
}
