import { Router } from 'express'
import users from '../users.js'
import _ from 'lodash'
import { validationResult, matchedData, checkSchema } from 'express-validator'
import { patchSchema, putSchema } from '../schemas.js'
const usersRouter = Router()

const checkId = (req, res, next) => {
	const id = Number(req.params.id)
	if (isNaN(id)) {
		return res.status(400).send({ message: 'Bad Request' })
	} else if (id > users.length) {
		return res.status(404).send({ message: 'User not found!' })
	}
	res.locals.id = id
	next()
}

usersRouter.get('/api/users', (req, res) => {
	if (req.query.sort === 'asc' || req.query.sort === 'desc') {
		const result = _.orderBy(users, 'name', req.query.sort)
		return res.send(result)
	}
	res.send(users)
})
usersRouter.get('/api/users/:id', checkId, (req, res) => {
	res.send(users.find(item => item.id === res.locals.id))
})

usersRouter.put(
	'/api/users/:id',
	checkId,
	checkSchema(putSchema),
	(req, res) => {
		const result = validationResult(req)
		if (result.isEmpty()) {
			const { id } = res.locals
			users[id - 1] = { ...matchedData(req) }
			return res.sendStatus(201)
		} else {
			res.send({ errors: result.array() })
		}
	}
)

usersRouter.patch(
	'/api/users/:id',
	checkId,
	checkSchema(patchSchema),
	(req, res) => {
		const result = validationResult(req)
		if (result.isEmpty()) {
			const { id } = res.locals
			users[id - 1].name = matchedData(req).name
			return res.sendStatus(201)
		} else {
			res.send({ errors: result.array() })
		}
	}
)

usersRouter.delete('/api/users/:id', checkId, (req, res) => {
	const { id } = res.locals
	users.splice(id - 1, 1)
	res.sendStatus(410)
})

usersRouter.post('/api/users', (req, res) => {
	const newUser = { id: users.length + 1, ...req.body }
	users.push(newUser)
	res.sendStatus(201)
})

export default usersRouter
