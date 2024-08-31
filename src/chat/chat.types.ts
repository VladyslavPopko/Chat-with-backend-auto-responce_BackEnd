export interface IChatId {
	id: string
}

export interface IAddUsersToChat {
	chatId: string
	users: string[]
}

export interface IChatUser extends IChatId {
	chatid: string
	userId: string
}
