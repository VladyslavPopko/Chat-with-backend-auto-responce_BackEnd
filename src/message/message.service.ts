import { Message, PrismaClient } from '@prisma/client'
import { IMessage } from './message.types'

export class MessageService {
	private prisma = new PrismaClient()

	createMessage(message: IMessage): Promise<Message> {
		return this.prisma.message.create({
			data: message,
		})
	}

	updateMessage(id: string, message: IMessage): Promise<Message> {
		return this.prisma.message.update({
			where: {
				id: id,
			},
			data: {
				text: message.text,
				updatedAt: new Date(),
			},
		})
	}

	updateMessageRead(id: string, isRead: boolean): Promise<Message> {
		return this.prisma.message.update({
			where: {
				id: id,
			},
			data: {
				isRead: isRead,
			},
		})
	}

	deleteMessage(id: string): Promise<Message> {
		return this.prisma.message.delete({
			where: {
				id: id,
			},
		})
	}

	findMessage(id: string): Promise<Message | null> {
		return this.prisma.message.findFirst({
			where: {
				id: id,
			},
		})
	}
}
