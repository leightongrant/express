import express from 'express'
import router from './routes/users.js'
import cookieParser from 'cookie-parser'
import session from 'express-session'
// import users from './users.js'
import passport from 'passport'
import './strategies/local-strategy.js'

const app = express()
const PORT = process.env.PORT || 5000

// Middlewares
app.use(express.json())
app.use(cookieParser())
app.use(
	session({
		secret: 'testing-testing',
		saveUninitialized: false,
		resave: false,
		cookie: { maxAge: 60000 * 60 },
	})
)
app.use(passport.initialize())
app.use(passport.session())
app.use(router)

app.post('/api/auth', passport.authenticate('local'), (req, res) => {
	res.sendStatus(200)
})

// app.get('/api/auth', (req, res) => {
// 	console.log(req.query)
// 	const { username, password } = req.query

// 	const user = users.find(
// 		usr => usr.username === username && usr.password === password
// 	)

// 	if (user) {
// 		req.session.user = user
// 		console.log(req.session)
// 		return res.send(user.name)
// 	}

// 	res.send({ msg: 'BAD CREDENTIALS' })
// })

// app.get('/api/auth/status', (req, res) => {
// 	console.log(req.session)
// 	if (req.session.user) {
// 		return res.send(req.sessionID)
// 	}
// 	res.send({ msg: 'BAD CREDENTIALS' })
// })

app.get('/', (req, res) => {
	// console.log(req.session)
	// console.log(req.sessionID)
	req.session.visited = true
	req.sessionStore.get(req.sessionID, (err, data) => {
		if (err) {
			console.log(err)
			throw new err()
		}
		console.log(data)
	})
	const output = `<h1 style="text-align: center">ExpressJS Project</h1>`
	return res.send(output)
})

app.listen(PORT, () => {
	console.log(
		`Server running at\nhttp://localhost:${PORT} (ctrl click to launch)`
	)
})
