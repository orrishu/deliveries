import remove from 'lodash/remove'

export function doFilter(store, field, value) {
  remove(store.filters, filter => {
    return filter.field === field
  })

  const newFilters = value.length > 0 ? [...store.filters, {field, value}] : store.filters
  const filters = JSON.stringify(newFilters)
  //apply filters to store, and commit search:
  store.applyFilters(filters)
  store.clearResults()
  store.loadDeliveries()
}
