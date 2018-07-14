import React from 'react'
import LabeledTextField from 'common/components/LabeledTextField'
import Button from 'common/components/Button'

import { inject, observer } from 'mobx-react'
import { observable /*, toJS*/ } from 'mobx'
import { translate } from 'react-polyglot'
//import { accountStore } from 'stores'

import { whenRouted } from 'common/utils/withRouteHooks'
import { withRouter } from 'react-router'
import CSSModules from 'react-css-modules'
import styles from './style.scss'

@withRouter
@whenRouted(() => {
  //console.log(toJS(accountStore.profile))
  //accountStore.logout()
  })
@translate()
@inject('accountStore')
@inject('routingStore')
@CSSModules(styles)
@observer
export default class Login extends React.Component {
  @observable username = ''
  @observable password = ''
  @observable pending = false

  componentWillMount() {
    const { accountStore, routingStore: {push} } = this.props
    if (accountStore.profile) {
      console.log('logged')
      push('/code')
    }
  }

  render() {
    const { accountStore, t } = this.props
    return (
      <section id="login-page" styleName="login-page">
        <form styleName="login-form" onSubmit={this.onLogin}>
          <header styleName="login-title">
            <h2>
              <b>
                {t('login.title')}
              </b>
            </h2>
            <h4>
              {t('login.subtitle')}
            </h4>
          </header>
          <LabeledTextField
            type="text"
            value={this.username}
            label={t('login.usernameLabel')}
            onChange={this.writeUsername}
          />
          <LabeledTextField
            type="password"
            value={this.password}
            label={t('login.passwordLabel')}
            onChange={this.writePassword}
          />
          {!this.pending &&
          <Button type="submit" block styleName="login-button">
            {t('login.loginBtnTitle')}
          </Button>
          }
          {this.pending &&
            <div styleName="login-title" style={{marginTop: '4rem'}}>
              <h4>{t('login.pleaseWait')}</h4>
            </div>
          }
          {accountStore.error != null && accountStore.profile == null &&
            <div styleName="login-error">{accountStore.errorMessage}</div>
          }
        </form>
      </section>
    )
  }

  writeUsername = ({ target: { value } }) => {
    this.username = value
  }

  writePassword = ({ target: { value } }) => {
    this.password = value
  }

  onLogin = e => {
    //const { accountStore, match: { params: { from } } } = this.props
    const { accountStore } = this.props
    e.preventDefault()
    //login with parameter of 'from', for redirect
    this.pending = true
    accountStore.login(this.username, this.password, true)
      .then(() => {
        this.pending = false
        if (accountStore.profile) {
          const { routingStore: { push } } = this.props
          push('/code')
        }
      })
  }
}
