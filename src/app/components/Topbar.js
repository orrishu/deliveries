import React, {Component} from 'react'
import {Navbar, Nav, NavItem} from 'react-bootstrap'
import CSSModules from 'react-css-modules'
import styles from './Topbar.scss'
import {translate} from 'react-polyglot'
import {inject} from 'mobx-react'

const navbar = [  {
  title: 'code',
  link: '/code'
}, {
  title: 'deliveries',
  link: '/deliveries'
}]

@translate()
@inject('translationsStore')
@inject('routingStore')
@CSSModules(styles)
export default class Topbar extends Component {

  navigate = route => () => {
    const { routingStore: { push, location: { pathname: path } } } = this.props
    if (path !== route) {
      push(route)
    }
  }

  render() {
    const {t} = this.props

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
          </Nav>
        </Navbar>        
      </div>
    )
  }
}
