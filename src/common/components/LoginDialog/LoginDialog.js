import React from 'react'
import { bool, object, func } from 'prop-types'
import { inject, observer } from 'mobx-react'
import {observable, toJS} from 'mobx'
import { translate } from 'react-polyglot'
import {Grid, Row, Col, FormGroup, FormControl, Checkbox, Button} from 'react-bootstrap'
import {clearCache} from 'common/services/apiService'
import ReactModal from 'react-modal'
import { Link } from 'react-router-dom'
import CSSModules from 'react-css-modules'
import styles from './LoginDialog.scss'

@translate()
@inject('accountStore')
@inject('routingStore')
@CSSModules(styles)
@observer
export default class LoginDialog extends React.Component {

  static propTypes = {
    onCancel: func
  }

  @observable userName = ''
  @observable password = ''
  @observable rememberMe = false

  componentWillMount() {
    ReactModal.setAppElement('#root')
  }

  componentWillReceiveProps(nextProps) {

  }

  updateField = e => {
    //console.log('updateField', e.target.name, e.target.value)
    switch (e.target.name) {
    case 'userName':
      this.userName = e.target.value
      break
    case 'password':
      this.password = e.target.value
      break
    case 'rememberMe':
      this.rememberMe = e.target.checked
      break
    }
  }

  onKeyDown = e => {
    if (e.keyCode === 13) {
      e.stopPropagation()
      this.login()
    }
  }

  login = () => {
    const {accountStore, onCancel} = this.props
    const { routingStore: { push } } = this.props
    if (!accountStore.profile) {
      accountStore.login(this.userName, this.password, this.rememberMe).then(() => {
        if (accountStore.error == null && accountStore.profile != null) {
          //successful login made
          clearCache()
          push('/')
          onCancel()  //close modal
        }
      }).catch(error => {
        console.error('[Login] Error:', error)
        //notifyMessage(error)
      })
    }
  }

  render() {
    const {accountStore, onCancel, t} = this.props
    return (
      <ReactModal
        isOpen={true}
        onRequestClose={onCancel}
        className="reveal-custom reveal-custom-login"
        overlayClassName="reveal-overlay-custom">
        <div styleName="container">
          <button styleName="button-cancel" onClick={onCancel}>×</button>


          <Grid>
            <Row>
              <Col xs={6} md={6}>
                <form>
                  <FormGroup
                    controlId="userName"
                  >

                    <FormControl
                      type="text"
                      name="userName"
                      placeholder={t('login.usernameLabel')}
                      value={this.userName}
                      onChange={this.updateField}
                      onKeyDown={this.onKeyDown}
                    />
                  </FormGroup>
                  <FormGroup
                    controlId="password"
                  >
                    <FormControl
                      type="password"
                      name="password"
                      placeholder={t('login.passwordLabel')}
                      value={this.password}
                      onChange={this.updateField}
                      onKeyDown={this.onKeyDown}
                    />
                  </FormGroup>
                  <FormGroup
                    controlId="rememberMe"
                  >
                    <Checkbox checked name="rememberMe" onChange={this.updateField}>
                      {t('login.rememberMe')}
                    </Checkbox>
                  </FormGroup>
                  <Button bsStyle="primary" onClick={this.login}>{t('login.login')}</Button>

                </form>
              </Col>
              {  /*<Col xs={12} md={12}>
              </Col>*/}
            </Row>
          </Grid>
        </div>
      </ReactModal>
    )
  }
}
