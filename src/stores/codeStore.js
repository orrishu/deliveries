import { action, computed, observable, toJS } from 'mobx'
import { getCodes, addNewCode } from 'common/services/apiService'

class Code {
  @observable resultsLoading = false
  @observable request = {};
  @observable codes = []
  @observable searchError = null
  @observable addingCode = false
  @observable add = {};

  @action.bound
  async loadCodes() {
    if (!this.resultsLoading) {
      this.resultsLoading = true
      try {
        this.request = await getCodes()
      }
      catch(e) {
        //an error occured on search
        this.searchError = {
          message: `[loadCodes] error: ${e.message} http status code ${e.error.status}`,
          statusCode: e.error.status
        }
      }

      if (this.searchError == null) {
        console.info('[loadCodes]')
        const data = this.request
        this.codes = [...data.map(d => ({ ...d, key: d.Id }))]
      }
      else {
        console.error(toJS(this.searchError))
        this.codes = []
      }
      this.resultsLoading = false
    }
  }

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
  }
}

export const codeStore = new Code()
