import { Request, Response, Router } from 'express'
import { MessageService } from './message.service'
import {
	IMessage,
	IMessageId,
	IUpdateMessage,
	IUpdateMessageRead,
} from './message.types'

const router = Router()

const messageService = new MessageService()

router.post(
	'/create',
	async (req: Request<{}, {}, IMessage>, res: Response) => {
		const message = await messageService.createMessage(req.body)
		return res.status(200).json(message)
	}
)
router.put(
	'/update',
	async (req: Request<{}, {}, IUpdateMessage>, res: Response) => {
		const message = await messageService.updateMessage(req.body.id, req.body)
		return res.status(200).json(message)
	}
)
router.put(
	'/updateIsRead',
	async (req: Request<{}, {}, IUpdateMessageRead>, res: Response) => {
		const message = await messageService.updateMessageRead(
			req.body.id,
			req.body.isRead
		)
		return res.status(200).json(message)
	}
)

router.delete(
	'/delete',
	async (req: Request<{}, {}, IMessageId>, res: Response) => {
		const message = await messageService.deleteMessage(req.body.id)
		return res.status(200).json(message)
	}
)

export const messageRouter = router
