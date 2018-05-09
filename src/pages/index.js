import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Topbar from 'app/components/Topbar'
import CodePage from 'pages/code'
import DeliveriesPage from 'pages/deliveries'
import NotFound404 from 'pages/notFound404'

class Pages extends React.Component {
  ensureAuthentication(Component) {
    //usage: this.ensureAuthentication(ResultsPage) inside <Route /> tag
    //return http.isAuthenticated ? <Component /> : <Redirect to="/login" />
    return <Component />
  }

  render() {
    return (
      <section>
        <Topbar />
        <Switch>
          <Route exact path="/">
            <Redirect to="/code" />
          </Route>
          <Route path="/code">
            <CodePage />
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
