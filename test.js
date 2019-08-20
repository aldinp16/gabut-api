'use strict'

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const Gabut = require('./lib/index.js')

async function main () {
  const gabut = new Gabut()
  await gabut.auth({ username: 'gabutanj', password: 'gabutanj' })

  // get stream feeds (return promise object of getStream response)
  const feeds = await gabut.getStream()
  console.log(feeds)
}

main ()