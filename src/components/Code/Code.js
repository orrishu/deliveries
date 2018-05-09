import React, {Component} from 'react'
import {Jumbotron, Grid, Row, Col, FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap'
import {translate} from 'react-polyglot'
import {inject, observer} from 'mobx-react'
import { observable, toJS } from 'mobx'
import CSSModules from 'react-css-modules'
import styles from './code.scss'

@translate()
@inject('translationsStore')
@inject('codeStore')
@CSSModules(styles)
@observer
export default class Code extends Component {

  @observable code = ''

  componentWillMount() {
    //console.log('code component')
    const {codeStore} = this.props
    codeStore.loadCodes()
  }

  getValidationState() {
    const length = this.code.length
    if (length > 10) return 'success'
    else if (length > 5) return 'warning'
    else if (length > 0) return 'error'
    return null
  }

  handleChange = (e) => {
    this.code = e.target.value
  }

  onKeyDown = (e) => {
    if (e.keyCode === 13) {
      //ori s setTimeout to solve a bug, when search is committed before Select actually chose an item ...
      e.preventDefault()  //fucks up the search.
      e.stopPropagation()
      this.add()
    }
  }

  add = () => {
    console.log('code', this.code)
    const {codeStore} = this.props
    codeStore.addCode(this.code)
  }

  render() {
    const {codeStore, t} = this.props
    //console.log(toJS(codeStore.codes))
    return (
      <div className="container theme-showcase">
        <Jumbotron>
          <h1>{t('code.title')}</h1>
          <p>
            {t('code.test')}
          </p>
        </Jumbotron>
        <form>
          <FormGroup
            controlId="formBasicText"
            validationState={this.getValidationState()}
          >
            <ControlLabel>{t('code.add')}</ControlLabel>
            <FormControl
              type="text"
              value={this.code}
              placeholder="Enter text"
              onChange={this.handleChange}
              onKeyDown={this.onKeyDown}
            />
            <FormControl.Feedback />
            <HelpBlock>Validation is based on string length.</HelpBlock>
          </FormGroup>
        </form>
        <hr />
        <h3>{t('code.existing')}</h3>
        <Grid styleName="show-grid">
          {codeStore.codes.map((code, index) =>
            <Row key={index} className="show-grid">
              <Col xs={4} md={2}>
                <code>{code.id}</code>
              </Col>
              <Col xs={12} md={8}>
                <code>{code.code}</code>
              </Col>
            </Row>)
          }
        </Grid>
      </div>
    )
  }
}
