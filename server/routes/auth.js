require('dotenv').config()
const moongose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const router = require('express').Router()

//Models
const User = require('../models/User')

router.get('/user/:id', checkToken, async (req, res) => {
    const id = req.params.id
    const user = await User.findById(id, '-password')
    if (!user) {
        return res.status(404).json({ msg: 'Usuário não encontrado' })
    }
    res.status(200).json(user)
})

router.get('/user', checkToken, async (req, res) => {
    const user = await User.find()
    if (!user) {
        return res.status(404).json({ msg: 'Usuário não encontrado' })
    }
    res.status(200).json(user)
})

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body

    if (!name) {
        return res.status(422).json({ msg: 'Nome é obrigatório' })
    }
    if (!email) {
        return res.status(422).json({ msg: 'Email é obrigatório' })
    }
    if (!password) {
        return res.status(422).json({ msg: 'Senha é obrigatório' })
    }

    //check if user exists
    const userExists = await User.findOne({ email: email })
    if (userExists) {
        return res.status(422).json({ msg: 'Utilize outro e-mail' })
    }

    //create password
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    //create user

    const user = new User({
        name, email, password: passwordHash
    })

    try {
        await user.save()
        res.status(201).json({ msg: 'Usuário criado com sucesso' })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
})

//Login user

router.post('/user', async (req, res) => {
    const { email, password } = req.body

    if (!email) {
        return res.status(422).json({ msg: 'Email é obrigatório' })
    }
    if (!password) {
        return res.status(422).json({ msg: 'Senha é obrigatório' })
    }

    const user = await User.findOne({ email: email })
    if (!user) {
        return res.status(404).json({ msg: 'Usuário não cadastrado' })
    }

    const checkPassword = await bcrypt.compare(password, user.password)
    if (!checkPassword) {
        return res.status(422).json({ msg: 'Senha incorreta' })
    }
    try {
        const secret = process.env.SECRET
        const token = jwt.sign(
            {
                id: user._id,
            },
            secret,
        )
        res.status(200).json({ msg: 'Autenticação realizada com sucesso', token })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
})

//Check token don't use arrow function here!
function checkToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) {
        return res.status(401).json({ msg: 'Acesso negado' })
    }

    try {
        const secret = process.env.SECRET
        jwt.verify(token, secret)
        next()
    } catch (error) {
        res.status(400).json({ msg: 'Token inválido' })
    }
}

//Credenciais

const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASSWORD

moongose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.gferh9e.mongodb.net/?retryWrites=true&w=majority`).then(() => {
    console.log('Conectado ao banco de dados')
}).catch((error) => {
    console.log('falha ao conectar com o banco de dados')
})

module.exports = router