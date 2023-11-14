export type Role = 'user' | 'admin'
export interface UserInfo {
	token: string
	user: {
		id: string
		account: string
		role: Role[]
	}
}
