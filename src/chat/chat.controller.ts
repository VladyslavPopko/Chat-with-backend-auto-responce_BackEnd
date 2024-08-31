import { Router } from 'express'
import { ChatService } from './chat.service'

const router = Router()

const chatService = new ChatService()

// router.post('/create', async (req: Request<{}, {}, any>, res: Response) => {
// 	const isEmailUser = await chatService(req.body.email)
// 	if (isEmailUser) {
// 		return res.status(400).json({
// 			message: 'This email exists',
// 		})
// 	}
// 	const user = await chatService.createUser(req.body)
// 	res.status(200).json(user)
// })

export const userRouter = router
