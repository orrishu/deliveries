import { action, computed, observable, toJS } from 'mobx'
import { me, login, logout } from 'common/services/apiService'

class Account {

  @observable loading = false
  @observable profile = null
  @observable error = null
  @observable errorMessage = null

  constructor() {
    //console.log('store constructor')
    this.loadProfile()
  }

  @action.bound
  loadProfile() {
    //this.me = await me()
    me().then(profile => {
      this.profile = profile
      //console.log('Me', this.profile)
    })
  }

  @action.bound
  async login(userName, password, rememberMe) {
    try {
      this.error = null
      this.errorMessage = null
      this.profile = await login(userName, password, rememberMe)
    }
    catch(e) {
      this.error = `[accountStore] login error: ${e.message} http status code ${e.error.status}`
      this.errorMessage = e.message   //friendly message returns from api
    }

    if (this.error != null) {
      console.error(this.error)
    }
  }

  @action.bound
  async logout() {
    this.profile = await logout()

    //clean the userdata cookie
    document.cookie = 'UserData=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    this.error = null
    this.profile = null
  }
}

export const accountStore = new Account()
