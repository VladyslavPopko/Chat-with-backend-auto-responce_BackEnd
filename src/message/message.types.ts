export interface IMessage {
	text: string
	senderId: string
	recipientId: string
	chatId: string
	isRead: boolean
}

export interface IMessageId {
	id: string
}

export interface IUpdateMessage extends IMessage, IMessageId {}

export interface IUpdateMessageRead extends IMessageId {
	isRead: boolean
}
