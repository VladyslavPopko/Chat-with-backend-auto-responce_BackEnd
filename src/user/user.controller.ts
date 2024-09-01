import { Request, Response, Router } from 'express'
import { UserService } from './user.service'
import {
	IUpdateIsOnlineUser,
	IUpdateUser,
	IUser,
	IUserId,
	IUserName,
} from './user.types'

const router = Router()

const userService = new UserService()

router.post('/create', async (req: Request<{}, {}, IUser>, res: Response) => {
	const isEmailUser = await userService.findUserEmail(req.body.email)
	if (isEmailUser) {
		return res.status(400).json({
			message: 'This email exists',
		})
	}
	const user = await userService.createUser(req.body)
	res.status(200).json(user)
})

router.get('/', async (req: Request, res: Response) => {
	const users = await userService.findAllUsers()
	return res.status(200).json(users)
})

router.put(
	'/update',
	async (req: Request<{}, {}, IUpdateUser>, res: Response) => {
		const user = await userService.updateUser(req.body.id, req.body)
		return res.status(200).json(user)
	}
)

router.put(
	'/updateIsOnline',
	async (req: Request<{}, {}, IUpdateIsOnlineUser>, res: Response) => {
		const user = await userService.updateUserOnline(
			req.body.id,
			req.body.isOnline
		)
		return res.status(200).json(user)
	}
)
router.post(
	'/messages',
	async (req: Request<{}, {}, IUserId>, res: Response) => {
		const user = await userService.getUserMessages(req.body.id)
		if (!user) {
			return res.status(404).json({
				message: 'User not found',
			})
		}
		return res.status(200).json({
			receivedMessages: user?.receivedMessages,
			sentMessages: user?.sentMessages,
		})
	}
)
router.post('/chats', async (req: Request<{}, {}, IUserId>, res: Response) => {
	const user = await userService.getUserChats(req.body.id)
	if (!user) {
		return res.status(404).json({
			message: 'User not found',
		})
	}
	return res.status(200).json({
		chatUsers: user?.chatUsers,
	})
})

router.post('/find', async (req: Request<{}, {}, IUserId>, resp: Response) => {
	const user = await userService.getUser(req.body.id)
	return resp.status(200).json(user)
})
router.post(
	'/findUsers',
	async (req: Request<{}, {}, IUserName>, resp: Response) => {
		const user = await userService.findUsers(req.body.name)
		return resp.status(200).json(user)
	}
)

export const userRouter = router
