import { PrismaClient, User } from '@prisma/client'

export class ChatService {
	private prisma = new PrismaClient()

	createUser(user: any): Promise<User> {
		return this.prisma.user.create({
			data: user,
		})
	}
}
