export interface IChatId {
	id: string
}

export interface IAddUsersToChat {
	chatId: string
	users: string[]
}

export interface IChatUser extends IChatId {
	chatId: string
	userId: string
}

export interface IChatNew {
	id: string
	name: string
}

export interface IAddUser {
	chatId: string
	userId: string
}
