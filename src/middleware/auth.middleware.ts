import { PrismaClient } from '@prisma/client'
import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

export const protect = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const prisma = new PrismaClient()
	let token: string
	if (req.headers.authorization?.startsWith('Bearer')) {
		token = req.headers.authorization.split(' ')[1]

		if (process.env.ACCESS_TOKEN) {
			const decoded = jwt.verify(token, process.env.ACCESS_TOKEN)

			const userFound = await prisma.user.findUnique({
				where: {
					id: (decoded as JwtPayload).id as string,
				},
			})

			if (userFound) {
				next()
			} else {
				return res.status(401).json({ message: 'Not authorized' })
			}
		}
	} else {
		res.status(401).json({ message: 'Not authorized' })
	}
}
