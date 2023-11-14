import { cloneDeep } from "lodash"
import { Ref, nextTick } from "vue"
import { RouteMeta, RouteRecordNormalized, RouteRecordRaw, Router } from "vue-router"

export function recursionGetConstRoute(_routes: Array<RouteRecordRaw>, __deepIndex?: number) {
	let deepIndex = __deepIndex || 0
	let routes = cloneDeep(_routes)
	const arr = Array<RouteRecordRaw>()
	if (routes && routes.length != 0) {
		routes.forEach(route => {
			route.meta = (route.meta || {}) as RouteMeta
			const childrens = route?.children || []
			if (isRouteConst(route)) {
				Object.assign(route.meta, {
					__deepIndex: deepIndex,
				})
				arr.push(route)
				if (childrens.length != 0) {
					route.children = recursionGetConstRoute(childrens, deepIndex + 1)
				}
			}
		})
	} else {
		return []
	}
	return arr
}


function isRouteConst(route: RouteRecordRaw | RouteRecordNormalized) {
	return route.meta?.permission === undefined
}


function recursionAddRoute(router: Router, _routes: Array<RouteRecordRaw>, routeNameMap: Record<string, RouteRecordRaw> = {}, permissionFn?: (expressionInput?: string) => Ref<{ hasPermission: boolean }>, __deepIndex?: number): Array<RouteRecordRaw> {
	let routes = cloneDeep(_routes)
	let deepIndex = __deepIndex || 0
	const arr = Array<RouteRecordRaw>()
	if (routes && routes.length != 0) {
		routes.forEach((route, routeIndex) => {
			if (routeNameMap[route.name as string]) throw new Error(`route name repeat: ${JSON.stringify(route)} repeat with ${JSON.stringify(routeNameMap[route.name as string])}`)
			if (!route.name) throw new Error(`route must have name property: ${JSON.stringify(route)}`)
			routeNameMap[route.name as string] = route
			route.meta = (route.meta || {}) as RouteMeta
			route.meta = Object.assign(
				{
					__deepIndex: deepIndex,
					__sortIndex: routeIndex
				},
				route.meta
			)
			const childrens = cloneDeep(route?.children) || []
			delete route.children

			const auth = permissionFn?.(route.meta.permission)

			route.children = recursionAddRoute(router, childrens, routeNameMap, permissionFn, deepIndex + 1)

			if (isRouteConst(route) || auth?.value.hasPermission) {
				arr.push(route)
			}
		})
	} else {
		return []
	}
	return arr
}


function recursionMenuList(_routes: Array<RouteRecordRaw | RouteRecordNormalized>) {
	let routes = cloneDeep(_routes)
	const arr = Array<RouteRecordRaw>()
	if (routes && routes.length != 0) {
		routes.forEach(route => {
			const childrens = route?.children || []
			delete route.children
			const routeMenuShow = route?.meta?.menuShow
			const hasMenuShow = routeMenuShow === undefined ? false : routeMenuShow
			route.children = recursionMenuList(childrens)
			if (hasMenuShow) {
				arr.push(route as RouteRecordRaw)
			}
		})
	} else {
		return []
	}

	return arr.sort((routeA, routeB) => {
		let sortAIndex = (Reflect.get(routeA.meta || {}, '__sortIndex') as unknown as undefined | number) || -1
		let sortBIndex = (Reflect.get(routeB.meta || {}, '__sortIndex') as unknown as undefined | number) || -1
		return sortAIndex - sortBIndex
	})
}



export function clearRoutes(router: Router) {
	const allRoutes = router.getRoutes()
	allRoutes.forEach(route => {
		if (route.name && !isRouteConst(route)) {
			router.removeRoute(route.name)
		}
	})
}

export function settingRoutes(router: Router, routes: RouteRecordRaw[], init = false) {
	async function generatePermissionRoutes() {
		clearRoutes(router)

		let permissionFn = (await import('@/hooks/usePermission')).usePermission
		recursionAddRoute(router, routes, {}, permissionFn).forEach(route => {
			router.addRoute(route)
		})


		const menuList = recursionMenuList(cloneDeep(router.getRoutes().filter(item => item.meta.__deepIndex === 0)))
		let { setMenuList } = (await import('@/store/asideMenuListSotre')).useAsideMenuListStore()
		setMenuList(menuList)
	}

	if (init) {
		clearRoutes(router)
		recursionAddRoute(router, routes).forEach(route => {
			router.addRoute(route)
		})
		nextTick().then(() => {
			generatePermissionRoutes()
		})
	} else {
		generatePermissionRoutes()
	}
}
