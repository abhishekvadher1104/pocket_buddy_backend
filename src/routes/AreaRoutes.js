const routes = require('express').Router()

const areaController = require('../controller/AreaController')

routes.post('/addarea',areaController.addArea)
routes.get('/getareas',areaController.getAllArea)
routes.get('/getareabycityid/:cityId',areaController.getAreaByCityId)

module.exports = routes