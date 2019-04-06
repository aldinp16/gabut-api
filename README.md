# Gabut-Api
[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

Just personal project for access private  [Gabut App](https://play.google.com/store/apps/details?id=lagi.gabut.inc) API

## Example
Get item in stream feed:
```js
const Gabut = require('gabut-api')

async function main () {
  const gabut = new Gabut()
  await gabut.auth({ username: 'YourUsername', password: 'YourPassword' })

  // get stream feeds (return promise object of getStream response)
  const feeds = await gabut.getStream()
  console.log(feeds)
}

main ()
```
Get user profile:
```js
const user = await gabut.getProfile(12) // default param is own accountId
```
For More feature check the code of `lib/index.js`
# Link
* [random-useragent](https://github.com/skratchdot/random-useragent) 
* [request](https://github.com/request/request)
* [request-debug](https://github.com/request/request-debug)
* [request-promise](https://github.com/request/request-promise)

# Legal
This code is in no way affiliated with, authorized, maintained, sponsored or endorsed by Gabut App or any of its affiliates or subsidiaries. Use at your own risk.
