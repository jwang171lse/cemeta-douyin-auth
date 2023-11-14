import { StoreKey } from "@/config/enum";
import { RouteRecordRaw } from "vue-router";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAsideMenuListStore = defineStore(StoreKey.ASIDE_MENU_LIST, () => {
	let menuList = ref<RouteRecordRaw[]>([])
	function setMenuList(list: RouteRecordRaw[]) {
		menuList.value = list
	}
	return { menuList, setMenuList }
})
