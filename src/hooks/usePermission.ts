import { RoleType, useUserRoleStore } from "@/store/userRoleStore";
import { ref, watch } from "vue";

function getMapValue(map: Map<any, any>, key: any): string {
	let value = '' + (map.get(key) || false)
	return value
}


function replaceExpression2Boolean(expression: string, map: Map<RoleType, boolean>, list: Array<IterableIterator<RegExpMatchArray>>) {
	list.forEach(item => {
		for (const match of item) {
			let key = match[0] as RoleType
			expression = expression.replace(key, getMapValue(map, key))
		}
	})
	return expression
}

export function usePermission(expressionInput?: string) {
	let result = ref({
		hasPermission: false,
	})
	if (expressionInput === undefined || expressionInput === '') {
		result.value.hasPermission = true
		return result
	}
	let userRoleStore = useUserRoleStore()

	function calcResult() {
		let expression = '' + expressionInput



		let roleMatch = expression.matchAll(/(admin)|(user)/g)


		expression = replaceExpression2Boolean(expression, userRoleStore.roleMap, [roleMatch])

		let cloneExpression = '' + expression
		cloneExpression = cloneExpression.replace(/true/g, '')
		cloneExpression = cloneExpression.replace(/false/g, '')
		cloneExpression = cloneExpression.replace(/\(/g, '')
		cloneExpression = cloneExpression.replace(/\)/g, '')
		cloneExpression = cloneExpression.replace(/&&/g, '')
		cloneExpression = cloneExpression.replace(/\|\|/g, '')
		cloneExpression = cloneExpression.replace(/ /g, '')
		if (cloneExpression) {
			console.error('premission expression is unvalidate.', cloneExpression)
			return result
		}
		eval(
			`
			result.value.hasPermission =	${expression}
			`
		)
		console.info('permission result:', expressionInput, result);
	}
	calcResult()
	watch(() => [userRoleStore.roleMap], () => {
		calcResult()
	}, { deep: true })

	return result
}
