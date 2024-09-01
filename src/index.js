import express from 'express'
import router from './routes/users.js'
import cookieParser from 'cookie-parser'
import session from 'express-session'

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(express.json())
app.use(cookieParser())
app.use(
	session({
		secret: 'testing testing',
		saveUninitialized: false,
		resave: false,
		cookie: { maxAge: 60000 * 60 },
	})
)
app.use(router)
app.get('/login', (req, res) => {
	res.cookie('loggedin', 'true', { maxAge: 600000 })
	res.send('<h2>Please Login</h2>')
})
app.get('/', (req, res) => {
	// console.log(Object.keys(req))
	// const { user-agent } = {req.headers.pragma}
	console.log(req.rawHeaders[17])
	// console.log(req.session, req.session.id)
	// req.session.visited = true

	// if (!req.headers.cookie) {
	// 	res.cookie('', 'Universe', { maxAge: 600000 })
	// } else {
	// 	console.log(req.cookies, req.headers.cookie)
	// }
	// console.log(req.cookies)
	if (req.cookies.loggedin === 'true') {
		const output = `<h1>ExpressJS Project</h1><br> <strong>Your Browser</strong> ${req.rawHeaders[17]}`

		return res.send(output)
	}
	res.redirect('/login')
})

app.listen(PORT, () => {
	console.log(
		`Server running at\nhttp://localhost:${PORT} (ctrl click to launch)`
	)
})
