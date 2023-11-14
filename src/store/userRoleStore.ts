import { StoreKey } from "@/config/enum";
import { Role } from "@/vo/UserInfo";
import { defineStore } from "pinia";
import { nextTick, ref, watch } from "vue";
import { useUserStore } from "./userStore";
import { generateRoutes } from "@/router/router";

export type RoleType = Role
export const useUserRoleStore = defineStore(StoreKey.USER_ROLE, () => {
	let userStore = useUserStore()
	let roleMap = ref(new Map<RoleType, boolean>());
	let loadingRole = ref(false)

	watch(() => [userStore.userInfo], () => {
		loadingRole.value = true
		roleMap.value.clear();
		(userStore.userInfo?.user.role || []).forEach((role: Role) => {
			roleMap.value.set(role, true)
		})
		nextTick(() => {
			loadingRole.value = false
		})
	})

	watch(() => [roleMap], () => {
		generateRoutes()
	}, {
		deep: true,
	},)

	return { roleMap, loadingRole }
})
