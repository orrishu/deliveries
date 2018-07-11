import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Topbar from 'app/components/Topbar'
import CodePage from 'pages/code'
import DeliveriesPage from 'pages/deliveries'
import LoginPage from 'pages/login'
import NotFound404 from 'pages/notFound404'
import { accountStore } from 'stores'
//import {inject} from 'mobx-react'

//@inject('accountStore')
class Pages extends React.Component {
  ensureAuthentication(Component) {
    //usage: this.ensureAuthentication(ResultsPage) inside <Route /> tag
    return accountStore.profile ? <Component /> : <Redirect to="/login" />
    //return <Component />
  }

  render() {
    return (
      <section>
        <Topbar />
        <Switch>
          <Route exact path="/">
            <Redirect to="/code" />
          </Route>
          <Route path="/login" component={LoginPage} />
          <Route path="/code">
            {this.ensureAuthentication(CodePage)}
          </Route>
          <Route path="/deliveries">
            <DeliveriesPage />
          </Route>
          <Route>
            <NotFound404 />
          </Route>
        </Switch>
      </section>
    )
  }
}
export default Pages
