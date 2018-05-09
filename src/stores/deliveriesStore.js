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
  //@observable addingCode = false
  //@observable add = {};

  @action.bound
  async loadDeliveries() {
    if (!this.resultsLoading) {
      this.resultsLoading = true
      try {
        this.request = await getDeliveries()
      }
      catch(e) {
        //an error occured on search
        this.searchError = {
          message: `[loadDeliveries] error: ${e.message} http status code ${e.error.status}`,
          statusCode: e.error.status
        }
      }

      if (this.searchError == null) {
        console.info('[loadDeliveries]')
        const data = this.request
        this.deliveries = [...data.map(d => ({ ...d, key: d.Id }))]
      }
      else {
        console.error(toJS(this.searchError))
        this.deliveries = []
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
