import { action, computed, observable } from 'mobx'
import * as translations from 'common/translations'

const dateProps = {
  day: '2-digit',
  month: '2-digit',
  year: '2-digit'
}

class Translations {
  @observable locale = 'he-IL' //en-US

  @computed
  get phrases() {
    return translations[this.locale === 'en-US' ? 'en' : 'il'] || {}
  }

  @computed
  get format() {
    const intl = new Intl.DateTimeFormat(this.locale, dateProps)
    return intl.format.bind(intl)
  }

  @action
  setLocale(locale) {
    this.locale = locale
  }
}

export const translationsStore = new Translations()
