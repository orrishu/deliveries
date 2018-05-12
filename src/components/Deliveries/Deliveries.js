import React, {Component} from 'react'
import {getData} from 'common/services/apiService'
import {translate} from 'react-polyglot'
import {inject, observer} from 'mobx-react'
import {observable, toJS} from 'mobx'
import {Jumbotron, Grid, Row, Col, DropdownButton, MenuItem} from 'react-bootstrap'
import DeliveryItem from './DeliveryItem'
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
            {t('code.test')}
          </p>
        </Jumbotron>
        <Grid styleName="show-grid">
          {
            deliveriesStore.deliveries.map((delivery, index) =>
              <DeliveryItem
                key={index}
                delivery={delivery}
                ix={index}
                employees={toJS(deliveriesStore.employees)}
              />
            )
          }
        </Grid>
      </div>
    )
  }
}
