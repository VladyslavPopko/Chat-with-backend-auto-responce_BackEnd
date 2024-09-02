import { Request, Response, Router } from 'express'
import { ChatService } from './chat.service'
import { IAddUser, IAddUsersToChat, IChatId, IChatNew } from './chat.types'

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
		const chatUsers: IAddUser[] = req.body.users.map(userId => {
			return {
				chatId: req.body.chatId,
				userId: userId,
			}
		})
		const chat = await chatService.addUserToChat(chatUsers)
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
router.post('/find', async (req: Request<{}, {}, IChatNew>, res: Response) => {
	const chats = await chatService.findChats(req.body.id, req.body.name)
	return res.status(200).json(chats)
})

router.post('/createPrivateChat', async (req: Request, res: Response) => {
	const chat = await chatService.createPrivateChat(
		req.body.name,
		req.body.users[0],
		req.body.users[1]
	)
	return res.status(200).json(chat)
})

router.put('/updateChat', async (req: Request, res: Response) => {
	const chat = await chatService.updateChat(
		req.body.id,
		req.body.name,
		req.body.avatar
	)
	return res.status(200).json(chat)
})

export const chatRouter = router
