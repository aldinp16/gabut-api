'use strict'

const request = require('request-promise')
// require('request-debug')(request)

class GabutApp {
  constructor () {
    const requestOptions = {}
    requestOptions.baseUrl = 'http://gabut.club/'
    requestOptions.json = true
    requestOptions.method = 'POST'
    requestOptions.headers = { 'User-Agent': 'Aku Padamu v1.0.0 JS' }
    this.request = request.defaults(requestOptions)
  }

  async auth ({ username, password, clientId = 1005 }) {
    const response = await this.request
      .post('/api/v2/method/account.signIn')
      .form({ username, password, clientId })

    this.accountId = response.accountId
    this.accessToken = response.accessToken

    this.request = this.request.defaults({
      form: {
        accountId: this.accountId,
        accessToken: this.accessToken
      }
    })

    return response
  }

  async getProfile (profileId = this.accountId) {
    return this.request('/api/v2/method/profile.get', {
      form: { profileId, accessMode: 1 }
    })
  }

  async getStream (itemId = 0) {
    return this.request('api/v2/method/stream.get', {
      form: { itemId }
    })
  }

  async likeItem (itemId) {
    return this.request('api/v2/method/items.like', {
      form: { itemId }
    })
  }
}

module.exports = GabutApp
