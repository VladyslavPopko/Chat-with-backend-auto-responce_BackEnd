import { Router } from 'express'
import { RegisterService } from './register.service'

const router = Router()

const registerService = new RegisterService()

router.post('/', async (req, res) => {
	const isUser = await registerService.findUserEmail(req.body.email)

	if (isUser) return res.status(400).json({ message: 'This email exists' })

	const user = await registerService.createUser(req.body)

	const token = registerService.generateToken(user.id)

	return res.status(200).json({ user, token })
})

export const registerRouter = router
