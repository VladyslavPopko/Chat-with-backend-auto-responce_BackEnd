import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'
import express, { Request, Response } from 'express'
import { chatRouter } from './chat/chat.controller'
import { loginRouter } from './login/login.controller'
import { messageRouter } from './message/message.controller'
import { registerRouter } from './register/register.controller'
import { userRouter } from './user/user.controller'

const prisma = new PrismaClient()

dotenv.config()

const app = express()

async function main() {
	app.use(express.json())

	app.use('/user', userRouter)
	app.use('/message', messageRouter)
	app.use('/chat', chatRouter)
	app.use('/register', registerRouter)
	app.use('/login', loginRouter)

	app.all('*', (req: Request, res: Response) => {
		res.status(404).json({ message: 'Not Found' })
	})

	app.listen(process.env.PORT || 4200, () => {
		console.log(`Server is running on port ${process.env.PORT || 4200}`)
	})
}

main()
	.then(async () => {
		await prisma.$connect()
	})
	.catch(async e => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
