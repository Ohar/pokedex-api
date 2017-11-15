const logger = require('log4js').getLogger('waitAndRetry')

const DEFAULT_TIME = 5000
const TIME_KOEF = 2

function waitAndRetry (func, args, time = DEFAULT_TIME) {
  logger.trace('Start, time = %s', time)

  return new Promise((resolve) => {
    setTimeout(() => {
      Promise
        .resolve(func(...args))
        .then(
          data => resolve(data),
        )
        .catch(err => {
          const nextTime = time * TIME_KOEF

          logger.error(`Fail, retry in ${nextTime}. Error:`, err)
          resolve(waitAndRetry(func, args, nextTime))
        })
    }, time)
  })
}

module.exports = waitAndRetry
