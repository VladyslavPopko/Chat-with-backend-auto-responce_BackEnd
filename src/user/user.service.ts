import { PrismaClient, User } from '@prisma/client'
import { ICreateUser } from './user.types'

export class UserService {
	private prisma = new PrismaClient()

	createUser(user: ICreateUser): Promise<User> {
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
}
