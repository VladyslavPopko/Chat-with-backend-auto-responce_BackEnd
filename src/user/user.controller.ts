import { Router } from 'express'
import { UserService } from './user.service'

const router = Router()

const userService = new UserService()

router.post('/create', async (req, res: any) => {
	const email = await userService.findUserEmail(req.body.email)
	if (email) {
		return res.status(400).json({
			message: 'This email exists',
		})
	}
	const user = await userService.createUser(req.body)
	res.status(200).json(user)
})

export const userRouter = router
