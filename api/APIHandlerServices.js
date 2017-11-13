const WAT_URL             = require('../../train-backend/const/WAT_URL'),
      CACHE_NAME_SERVICES = require('../../train-backend/const/CACHE_NAME_SERVICES'),
      getDataByURL        = require('../../train-backend/utils/getDataByURL'),
      formatServicesData  = require('../../train-backend/utils/formatServicesData'),
      storeToCache        = require('../../train-backend/cache/storeToCache'),
      logger              = require('log4js').getLogger('APIHandlerServices')

function APIHandlerServices (req, res) {
	logger.trace('Start')

	getDataByURL(WAT_URL)
		.then(data => JSON.parse(data))
		.then(formatServicesData)
		.then(storeToCache(CACHE_NAME_SERVICES))
		.then(
			data => {
				res.setHeader('Content-Type', 'application/json; charset=utf-8')
				res.send(data)
				logger.trace('Done', data.length)
			},
		)
		.catch(
			err => {
				logger.error('Fail: ', err)
				res.status(500)
				res.send('Error')
			},
		)
}

module.exports = APIHandlerServices
