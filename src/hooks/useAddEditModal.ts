import { FormInstance, Message } from "@arco-design/web-vue"
import { cloneDeep } from "lodash"
import { UnwrapRef, computed, ref } from "vue"
export type ModalOpenType = 'add' | 'edit'
export function useAddEditModal<AddModel, EditModel = AddModel>(modelDefaulValue: AddModel) {
	let getModelDefaultValue = function (): AddModel {
		return cloneDeep(modelDefaulValue)
	}
	let addEditFormModel = ref<AddModel | EditModel>(getModelDefaultValue())

	let addEditModalShow = ref(false)
	let type = ref<ModalOpenType>('add')
	let addEditModalOpenTypeCN = computed(() => type.value == 'add' ? '添加' : '编辑')

	function onAddEditModalChangeShowStatus(status: boolean, item?: EditModel, dealFn?: (item: EditModel) => void) {
		type.value = item ? 'edit' : 'add'

		if (status) {
			if (type.value == 'add') {
				addEditFormModel.value = getModelDefaultValue() as UnwrapRef<AddModel>
			} else {
				if (!item) throw new Error('open edit modal must give item param.')
				dealFn?.(item)
				addEditFormModel.value = cloneDeep(item as UnwrapRef<EditModel>)
			}
		}
		addEditModalShow.value = status
	}

	async function onAddEditModalSubmit(fn?: {
		formRef?: FormInstance
		add?: Function
		edit?: Function
		delete?: Function
		refresh?: Function
	}) {
		if (type.value == 'add') {
			// debugger
			// if (await fn?.formRef?.validate()) { throw new Error('form validate failed.') }//todo
			await fn?.add?.()
		}

		if (type.value == 'edit') {
			if (await fn?.formRef?.validate()) { throw new Error('form validate failed.') }
			await fn?.edit?.()
		}

		if (fn?.add || fn?.edit || fn?.delete) {
			await fn?.delete?.()
			addEditModalShow.value = false
			await fn?.refresh?.()
			Message.success(`${fn?.delete ? '删除' : addEditModalOpenTypeCN.value}成功`)
		}
	}


	return {
		addEditModalShow,
		addEditFormModel,
		addEditModalOpenTypeCN,
		onAddEditModalChangeShowStatus,
		onAddEditModalSubmit,
	}
}
