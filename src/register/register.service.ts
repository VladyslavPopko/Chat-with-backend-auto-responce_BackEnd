import { IUser } from '@/user/user.types'
import { PrismaClient, User } from '@prisma/client'
import { hash } from 'argon2'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

export class RegisterService {
	private prisma = new PrismaClient()

	findUserEmail(email: string): Promise<User | null> {
		return this.prisma.user.findFirst({
			where: {
				email: email,
			},
		})
	}

	async createUser(user: IUser): Promise<User> {
		const password = await hash(user.password)
		return this.prisma.user.create({
			data: {
				name: user.name,
				surname: user.surname,
				email: user.email,
				password: password,
			},
		})
	}
	generateToken(id: string) {
		const token = 'aASdasjdsa33'
		if (!token) {
			return console.log('No access token!')
		}

		return jwt.sign({ id }, token, {
			expiresIn: '7d',
		})
	}
}
