import 'whatwg-fetch'
import cache from 'common/utils/cache'
//import {notifyMessage} from 'common/utils/notifications'

//let apiBaseUrl
//let baseUrl
//if (process.env.NODE_ENV === 'development' || location.href.indexOf('iis-test/') > -1) {
const apiBaseUrl = 'http://localhost:8020/Data/api'
const baseUrl = 'http://localhost:8020/Data'
//}
//else {
//  apiBaseUrl = 'http://www.tenders.co.il/Data/api'
//  baseUrl = 'http://www.tenders.co.il/Data'
//}

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

export async function getDeliveries(page, pageSize) {
  /*return Promise.resolve(
    [
      //{id: 1, title: 'delivery', address: 'Tel Aviv'}, {id: 2, title: 'delivery2', address: 'Jerusalem'}, {id: 3, title: 'delivery3', address: 'Haifa'}
      {
        id: 1,
    	  from: 'קורקט מתנות',
    	  to: 'רקמות נייטיב',
    	  deliveryNote: 'Aa1234',
    	  description: 'תיק גב סמסונייט',
    	  name1: 'אפרת',
    	  name2: 'אבשלום',
    	  combo1: '',
    	  combo2: 'מעטפה-',
    	  combo3: '',
    	  reciever1: '',
    	  collect: '500',
    	  date: '26/04/2018',
    	  receivedAt: '11:47',
    	  customerName: 'רקמות נייטיב',
    	  fromAddress: 'ניר אליהו',
    	  toAddress: 'הנגר 10 חולון',
    	  importance: 'רגיל',
    	  field1: 'לא',
    	  courierCollected: 'דורון',
    	  courierDelivered: 'אבשלום',
    	  status: 'הועבר',
    	  endTime: '11:47'
      },
      {
        id: 2,
    	  from: 'שימי מתנות',
    	  to: 'רקמות משה',
    	  deliveryNote: 'Aa12345',
    	  description: 'תיק גב 22',
    	  name1: 'נילי',
    	  name2: 'אליהו',
    	  combo1: '',
    	  combo2: 'מעטפה-',
    	  combo3: '',
    	  reciever1: '',
    	  collect: '600',
    	  date: '27/04/2018',
    	  receivedAt: '12:47',
    	  customerName: 'רקמות משה',
    	  fromAddress: 'ניר אליהו',
    	  toAddress: 'הנגר 110 חולון',
    	  importance: 'דחוף',
    	  field1: 'לא',
    	  courierCollected: 'שימי',
    	  courierDelivered: 'דוד',
    	  status: 'הועבר',
    	  endTime: '12:47'
      }
    ]
  )*/
  return apiFetch('Deliveries/GetDeliveries',
    {searchParams: {page, pageSize}}).then(res => {
    return {
      total: res.info.count,
      page: res.info.page,
      data: res.data
    }
  })
}

export async function getEmployees() {
  return Promise.resolve(
    [
      {id: 1, name: 'Moses'}, {id: 2, name: 'Shimmi'}, {id: 3, name: 'David'}
    ]
  )
  //return apiFetch('Tender/GetTop5', {searchParams: {InstalledProducID: id}})
}
