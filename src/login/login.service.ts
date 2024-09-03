import { PrismaClient, User } from '@prisma/client'
import jwt from 'jsonwebtoken'
import { ACCESS_TOKEN } from '../const'

export class LoginService {
	private prisma = new PrismaClient()

	findUserEmail(email: string): Promise<User | null> {
		return this.prisma.user.findFirst({
			where: {
				email: email,
			},
		})
	}

	generateToken(id: string) {
		const token = ACCESS_TOKEN
		if (!token) {
			return console.log('No access token!')
		}

		return jwt.sign({ id }, token, {
			expiresIn: '7d',
		})
	}
}
