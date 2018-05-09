import { RouterStore } from 'mobx-react-router'
import { syncHistoryWithStore } from 'mobx-react-router'
import createHashHistory from 'history/createHashHistory'

export const routingStore = new RouterStore()
export const hashHistory = createHashHistory()

export const history = syncHistoryWithStore(hashHistory, routingStore)
