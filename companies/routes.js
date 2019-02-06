const { Router } = require('express')
const Company = require('./model')

const router = new Router()

router.get('/companies', (req, res, next) => {
  Company
    .findAll()
    .then(companies => {
        res.send({ companies })
    })
    .catch(error => next(error))
})

router.get('/companies/:id', (req, res, next) => {
  Company
    .findById(req.params.id)
    .then(company => {
      if (!company) {
        return res.status(404).send({
            message: `Company does not exist`
        })
      }
      return res.send(company)
    })
    .catch(error => next(error))
})


module.exports = router



// router.post('/customers', (req, res, next) => {
//   Customer
//     .create(req.body)
//     .then(customer => {
//       if (!customer) {
//         return res.status(404).send({
//           message: `Customer does not exist`
//         })
//       }
//       return res.status(201).send(customer)
//     })
//     .catch(error => next(error))
// })

// router.put('/customers/:id', (req, res, next) => {
//   Customer
//     .findById(req.params.id)
//     .then(customer => {
//       if (!customer) {
//         return res.status(404).send({
//           message: `Customer does not exist`
//         })
//       }
//       return customer.update(req.body).then(customer => res.send(customer))
//     })
//     .catch(error => next(error))
// })

// router.delete('/customers/:id', (req, res, next) => {
//   Customer
//     .findById(req.params.id)
//     .then(customer => {
//       if (!customer) {
//         return res.status(404).send({
//           message: `Customer does not exist`
//         })
//       }
//       return customer.destroy()
//         .then(() => res.send({
//           message: `Customer was deleted`
//         }))
//     })
//     .catch(error => next(error))
// })

// module.exports = router