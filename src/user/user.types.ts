export interface IUser {
	name: string
	surname: string
	email: string
	avatar: string
	password: string
	isOnline: boolean
}

export interface IUpdateUser extends IUser {
	id: string
}

export interface IUpdateIsOnlineUser {
	id: string
	isOnline: boolean
}

export interface IUserId {
	id: string
}

export interface IUserName {
	name: string
}
