import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Topbar from 'app/components/Topbar'
//import CodePage from 'pages/code'
import DeliveriesPage from 'pages/deliveries'
import NotFound404 from 'pages/notFound404'

class Pages extends React.Component {

  render() {
    return (
      <section>
        <Topbar />
        <Switch>
          <Route exact path="/">
            <Redirect to="/deliveries" />
          </Route>
          {/*<Route path="/code">
            <CodePage />
          </Route>*/}
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
