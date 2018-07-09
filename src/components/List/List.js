import React from 'react'
import { object, func, array } from 'prop-types'
import { observer } from 'mobx-react'
import { toJS } from 'mobx'
import { translate } from 'react-polyglot'
import CSSModules from 'react-css-modules'
import styles from './List.scss'
import InfiniteScroll from 'react-infinite-scroller'
import DeliveryItem from 'components/Deliveries/DeliveryItem'
import Loading from 'common/components/Loading/Loading'
import find from 'lodash/find'

@translate()
@CSSModules(styles)
@observer
export default class List extends React.Component {

  static propTypes = {
    store: object,
    loadMore: func,
    onFilter: func
  }

  render() {
    const { t, store, loadMore } = this.props
    const { resultsPageSize, resultsLoading, deliveries, hasMoreResults } = store
    //console.log('hasMoreResults', hasMoreResults)
    const items = deliveries.map((item, index) => {
      return <DeliveryItem
        key={index}
        delivery={item}
        ix={index}
        employees={toJS(store.employees)}
        statuses={toJS(store.statuses)}
        onFilter={this.props.onFilter}
      />
    }, this)

    return (
      <InfiniteScroll
        pageStart={0}
        loadMore={loadMore}
        hasMore={hasMoreResults}
        loader={<Loading key={0} />}
      >
        {items}
      </InfiniteScroll>
    )
  }
}
