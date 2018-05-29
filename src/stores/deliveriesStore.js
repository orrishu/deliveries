import { action, computed, observable, toJS } from 'mobx'
import { getDeliveries, getEmployees } from 'common/services/apiService'

class Deliveries {
  @observable resultsLoading = false
  @observable request = {};
  @observable deliveries = []
  @observable searchError = null
  @observable empLoading = false
  @observable empData = {};
  @observable employees = []
  @observable hasMoreResults = true
  @observable lastResultsPage = 0
  @observable resultsPageSize = 10
  @observable resultsCount = 0
  //@observable addingCode = false
  //@observable add = {};

  @action.bound
  async loadDeliveries() {
    if (!this.resultsLoading) {
      this.resultsLoading = true
      this.searchError = null

      const page = this.lastResultsPage + 1
      const pageSize = this.resultsPageSize

      try {
        this.request = await getDeliveries(page, pageSize)
      }
      catch(e) {
        //an error occured on search
        this.searchError = {
          message: `[loadDeliveries] error: ${e.message} http status code ${e.error.status}`,
          statusCode: e.error.status
        }
      }

      if (this.searchError == null) {

        const { data, total } = this.request
        if (data.length > 0) {
          this.lastResultsPage++
        }
        console.info('[loadDeliveries]', this.lastResultsPage)
        this.deliveries = [...this.deliveries, ...data.map(d => ({ ...d, key: d.Id }))]
        this.resultsCount = total
        this.hasMoreResults = data.length > 0 && this.deliveries.length < this.resultsCount
      }
      else {
        console.error(toJS(this.searchError))
        this.deliveries = []
        this.resultsCount = 0
        this.hasMoreResults = false
      }
      this.resultsLoading = false
    }
  }

  @action.bound
  async loadEmployees() {
    if (!this.empLoading) {
      this.empLoading = true
      let empError = null
      try {
        this.empData = await getEmployees()
      }
      catch(e) {
        //an error occured on search
        empError = {
          message: `[loadEmployees] error: ${e.message} http status code ${e.error.status}`,
          statusCode: e.error.status
        }
      }

      if (empError == null) {
        console.info('[loadEmployees]')
        const data = this.empData
        this.employees = [...data.map(d => ({ ...d, key: d.Id }))]
      }
      else {
        console.error(toJS(empError))
        this.employees = []
      }
      this.empLoading = false
    }
  }
/*
  @action.bound
  async addCode(code) {
    if (!this.addingCode) {
      this.addingCode = true
      let codeError = null
      try {
        this.add = await addNewCode(code)
      }
      catch(e) {
        //an error occured on search
        codeError = {
          message: `[loadCodes] error: ${e.message} http status code ${e.error.status}`,
          statusCode: e.error.status
        }
      }

      if (codeError == null) {
        console.info('[addCode]')
      }
      else {
        console.error(toJS(codeError))
      }
      this.addingCode = false
    }
  }*/
}

export const deliveriesStore = new Deliveries()
