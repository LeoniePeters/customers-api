const { Router } = require('express')
const { toJWT, toData} = require('./jwt')
const User = require('../users/model')
const router = new Router()
const bcrypt = require('bcrypt')
const auth = require('./middleware')

router.post('/logins', (req, res, next) => {
  const email = req.body.email
  const password = req.body.password
  
  if(!email || !password) {
    res.status(400).send({
      message: 'Please supply a valid email and password'
    })
  } else {
    User
      .findOne({
        where: {
        email: req.body.email
        }
      })
      .then(entity => {
        if (!entity) {
          res.status(400).send({
            message: 'User with that email does not exist'
          })
        }
        if (bcrypt.compareSync(req.body.password, entity.password)) {
          res.send({
            jwt: toJWT({ userId: entity.id })
          })
        }
        else {
          res.status(400).send({
            message: 'Password was incorrect'
          })
        }
      })
      .catch(err => {
        console.error(err)
        res.status(500).send({
          message: 'Something went wrong'
        })
      })
    }
})

router.get('/secret-endpoint', auth, (req, res) => {
        res.send({
          message: `Thanks for visiting the secret endpoint ${req.user.email}.`,
          data
        })
      })

module.exports = router

//"jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU0OTQ2MDE4NiwiZXhwIjoxNTQ5NDY3Mzg2fQ.JklPlc98XDjrSd9GWwgOHDTseiGBHBLugTJs_yDTqMg"

//"jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU0OTQ2MTg5OCwiZXhwIjoxNTQ5NDY5MDk4fQ.96ls9hbW3C-PVrY47gLhEeSnYcShNbDRL46jSiUzuNQ"