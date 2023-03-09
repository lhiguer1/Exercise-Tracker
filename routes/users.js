const { Router } = require('express')
const { userController, exerciseController } = require('../controllers')

const router = Router()

router.param('_id', userController.userRequestParamHandler)

router.route('/users')
    .post(userController.userCreate)
    .get(userController.userList)

router.post('/users/:_id/exercises', exerciseController.exerciseCreate)

router.get('/users/:_id/logs',
    exerciseController.logQueryStringParser,
    exerciseController.exerciseList
)

module.exports = router