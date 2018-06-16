import React, {Component} from 'react'
import { array, object, number, func } from 'prop-types'
import {translate} from 'react-polyglot'
import {inject, observer} from 'mobx-react'
import {observable, toJS} from 'mobx'
import {Grid, Row, Col, DropdownButton, MenuItem} from 'react-bootstrap'
import Select from 'react-select'
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
    employees: array,
    onFilter: func
  }

  @observable isOpen = false
  @observable selectedReceiver = null
  @observable selectedCollector = null
  @observable selectedCourier3 = null

  openBig = () => {
    this.isOpen = !this.isOpen
  }

  onChange = (value, type) => {
    console.log(value, type)
    if (type == 'recieve') {
      this.selectedReceiver = value
    }
    else if (type == 'collect') {
      this.selectedCollector = value
    }
    else {
      this.selectedCourier3 = value
    }
  }

  onInputKeyDown = (e) => {
    if (e.keyCode === 13) {  // => F9
      //e.preventDefault()  //fucks up the search.
      e.stopPropagation()
    }
  }

  onDblClick = (type, value) => {
    this.props.onFilter(type, value)
  }

  onKeyDown = (e, type, value) => {
    //console.log(e.keyCode)
    if (e.keyCode === 120) {  // => F9
      //e.preventDefault()  //fucks up the search.
      e.stopPropagation()
      this.props.onFilter(type, value)
    }
  }

  render() {
    const {delivery, ix, employees, t} = this.props
    const show = this.isOpen ? {} : {display: 'none'}
    const style = ix % 2 == 0 ? 'row' : 'alt-row'
    return (
      <div>
        <Row className="show-grid" styleName={style}>
          {/*<Col xs={1} md={1} onClick={this.openBig}>
            <div>{`#${delivery.Id}`}</div>
          </Col>*/}
          <Col xs={2} md={2} onClick={this.openBig}>
            <div style={{direction: 'ltr'}}>{delivery.FinishtimeSenc}</div>
          </Col>
          <Col xs={2} md={2} onClick={this.openBig}>
            <div style={{direction: 'ltr'}}>{delivery.DeliveryTime}</div>
          </Col>
          <Col xs={2} md={2} onClick={this.openBig}>
            <div>{delivery.CustomerName}</div>
          </Col>
          <Col xs={2} md={2} onClick={this.openBig}>
            <div>{delivery.CompanyNameLet}</div>
          </Col>
          <Col xs={1} md={1} onClick={this.openBig}>
            <div>{delivery.MyOut}</div>
          </Col>
          <Col xs={1} md={1} style={{paddingRight: '4px'}}>
            <div><input
              type="text"
              name="CityName_1"
              value={delivery.CityName_1}
              readOnly={true}
              onKeyDown={(e) => this.onKeyDown(e, 'CityName_1', delivery.CityName_1)}
              styleName="filter-input"
            /></div>
          </Col>
          <Col xs={1} md={1} onClick={this.openBig}>
            <div>{delivery.archOut}</div>
          </Col>
          <Col xs={1} md={1} onClick={this.openBig}>
            <div>{delivery.mysort2}</div>
          </Col>
          <Col xs={1} md={1} onClick={this.openBig}>
            <div>{delivery.CompanyNameGet}</div>
          </Col>
          <Col xs={1} md={1} onClick={this.openBig}>
            <div>{delivery.Mydes}</div>
          </Col>
          <Col xs={1} md={1} onClick={this.openBig}>
            <div>{delivery.cityName}</div>
          </Col>
          <Col xs={1} md={1} onClick={this.openBig}>
            <div>{delivery.archDes}</div>
          </Col>
          <Col xs={2} md={2}>
            <div>
              <Select
                className="search-select"
                menuContainerStyle={{overflowY: 'visible', height: '200px'}}
                name="employeeReceived"
                placeholder={t('deliveries.placeHolder')}
                noResultsText={null}
                searchPromptText=""
                rtl={true}
                multi={false}
                cache={false}
                clearable={false}
                options={toJS(employees)}
                onChange={value => this.onChange(value, 'recieve')}
                onInputKeyDown={this.onInputKeyDown}
                value={this.selectedReceiver}
                labelKey={'EmployeeName'}
                valueKey={'EmployeeID'}
              />
            </div>
          </Col>
          <Col xs={2} md={2}>
            <div>
              <Select
                className="search-select"
                menuContainerStyle={{overflowY: 'visible', height: '200px'}}
                name="employeeCollected"
                placeholder={t('deliveries.placeHolder')}
                noResultsText={null}
                searchPromptText=""
                rtl={true}
                multi={false}
                cache={false}
                clearable={false}
                options={toJS(employees)}
                onChange={value => this.onChange(value, 'collect')}
                onInputKeyDown={this.onInputKeyDown}
                value={this.selectedCollector}
                labelKey={'EmployeeName'}
                valueKey={'EmployeeID'}
              />
            </div>
          </Col>
          <Col xs={1} md={1} onClick={this.openBig}>
            <div>{delivery.DeliveryStatus}</div>
          </Col>
          <Col xs={1} md={1} onClick={this.openBig}>
            <div>{delivery.FinishTime}</div>
          </Col>
          <Col xs={1} md={1} onClick={this.openBig}>
            <div>{delivery.UrgencysName}</div>
          </Col>
          <Col xs={1} md={1} onClick={this.openBig}>
            <div>{delivery.Govayna}</div>
          </Col>

        </Row>
        <Row className="show-grid" style={show}>

          <Col xs={8} md={8} styleName="details">
            <div>{t('deliveries.deliveryNumber')}: {delivery.CustomerDeliveryNo}</div>
            <div>{t('deliveries.barCode')}: {delivery.Barcode}</div>
            <div>{t('deliveries.comments')}: {delivery.Comment}</div>
            <div>{t('deliveries.orderedBy')}: {delivery.ContactManName}</div>
            <div>{t('deliveries.userName')}: {delivery.UserName}</div>
          </Col>
          <Col xs={8} md={8} styleName="details">
            <div>{t('deliveries.deliveryType')}: {delivery.WhereToWhere == 1 ? t('deliveries.transfer') :
              delivery.WhereToWhere == 2 ? t('deliveries.delivery') :
                delivery.WhereToWhere == 3 ? t('deliveries.get') : ''}</div>
            <div>{t('deliveries.vehicleType')}: {delivery.VehicleTypeID}</div>
            <div>{t('deliveries.extraCourier')}:
              <div>
                <Select
                  className="search-select"
                  menuContainerStyle={{overflowY: 'visible', height: '200px'}}
                  name="employee3"
                  placeholder={t('deliveries.placeHolder')}
                  noResultsText={null}
                  searchPromptText=""
                  rtl={true}
                  multi={false}
                  cache={false}
                  clearable={false}
                  options={toJS(employees)}
                  onChange={value => this.onChange(value, 'emp3')}
                  onInputKeyDown={this.onInputKeyDown}
                  value={this.selectedCourier3}
                  labelKey={'EmployeeName'}
                  valueKey={'EmployeeID'}
                />
              </div>
            </div>
            <div>{t('deliveries.contractor')}: {delivery.DeliveyOut}</div>
            <div>{t('deliveries.receiver')}: {delivery.Receiver}</div>
          </Col>
          <Col xs={8} md={8} styleName="details">
            <div>{t('deliveries.deliveryDate')}: {delivery.DeliveryDate}</div>
            <div>{t('deliveries.coordinatedAt')}: {delivery.tehumDate}</div>
            <div>{t('deliveries.invoiceNum')}: {delivery.InvoiceNum}</div>
            <div>{t('deliveries.packageNum')}: {delivery.PakageNum}</div>
            <div>{t('deliveries.boxNum')}: {delivery.BoxNum}</div>
            <div>{t('deliveries.wait')}: {delivery.Waitingss}</div>
          </Col>

        </Row>
      </div>
    )
  }
}
