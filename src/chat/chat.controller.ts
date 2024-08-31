import { Request, Response, Router } from 'express'
import { ChatService } from './chat.service'
import { IAddUsersToChat, IChatId, IChatNew } from './chat.types'

const router = Router()

const chatService = new ChatService()

router.post(
	'/create',
	async (req: Request<{}, {}, IChatNew>, res: Response) => {
		const chat = await chatService.createChat(req.body.name)
		return res.status(200).json(chat)
	}
)

router.post('/', async (req: Request<{}, {}, IChatId>, res: Response) => {
	const chat = await chatService.findChat(req.body.id)
	return res.status(200).json(chat)
})

router.put(
	'/addUsersToChat',
	async (req: Request<{}, {}, IAddUsersToChat>, res: Response) => {
		const chat = await chatService.addUserToChat(
			req.body.chatId,
			req.body.users
		)
		return res.status(200).json(chat)
	}
)

router.delete(
	'/removeUserFromChat',
	async (req: Request<{}, {}, IChatId>, res: Response) => {
		const chat = await chatService.removeUserFromChat(req.body.id)
		return res.status(200).json(chat)
	}
)
export const chatRouter = router
