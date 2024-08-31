import { verify } from 'argon2'
import { Request, Response, Router } from 'express'
import { LoginService } from './login.service'
import { ILoginUser } from './login.types'

const router = Router()

const loginService = new LoginService()

router.post('/', async (req: Request<{}, {}, ILoginUser>, res: Response) => {
	const user = await loginService.findUserEmail(req.body.email)

	if (!user) return res.status(404).json({ message: 'User not found' })

	const isValidPassword = await verify(user.password, req.body.password)

	if (!isValidPassword)
		return res.status(400).json({
			message: 'Password is incorrect',
		})

	const token = loginService.generateToken(user.id)
	res.json({ user, token })
})

export const loginRouter = router
