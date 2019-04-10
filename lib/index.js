'use strict'

const request = require('request-promise')
const userAgent = require('random-useragent')

class GabutApp {
  constructor () {
    const requestOptions = {}
    requestOptions.baseUrl = 'http://gabut.club/'
    requestOptions.json = true
    requestOptions.method = 'POST'
    requestOptions.headers = { 'User-Agent': userAgent.getRandom() }
    this.request = request.defaults(requestOptions)
  }

  /**
   * Auhtentication
   * @method auth
   * @param {Object} user - the user data
   * @param {string} user.username - user username
   * @param {string} user.password - user password
   * @param {integer} user.clientId - user clientId (default 1005)
   * @returns {Object} auth response object
   */
  async auth ({ username, password, clientId = 1005 }) {
    try {
      const response = await this.request
        .post('/api/v2/method/account.signIn')
        .form({ username, password, clientId })

      this.accountId = response.accountId
      this.accessToken = response.accessToken
      const accountId = this.accountId
      const accessToken = this.accessToken

      this.request = this.request
        .defaults({ form: { accountId, accessToken } })
      return response
    } catch (err) {
      throw new Error(err)
    }
  }

  /**
   * Get Profile
   * @method getProfile
   * @param {integer} profileId - profileId of user (if empty default fill with own accountId)
   * @returns {Promise} Promise object of getProfile response
   */
  getProfile (profileId = this.accountId) {
    return this.request('/api/v2/method/profile.get', {
      form: { profileId, accessMode: 1 }
    })
  }

  /**
   * Get Stream
   * @method getStream
   * @param {integer} itemId - curson of page (default 0)
   * @returns {Promise} Promise object of getStream response
   */
  getStream (itemId = 0) {
    return this.request('api/v2/method/stream.get', {
      form: { itemId }
    })
  }

  /**
   * Like Post
   * @method likeItem
   * @param {integer} itemId - id of post to be liked
   * @returns {Promise} Promise object of likeItem response
   */
  likeItem (itemId) {
    return this.request('api/v2/method/items.like', {
      form: { itemId }
    })
  }
}

module.exports = GabutApp
