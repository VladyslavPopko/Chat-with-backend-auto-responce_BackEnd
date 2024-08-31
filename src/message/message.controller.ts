import { Request, Response, Router } from 'express'
import { MessageService } from './message.service'
import { IMessage } from './message.types'

const router = Router()

const messageService = new MessageService()

router.post(
	'/create',
	async (req: Request<{}, {}, IMessage>, res: Response) => {
		const message = await messageService.createMessage(req.body)
		res.status(200).json(req.body)
	}
)

export const messageRouter = router
