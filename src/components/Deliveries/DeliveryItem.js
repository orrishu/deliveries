import React, {Component} from 'react'
import { array, object, number } from 'prop-types'
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
    employees: array
  }

  @observable isOpen = false
  @observable selectedReceiver = null
  @observable selectedCollector = null

  openBig = () => {
    this.isOpen = !this.isOpen
  }

  onChange = (value, type) => {
    console.log(value, type)
    if (type == 'recieve') {
      this.selectedReceiver = value
    }
    else {
      this.selectedCollector = value
    }
  }

  onInputKeyDown = (e) => {
    if (e.keyCode === 13) {
      //e.preventDefault()  //fucks up the search.
      e.stopPropagation()
    }
  }

  render() {
    const {delivery, ix, employees, t} = this.props
    const show = this.isOpen ? {} : {display: 'none'}
    const style = ix % 2 == 0 ? 'row' : 'alt-row'
    return (
      <div>
        <Row className="show-grid" styleName={style} onClick={this.openBig}>
          <Col xs={1} md={1}>
            <div>{`#${delivery.Id}`}</div>
          </Col>
          <Col xs={2} md={2}>
            <div style={{direction: 'ltr'}}>{delivery.ReceivedAt}</div>
          </Col>
          <Col xs={1} md={1}>
            <div>{delivery.FromAddress}</div>
          </Col>
          <Col xs={2} md={2}>
            <div>{delivery.ToAddress}</div>
          </Col>
          <Col xs={1} md={1}>
            <div>{delivery.Importance}</div>
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
          <Col xs={1} md={1}>
            <div>{delivery.Status}</div>
          </Col>
          {/*<Col xs={6} md={3} style={{paddingBottom: '8px'}}>
            <div style={{padding: 0}}>{
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
            }</div>
          </Col>*/}
        </Row>
        <Row className="show-grid" style={show}>
          <Col xs={12} md={12}>
            <Row>
              <Col xs={6} md={6} style={{lineHeight: '2'}}>
                <div>{t('deliveries.from')}: {delivery.From}</div>
                <div>{t('deliveries.to')}: {delivery.To}</div>
                <div>{t('deliveries.deliveryNote')}: {delivery.DeliveryNote}</div>
                <div>{t('deliveries.name1')}: {delivery.Name1}</div>
                <div>{t('deliveries.name2')}: {delivery.Name2}</div>
              </Col>
              <Col xs={6} md={6} style={{lineHeight: '2'}}>
                <div>{t('deliveries.date')}: {delivery.Date}</div>
                <div>{t('deliveries.description')}: {delivery.Description}</div>
                <div>{t('deliveries.combo')}: {delivery.Combo1}</div>
                <div>{t('deliveries.reciever1')}: {delivery.Reciever1}</div>
                <div>{t('deliveries.collect')}: {delivery.Collect}</div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    )
  }
}
