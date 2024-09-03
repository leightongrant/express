import passport from 'passport'
import { Strategy } from 'passport-local'
import users from '../users.js'

passport.serializeUser((user, done) => {
	done(null, user.id)
})
passport.deserializeUser((id, done) => {
	try {
		const userFind = users.find(user => user.id === id)
		if (!userFind) {
			throw new Error('User not found')
		}
		done(null, userFind)
	} catch (error) {
		done(error, null)
	}
})

export default passport.use(
	new Strategy((username, password, done) => {
		console.log(`Username: ${username}`)
		console.log(`Password: ${password}`)
		try {
			const userFind = users.find(user => user.username === username)
			if (!userFind) {
				throw new Error('User not found')
			}

			if (userFind.password !== password) {
				throw new Error('Password invalid')
			}
			done(null, userFind)
		} catch (error) {
			done(error, null)
		}
	})
)
