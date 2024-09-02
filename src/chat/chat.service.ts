import {
	Chat,
	ChatUser,
	Prisma,
	PrismaClient,
	PrismaPromise,
} from '@prisma/client'
import { IAddUser } from './chat.types'

export class ChatService {
	private prisma = new PrismaClient()

	findChat(id: string): Promise<Chat | null> {
		return this.prisma.chat.findFirst({
			where: {
				id: id,
			},
			include: {
				chatUsers: true,
				messages: true,
			},
		})
	}
	createChat(name: string): Promise<Chat> {
		return this.prisma.chat.create({
			data: { name },
		})
	}

	createPrivateChat(
		name: string,
		user1: { userId: string; name: string; avatar: string },
		user2: { userId: string; name: string; avatar: string }
	): Promise<Chat> {
		return this.prisma.chat.create({
			data: {
				name,
				chatUsers: {
					create: [
						{
							userId: user1.userId,
							displayedName: user2.name,
							displayedAvatar: user2.avatar,
						},
						{
							userId: user2.userId,
							displayedName: user1.name,
							displayedAvatar: user1.avatar,
						},
					],
				},
			},
			include: {
				chatUsers: true,
			},
		})
	}
	addUserToChat(chatUsers: IAddUser[]): PrismaPromise<Prisma.BatchPayload> {
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

	findChats(userId: string, nameOrDisplayedName: string) {
		return this.prisma.chat.findMany({
			where: {
				chatUsers: {
					some: {
						userId: {
							equals: userId,
						},
					},
				},
				OR: [
					{
						name: {
							contains: nameOrDisplayedName,
							mode: 'insensitive',
						},
					},
					{
						chatUsers: {
							some: {
								displayedName: {
									contains: nameOrDisplayedName,
									mode: 'insensitive',
								},
							},
						},
					},
				],
			},
			include: {
				chatUsers: true,
			},
		})
	}

	updateChat(id: string, name: string, avatar: string) {
		return this.prisma.chatUser.update({
			where: {
				id: id,
			},
			data: {
				displayedName: name,
				displayedAvatar: avatar,
			},
		})
	}
}
