import 'whatwg-fetch'
import cache from 'common/utils/cache'
//import {notifyMessage} from 'common/utils/notifications'

let apiBaseUrl
let baseUrl
if (process.env.NODE_ENV === 'development' || location.href.indexOf('localhost:8020') > -1) {
  apiBaseUrl = 'http://localhost:8020/Data/api'
  baseUrl = 'http://localhost:8020/Data'
}
else {
  apiBaseUrl = '//62.219.7.158/Deliveries/Data/api'
  baseUrl = '//62.219.7.158/Deliveries/Data'
}

/// important notes for POST (added by ori):
/// 1. need to create an equivalent object on javascript, to the api request parameter;
/// 2. on POST, need to add 'Content-Type: application/json' header to request;
/// 3. when posting, add to the request body the above json object stringified, WITHOUT A NAME.
export function apiFetch(relUrl, {body, method, searchParams = {}} = {}, noCache) {
  const url = createUrl(relUrl, searchParams)

  const headers = new Headers()
  //headers.append('Accept', 'application/json') headers.append('Content-Type', 'application/json')



  //return on next tick, letting  mobx show loading indicator
  if (cache.has(url) && !noCache) {
    return new Promise((resolve) => setTimeout(() => resolve(cache.get(url)), 0))
  }

  //use credentials: 'include' to allow cookies to pass over cross-origin. needed for login data
  const options = {
    method: method || (body ? 'POST' : 'GET'),
    headers,
    body: body && JSON.stringify(body),
    credentials: 'include'
  }

  if (body) headers.append('Content-Type', 'application/json')

  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then(response => {
        if (response.ok) {
          const json = response.json()
          cache.add(url, json.response || json)
          return resolve(json.response || json)
        }
        response.json()
          .then((message) => {
            //if (message.Message != 'Authorization has been denied for this request.')
            //notifyMessage(message.Message, 'error')

            return reject({ message: message.Message || message.error, error: response })
          })
          .catch(error => {
            console.error('apiFetch Error:', error)
            //notifyMessage(error)
          })
      })
  })
}

export function createUrl(relUrl, searchParams = {}, isApi = true) {
  let url = `${ isApi ? apiBaseUrl : baseUrl }/${relUrl}`
  Object.keys(searchParams).forEach((key, index) => {
    if (index === 0) {
      url += '?'
    }
    if (index > 0) {
      url += '&'
    }
    //url += `${key}=${searchParams[key]}`
    const val = typeof searchParams[key] === 'string'
      ? searchParams[key]
      : JSON.stringify(searchParams[key])
    url += `${key}=${encodeURIComponent(val)}`
  })
  return url
}

export function clearCache() {
  cache.clear()
}

export function me() {
  return apiFetch('Account/Me')
}

export function login(userName, password, rememberMe) {
  return apiFetch('Account/Login', {body: {userName, password, rememberMe}, method: 'POST' }, true)
}

export function logout() {
  return apiFetch('Account/Logout', {}, true)
}

export async function getCodes() {
  return Promise.resolve(
    [
      {id: 1, code: 'ADCFERS12444', count: 1}, {id: 2, code: 'CD2FASDLL2D', count: 9}, {id: 3, code: 'AWWEFA112DA', count: 11}
    ]
  )
  //return apiFetch('Tender/GetTop5', {searchParams: {InstalledProducID: id}})
}

export function addNewCode(code) {
  return Promise.resolve([])
}

export async function getDeliveries(page, pageSize, filters, sort) {
  return apiFetch('Deliveries/GetDeliveries',
    {searchParams: {page, pageSize, filters, sort}}).then(res => {
    return {
      total: res.info.count,
      page: res.info.page,
      data: res.data
    }
  })
}

export async function getEmployees() {
  return apiFetch('Deliveries/GetEmployees')
}

export async function getStatuses() {
  return apiFetch('Deliveries/GetDeliveryStatus')
}

export function setDeliveryEmployee(deliveryNumber, employeeID, employeeType) {
  return apiFetch('Deliveries/SetDeliveryEmployee',
    {searchParams: {
      DeliveryNumber: deliveryNumber,
      EmployeeID: employeeID,
      Type: employeeType}
    }, true)
}

export function setDeliveryStatus(deliveryNumber, statusID) {
  return apiFetch('Deliveries/SetDeliveryStatus',
    {searchParams: {
      DeliveryNumber: deliveryNumber,
      StatusID: statusID}
    }, true)
}
