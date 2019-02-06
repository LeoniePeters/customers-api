const { Router } = require('express')
const Login = require('./model')

const router = new Router()

router.post('/logins', (req, res, next) => {
    Login
    .create(req.body)
    .then((email, password) => {
        if(!email || !password) {
            return res.status(400).send({
                message: 'Please supply a valid email and password'
      })
    }
        return res.send({
        jwt: toJWT({ userId: 1 })
      })
    })
    .catch(error => next(error))
})

module.exports = router