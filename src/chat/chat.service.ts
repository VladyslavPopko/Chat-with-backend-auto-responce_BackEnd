import {
	Chat,
	ChatUser,
	Prisma,
	PrismaClient,
	PrismaPromise,
} from '@prisma/client'

export class ChatService {
	private prisma = new PrismaClient()

	findChat(id: string): Promise<Chat | null> {
		return this.prisma.chat.findFirst({
			where: {
				id: id,
			},
			include: {
				chatUsers: true,
			},
		})
	}
	createChat(): Promise<Chat> {
		return this.prisma.chat.create({
			data: {},
		})
	}
	addUserToChat(
		chatId: string,
		userIds: string[]
	): PrismaPromise<Prisma.BatchPayload> {
		const chatUsers = userIds.map(userId => ({
			chatId: chatId,
			userId: userId,
		}))
		return this.prisma.chatUser.createMany({
			data: chatUsers,
		})
	}
	removeUserFromChat(id: string): Promise<ChatUser> {
		return this.prisma.chatUser.delete({
			where: {
				id: id,
			},
		})
	}
}
