<template>
	<div class="page-business p-3">
		<div class="flex items-center justify-between">
			<a-space>
				<a-button type="primary" @click="onAddEditModalChangeShowStatus(true)">添加企业</a-button>
			</a-space>
			<div>
				<a-input-search allow-clear v-model="searchInfo.keyword" placeholder="企业名称搜索" @press-enter="onSearch()" @search="onSearch()" />
			</div>
		</div>
		<div class="mt-3">
			<a-table
				:data="listInfo.list"
				:pagination="{ total: listInfo.total, current: pageInfo.page, pageSize: pageInfo.limit, showTotal: true, pageSizeOptions, showPageSize: true }"
				@page-change="onPageChange"
				@page-size-change="onPageSizeChange"
			>
				<template #columns>
					<a-table-column title="企业名称" data-index="name"></a-table-column>
					<a-table-column title="企业账号" #cell="{ record }">
						{{ record.adminPhoneList.join(',') }}
					</a-table-column>

					<a-table-column title="状态">
						<template #cell="{ record }">
							<a-space size="large">
								<a-switch v-model="record.lock" @change="(status) => onSetLockStatus(record, status as boolean)">
									<template #checked> 锁定 </template>
									<template #unchecked> 未锁定 </template>
								</a-switch>
							</a-space>
						</template>
					</a-table-column>

					<a-table-column title="操作">
						<template #cell="{ record }">
							<a-space>
								<a-button
									v-permission="'admin'"
									@click="
										onAddEditModalChangeShowStatusRecharge(true, record, item => {
											Object.assign(item, {
												word: 0,
												image: 0,
												video: 0,
											})
										})
									"
									type="primary"
									:status="'success'"
									:size="'mini'"
									>充值</a-button
								>
								<a-button @click="onAddEditModalChangeShowStatus(true, record)" type="primary" status="warning" :size="'mini'">编辑</a-button>
								<a-popconfirm type="warning" content="确定删除?" @ok="onDelete(record)">
									<a-button :type="'primary'" :status="'danger'" :size="'mini'">删除</a-button>
								</a-popconfirm>
							</a-space>
						</template>
					</a-table-column>
				</template>
			</a-table>
		</div>
		<a-modal v-if="addEditModalShow" :visible="addEditModalShow" :title-align="'start'" @ok="onSubmit" @cancel="onAddEditModalChangeShowStatus(false)">
			<template #title> {{ addEditModalOpenTypeCN }}企业 </template>
			<a-form ref="addEditFormRef" v-model:model="addEditFormModel" @submit="onSubmit">
				<a-form-item field="name" label="企业名称" required>
					<a-input v-model="addEditFormModel.name" placeholder="企业名称"></a-input>
				</a-form-item>

				<a-form-item
					field="adminPhoneList"
					label="管理员"
					required
					:rules="[{
					validator: (phoneList: string[], callback) => {
						let invalidatePhone = phoneList.find(phone => !(/^\d{11}$/.test(phone)))
						if (invalidatePhone)
							callback(`手机号 ${invalidatePhone} 格式不正确`)
					},
				}]"
				>
					<a-select required v-model="addEditFormModel.adminPhoneList" placeholder="请输入手机号" multiple allow-create :filter-option="true"> </a-select>
				</a-form-item>
				<a-form-item class="w-0 h-0 invisible !mb-0">
					<a-button html-type="submit"></a-button>
				</a-form-item>
			</a-form>
		</a-modal>
		<a-modal
			v-if="addEditModalShowRecharge"
			:visible="addEditModalShowRecharge"
			:title-align="'start'"
			@ok="onSubmitRecharge"
			@cancel="onAddEditModalChangeShowStatusRecharge(false)"
		>
			<template #title>
				<!-- @vue-skip -->
				{{ addEditFormModelRecharge.name }}企业充值
			</template>
			<a-form ref="addEditFormRefRecharge" v-model:model="addEditFormModelRecharge" @submit="onSubmitRecharge">
				<a-form-item field="word" label="文字数量" required>
					<!-- @vue-ignore -->
					<a-input-number v-model="addEditFormModelRecharge.word" :min="0" :step="1" placeholder="文字数量"></a-input-number>
				</a-form-item>
				<a-form-item field="image" label="图片数量" required>
					<!-- @vue-ignore -->
					<a-input-number v-model="addEditFormModelRecharge.image" :min="0" :step="1" placeholder="图片数量"></a-input-number>
				</a-form-item>
				<a-form-item field="video" label="视频数量" required>
					<!-- @vue-ignore -->
					<a-input-number v-model="addEditFormModelRecharge.video" :min="0" :step="1" placeholder="视频数量"></a-input-number>
				</a-form-item>
				<a-form-item class="w-0 h-0 invisible !mb-0">
					<a-button html-type="submit"></a-button>
				</a-form-item>
			</a-form>
		</a-modal>
	</div>
</template>
<script setup lang="ts">
import { apiGetCompanyList, CompanyItem, apiUpdateCompany, apiAddCompany, apiDeleteCompany, AddCompanyRecharge, apiCompanyRecharge } from '@/api/company'
import { useTable } from '@/hooks/useTable'
import { ref } from 'vue'
import { FormInstance, Modal } from '@arco-design/web-vue'
import { useAddEditModal } from '@/hooks/useAddEditModal'
let { listInfo, searchInfo, pageInfo, pageSizeOptions, onPageChange, onPageSizeChange, onSearch, getList } = useTable<
	Partial<CompanyItem>,
	{
		keyword?: string
	}
>(apiGetCompanyList, {
	keyword: '',
})

let { addEditModalShow, addEditFormModel, addEditModalOpenTypeCN, onAddEditModalChangeShowStatus, onAddEditModalSubmit } = useAddEditModal<
	Partial<CompanyItem>
>({
	name: '',
	adminPhoneList: [],
})

let addEditFormRef = ref<FormInstance>()

let {
	addEditModalShow: addEditModalShowRecharge,
	addEditFormModel: addEditFormModelRecharge,
	onAddEditModalChangeShowStatus: onAddEditModalChangeShowStatusRecharge,
	onAddEditModalSubmit: onAddEditModalSubmitRecharge,
} = useAddEditModal<Partial<AddCompanyRecharge>, CompanyItem>({})

let addEditFormRefRecharge = ref<FormInstance>()

async function onSubmit() {
	onAddEditModalSubmit({
		formRef: addEditFormRef.value,
		async add() {
			return apiAddCompany(addEditFormModel.value)
		},
		async edit() {
			return apiUpdateCompany(addEditFormModel.value)
		},
		refresh: getList,
	})
}
async function onSubmitRecharge() {
	onAddEditModalSubmitRecharge({
		formRef: addEditFormRefRecharge.value,
		async edit() {
			let editInfo = addEditFormModelRecharge.value as CompanyItem
			let addInfo = addEditFormModelRecharge.value as AddCompanyRecharge
			return apiCompanyRecharge({
				companyId: editInfo._id,
				word: addInfo.word,
				image: addInfo.image,
				video: addInfo.video,
			}).then(resp => {
				Modal.success({
					content: `${editInfo.name}公司剩余量\n${JSON.stringify(resp)}`,
				})
			})
		},
	})
}

function onDelete(item: CompanyItem) {
	onAddEditModalSubmit({
		async delete() {
			return apiDeleteCompany(item._id)
		},
		refresh: onSearch,
	})
}

async function onSetLockStatus(item: CompanyItem, status: boolean) {
	await apiUpdateCompany({
		_id: item._id,
		lock: status,
	})
	getList()
}
</script>
<style scoped lang="scss">
.page-server-manage {
}
</style>
