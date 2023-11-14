import { usePermission } from "@/hooks/usePermission";
import { Directive, watch } from "vue";




export const permissionDirective: Directive<HTMLElement, string> = {
	mounted(el, binding) {
		let display = el.style.display
		let permission = usePermission('' + binding.value)
		function show() {
			el.style.display = permission.value.hasPermission ? display : 'none'
		}
		show()
		watch(() => permission.value.hasPermission, () => {
			show()
		})
	},
}
