import { useAsideMenuListStore } from '@/store/asideMenuListSotre'
import { computed, defineComponent, ref } from 'vue'
import { RouteRecordName, RouteRecordRaw, useRouter } from 'vue-router'
export const AsideMenuList = defineComponent({
	name: 'AsideMenuList',
	setup() {
		const router = useRouter()
		let asideMenuListStore = useAsideMenuListStore()
		let defaultMenu = ref<string[]>([])
		let currentRouteMatchs = router.currentRoute.value.matched.map(i => i.name)

		function addSelectRoute(name?: string | RouteRecordName) {
			if (!name) return
			if (currentRouteMatchs.includes(name) && !defaultMenu.value.includes(name as string)) {
				defaultMenu.value.push(name as string)
			}
		}

		function recursionMenuTree(list: RouteRecordRaw[]) {
			return list.map(item => {
				if (item.children?.length) {
					if (item.children.length == 1) {
						let child = item.children[0]
						addSelectRoute(child.name)
						return (
							<a-menu-item
								key={child.name}
								onClick={() => {
									router.push({
										name: child.name,
									})
								}}
							>
								{child.meta?.icon?.()}
								<span>{child.meta?.title}</span>
							</a-menu-item>
						)
					}
					addSelectRoute(item.name)
					return (
						<a-sub-menu key={item.name}>
							{{
								default: () => recursionMenuTree(item.children || []),
								title: () => [item.meta?.icon?.(), <span>{item.meta?.title}</span>],
							}}
						</a-sub-menu>
					)
				} else {
					addSelectRoute(item.name)
					return (
						<a-menu-item
							key={item.name}
							onClick={() => {
								router.push({
									name: item.name,
								})
							}}
						>
							{item.meta?.icon?.()}
							<span>{item.meta?.title}</span>
						</a-menu-item>
					)
				}
			})
		}

		let renderDom = computed<JSX.Element[]>(() => {
			return recursionMenuTree(asideMenuListStore.menuList)
		})

		return { renderDom, defaultMenu }
	},
	render() {
		return (
			<a-menu default-selected-keys={this.defaultMenu} style={{ width: '100%' }}>
				{this.renderDom}
			</a-menu>
		)
	},
})
