import React from 'react'
import LabeledTextField from 'common/components/LabeledTextField'
import Button from 'common/components/Button'

import { inject, observer } from 'mobx-react'
import { observable /*, toJS*/ } from 'mobx'
import { translate } from 'react-polyglot'
import { accountStore } from 'stores'

import { whenRouted } from 'common/utils/withRouteHooks'
import { withRouter } from 'react-router'
import './style.scss'

@withRouter
@whenRouted(() => {
  //console.log(toJS(accountStore.profile))
  accountStore.logout()
  })
@translate()
@inject('accountStore')
@observer
export default class Login extends React.Component {
  @observable username = ''
  @observable password = ''
  @observable pending = false

  render() {
    const { t } = this.props
    return (
      <section id="login-page" styleName="login-page">
        <form styleName="login-form" onSubmit={this.onLogin}>
          <header styleName="login-title">
            <h2>
              <b>
                {t('loginPage.title')}
              </b>
            </h2>
            <h4>
              {t('loginPage.subtitle')}
            </h4>
          </header>
          <LabeledTextField
            type="text"
            value={this.username}
            label={t('loginPage.usernameLabel')}
            onChange={this.writeUsername}
          />
          <LabeledTextField
            type="password"
            value={this.password}
            label={t('loginPage.passwordLabel')}
            onChange={this.writePassword}
          />
          {!this.pending &&
          <Button type="submit" block styleName="login-button">
            {t('loginPage.loginBtnTitle')}
          </Button>
          }
          {this.pending &&
            <div styleName="login-title" style={{marginTop: '4rem'}}>
              <h4>{t('loginPage.pleaseWait')}</h4>
            </div>
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
    const { accountStore, match: { params: { from } } } = this.props
    e.preventDefault()
    //login with parameter of 'from', for redirect
    this.pending = true
    accountStore.login({
      username: this.username,
      password: this.password,
      from
    }).then(() => this.pending = false)
  }
}
