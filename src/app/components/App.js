import React from 'react'
import Pages from 'pages'
import { history } from 'stores/routingStore'
import { Router } from 'react-router'
import { I18n } from 'react-polyglot'
import { inject, observer } from 'mobx-react'
import '../global.scss'

@inject('translationsStore')
@observer
export default class App extends React.Component {
  render() {
    const { translationsStore: { locale, phrases } } = this.props
    return (
      <Router history={history}>
        <I18n locale={locale} messages={phrases}>
          <Pages />
        </I18n>
      </Router>
    )
  }
}
