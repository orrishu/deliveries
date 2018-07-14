import React, {Component} from 'react'
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap'
import CSSModules from 'react-css-modules'
import styles from './Topbar.scss'
import {translate} from 'react-polyglot'
import {inject, observer} from 'mobx-react'
import {observable} from 'mobx'
import {clearCache} from 'common/services/apiService'
import LoginDialog from 'common/components/LoginDialog'

const navbar = [  {
  title: 'code',
  link: '/code'
}, {
  title: 'deliveries',
  link: '/deliveries'
}]

@translate()
//@inject('translationsStore')
@inject('routingStore')
@inject('accountStore')
@CSSModules(styles)
@observer
export default class Topbar extends Component {

  @observable showLoginDialog = false

  navigate = route => () => {
    const { routingStore: { push, location: { pathname: path } } } = this.props
    if (path !== route) {
      push(route)
    }
  }

  login = () => {
    this.showLoginDialog = true
  }

  logout = () => {
    const {accountStore, routingStore: {push}} = this.props
    accountStore.logout()
    clearCache()
    push('/')
  }

  continueUnlogged = () => {
    this.showLoginDialog = false
  }

  render() {
    const {accountStore, t} = this.props
    const loginLabel = accountStore.profile ? decodeURIComponent(accountStore.profile.contactName).replace(/\+/g, ' ') : t('nav.pleaseLog')

    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="">{t('AppTitle')}</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            {navbar.map((nav, index) =>
              <NavItem key={index} eventKey={index} onClick={this.navigate(`${nav.link}`)}>
                {t(`nav.${nav.title}`)}
              </NavItem>
            )}
            {accountStore.profile ?
              <NavDropdown eventKey="4" title={loginLabel} id="nav-dropdown">
                <MenuItem eventKey="4.1" onClick={this.logout}>{t('nav.logout')}</MenuItem>
              </NavDropdown>
              :
              <NavItem eventKey="5" onClick={this.login}>{loginLabel}</NavItem>}
          </Nav>
        </Navbar>
        {this.showLoginDialog &&
          <LoginDialog
            onCancel={this.continueUnlogged}
          />
        }
      </div>
    )
  }
}
