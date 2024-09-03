import { PrismaClient } from '@prisma/client'
import cors from 'cors'
import dotenv from 'dotenv'
import express, { Request, Response } from 'express'
import http from 'http'
import { Server } from 'socket.io'
import { chatRouter } from './chat/chat.controller'
import { loginRouter } from './login/login.controller'
import { messageRouter } from './message/message.controller'
import { IMessage } from './message/message.types'
import { registerRouter } from './register/register.controller'
import { userRouter } from './user/user.controller'

const prisma = new PrismaClient()

dotenv.config()

const PORT = Number(process.env.PORT) || 4200
const HOST = process.env.HOST || '127.1.3.60'

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST'],
	},
})
io.on('connection', socket => {
	console.log('New client connected')

	socket.on('send-message', (message: IMessage) => {
		console.log('Message received from client:', message)

		io.emit('message', message)
	})

	socket.on('disconnect', () => {
		console.log('Client disconnected')
	})
})

server.listen(8080, () => {
	console.log('Server is listening on port 8080')
})

async function main() {
	app.use(express.json())

	app.use(
		cors({
			origin: '*',
			methods: ['GET', 'POST', 'PUT', 'DELETE'],
			allowedHeaders: ['Content-Type', 'Authorization'],
		})
	)

	app.use('/user', userRouter)
	app.use('/message', messageRouter)
	app.use('/chat', chatRouter)
	app.use('/register', registerRouter)
	app.use('/login', loginRouter)

	app.all('*', (req: Request, res: Response) => {
		res.status(404).json({ message: 'Not Found' })
	})

	app.listen(PORT, HOST, () => {
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
