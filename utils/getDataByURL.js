const request = require('request')
const logger  = require('log4js').getLogger('getDataByURL')

function getDataByURL (URL) {
  logger.trace('Start, %s', URL)

  return new Promise((resolve, reject) => {
    request({url: URL}, (err, res, body) => {
      if (err) {
        logger.error('Fail, ', err)
        logger.debug('URL: %s', URL)
        reject(err)
      } else {
        if (res.statusCode === 200) {
          logger.trace('Done', res.statusCode, URL)
          resolve(body)
        } else {
          logger.warn('Warning: can`t get data', res.statusCode, URL)
          reject(new Error(`HTTP code ${res.statusCode}`))
        }
      }
    })
  })
}

module.exports = getDataByURL
