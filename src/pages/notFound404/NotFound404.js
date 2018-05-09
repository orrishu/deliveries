import React from 'react'
import { inject, observer } from 'mobx-react'
import { translate } from 'react-polyglot'
import CSSModules from 'react-css-modules'
import styles from './NotFound404.scss'

@translate()
@inject('routingStore')
@CSSModules(styles)
@observer
export default class NotFound404 extends React.Component {
  render() {
    const { t, routingStore: { location: { pathname } } } = this.props
    return (
      <section>
        <h2 styleName="title">
          {t('page404')}
        </h2>
        <h3 styleName="link">
          <code>
            {pathname}
          </code>
        </h3>
      </section>
    )
  }
}
