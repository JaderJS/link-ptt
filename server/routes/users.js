const router = require('express').Router()

const { connection } = require('../services/gerencyUsers')

/*
router.get('/', (req, res) => {
    res.send('<div>Hello</div>')
})*/

router.get('/:id&:name', (req, res) => {

    const { id, name } = req.params
    console.log(id + name)
    res.send(`<p>${id}</p>`)

})

module.exports = router