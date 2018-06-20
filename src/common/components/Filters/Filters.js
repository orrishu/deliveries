import React, {Component} from 'react'
import {Label} from 'react-bootstrap'
import {translate} from 'react-polyglot'
import {inject, observer} from 'mobx-react'
//import { observable, toJS } from 'mobx'
import remove from 'lodash/remove'
import CSSModules from 'react-css-modules'
import styles from './Filters.scss'

@translate()
//@inject('translationsStore')
@inject('deliveriesStore')
@CSSModules(styles)
@observer
export default class Filters extends Component {

  //@observable code = ''

  componentWillMount() {
    //console.log('code component')
  }

  clearFilter = (field) => {
    //for now - clear all filters from store. implement: clear by type
    const {deliveriesStore} = this.props
    remove(deliveriesStore.filters, filter => {
      return filter.field === field
    })
    deliveriesStore.clearResults()
    deliveriesStore.loadDeliveries()
  }


  render() {
    const {deliveriesStore, t} = this.props

    return (
      <div>
        {deliveriesStore.filters.length > 0 && deliveriesStore.filters.map((filter, index) =>
          <h4 key={index} styleName="filter-heading">
            <Label bsStyle="info" styleName="filter-label">
              <span onClick={() => this.clearFilter(filter.field)} styleName="filter-close">x</span>
              <span styleName="filter-value"> {t(`filters.${filter.field}`)}: {filter.value}</span>
            </Label>
          </h4>)
        }
      </div>
    )
  }
}
