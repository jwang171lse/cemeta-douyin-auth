import { LocalStorageKey } from "@/config/enum"
import { UserInfo } from "@/vo/UserInfo"
import { useUserStore } from '@/store/userStore'
import { useLocalStorage } from "@/hooks/useStorage"
import { useAsideMenuListStore } from "@/store/asideMenuListSotre"
export function setUserInfo(userInfo: UserInfo) {
	useLocalStorage(LocalStorageKey.USER_INFO, userInfo)
	let { setStoreUserInfo } = useUserStore()
	setStoreUserInfo(userInfo)
}
export function loginOut() {
	localStorage.clear()
	let { setStoreUserInfo } = useUserStore()
	setStoreUserInfo(null)
	let { setMenuList } = useAsideMenuListStore()
	setMenuList([])
}
