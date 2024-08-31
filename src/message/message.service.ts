import { Message, PrismaClient } from '@prisma/client'
import { IMessage } from './message.types'

export class MessageService {
	private prisma = new PrismaClient()

	createMessage(message: IMessage): Promise<Message> {
		return this.prisma.message.create({
			data: message,
		})
	}
}
