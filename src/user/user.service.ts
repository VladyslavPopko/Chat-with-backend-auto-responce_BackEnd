import { PrismaClient, User } from '@prisma/client'
import { IUser } from './user.types'

export class UserService {
	private prisma = new PrismaClient()

	createUser(user: IUser): Promise<User> {
		return this.prisma.user.create({
			data: user,
		})
	}

	findUserEmail(email: string): Promise<User | null> {
		return this.prisma.user.findFirst({
			where: {
				email: email,
			},
		})
	}

	findAllUsers(): Promise<User[] | null> {
		return this.prisma.user.findMany()
	}

	updateUser(id: string, data: IUser): Promise<User | null> {
		return this.prisma.user.update({
			where: {
				id: id,
			},
			data: {
				name: data.name,
				surname: data.surname,
				email: data.email,
				avatar: data.avatar,
				password: data.password,
				isOnline: data.isOnline,
				updatedAt: new Date(),
			},
		})
	}

	updateUserOnline(id: string, isOnline: boolean): Promise<User | null> {
		return this.prisma.user.update({
			where: {
				id: id,
			},
			data: {
				isOnline: isOnline,
			},
		})
	}

	getUserMessages(id: string) {
		return this.prisma.user.findFirst({
			where: { id: id },
			include: {
				sentMessages: true,
				receivedMessages: true,
			},
		})
	}

	getUserChats(id: string) {
		return this.prisma.user.findFirst({
			where: { id: id },
			include: {
				chatUsers: true,
			},
		})
	}
}
