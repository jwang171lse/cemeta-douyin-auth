import { LocalStorageKey, StoreKey } from '@/config/enum'
import { UserInfo } from '@/vo/UserInfo'
import { useLocalStorage } from '@/hooks/useStorage'
import { defineStore } from 'pinia'
import { nextTick, ref } from 'vue'
let inited = false

export const useUserStore = defineStore(StoreKey.USER_INFO, () => {
	let userInfo = ref<UserInfo | null>(null)

	if (!inited) {
		nextTick(() => {
			userInfo.value = useLocalStorage<UserInfo | null>(LocalStorageKey.USER_INFO)
		})
		inited = true
	}

	function setStoreUserInfo(data: UserInfo | null) {
		userInfo.value = data
	}
	return { userInfo, setStoreUserInfo }
})
