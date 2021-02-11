export default class User {
  constructor() {
    this.prefixKey = 'rLendingA'
  }

  createTx(hash, type, price, date = Date.now(), fail = false) {
    return { hash: hash, type: type, date: date, price: price, status: fail }
  }

  getKeyLocalStorage(account) {
    if (!account) return
    return this.prefixKey + account
  }

  validateExistLocalStorage(account) {
    const keyLS = this.getKeyLocalStorage(account)
    if (localStorage.getItem(keyLS)) {
      try {
        return JSON.parse(localStorage.getItem(keyLS))
      } catch (e) {
        localStorage.removeItem(keyLS)
      }
    }
  }
  getDataLocalStorage(account) {
    return this.validateExistLocalStorage(account)
  }

  _persistLocalStorage(account, data) {
    const keyLS = this.getKeyLocalStorage(account)
    console.log(keyLS)
    console.log(account)
    const parsed = JSON.stringify(data)
    // localStorage.account = this.accountStorage
    localStorage.setItem(keyLS, parsed)
  }

  addTxToAccountList(tx, account) {
    console.log(tx)
    console.log(account)
    let txList = this.getDataLocalStorage(account) ?? []
    if (!tx) {
      return false
    }
    txList.push(tx)
    this._persistLocalStorage(account, txList)
    return true
  }
}
