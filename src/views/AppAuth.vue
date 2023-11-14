<template>
	<div class="page-auth p-3">
		<div>
			<a-table
				:data="listInfo.list"
				:pagination="{ total: listInfo.total, current: pageInfo.page, pageSize: pageInfo.limit, showTotal: true, pageSizeOptions, showPageSize: true }"
				@page-change="onPageChange"
				@page-size-change="onPageSizeChange"
			>
				<template #columns>
					<a-table-column title="应用" data-index="name"></a-table-column>
					<a-table-column title="授权类型" #cell="{ record }">
						{{ record.policy }}
					</a-table-column>
					<a-table-column title="操作">
						<template #cell="{ record }">
							<a-space>
								<a-button type="primary" v-if="record.policy.companyAuth" size="mini" @click="onSetCompanyAuth(record, 'company')">设置企业授权</a-button>
								<a-button @click="onSetCompanyAuth(record, 'user')" type="primary" v-if="record.policy.userAuth" size="mini" status="success"
									>设置个人授权</a-button
								>
							</a-space>
						</template>
					</a-table-column>
				</template>
			</a-table>
		</div>

		<a-modal v-if="addEditModalShow" :visible="addEditModalShow" :title-align="'start'" @ok="onSubmit" @cancel="onAddEditModalChangeShowStatus(false)">
			<template #title> {{ addEditModalOpenTypeCN }}授权 </template>
			<a-form ref="addEditFormRef" v-model:model="addEditFormModel" @submit="onSubmit">
				<a-form-item field="companyIds" label="授权企业" v-if="addEditFormModel.type == 'company'">
					<a-select v-model="addEditFormModel.companyIds" placeholder="请选择授权企业" multiple allow-create>
						<a-option v-for="company in companyList" :label="company.name" :value="company._id">
							{{ company.name }}
						</a-option>
					</a-select>
				</a-form-item>
				<a-form-item
					field="phones"
					label="授权个人"
					v-else
					:rules="[{
					validator: (phoneList: string[], callback) => {
						let invalidatePhone = phoneList.find(phone => !(/^\d{11}$/.test(phone)))
						if (invalidatePhone)
							callback(`手机号 ${invalidatePhone} 格式不正确`)
					},
				}]"
				>
					<a-select v-model="addEditFormModel.phones" placeholder="授权个人" multiple allow-create :filter-option="true">
						<a-option v-for="phone in addEditFormModel.phones" :label="phone" :value="phone">
							{{ phone }}
						</a-option>
					</a-select>
				</a-form-item>
				<a-form-item class="w-0 h-0 invisible !mb-0">
					<a-button html-type="submit"></a-button>
				</a-form-item>
			</a-form>
		</a-modal>
	</div>
</template>
<script setup lang="ts">
import { apiGetAuthList, apiSetAppAuth, AppItem, AuthItem, AuthType, getAppList, GetAppListParam, SetAppAuthParam } from '@/api/application'
import { CompanyItem, apiGetCompanyList } from '@/api/company'
import { useAddEditModal } from '@/hooks/useAddEditModal'

import { useTable } from '@/hooks/useTable'
import { FormInstance } from '@arco-design/web-vue'
import { ref, onMounted } from 'vue'
let { listInfo, pageInfo, pageSizeOptions, onPageChange, onPageSizeChange } = useTable<Partial<AppItem>, GetAppListParam>(getAppList, {
	hasAuth: 'yes',
})

const companyList = ref(Array<CompanyItem>())
const getCompanyList = () => {
	return apiGetCompanyList({
		skip: 0,
		limit: 1000,
	}).then(resp => {
		companyList.value = resp.list
	})
}
onMounted(() => {
	getCompanyList()
})

let { addEditModalShow, addEditFormModel, addEditModalOpenTypeCN, onAddEditModalChangeShowStatus, onAddEditModalSubmit } = useAddEditModal<SetAppAuthParam>({
	type: 'company',
	companyIds: [],
})

let addEditFormRef = ref<FormInstance>()

async function onSubmit() {
	onAddEditModalSubmit({
		formRef: addEditFormRef.value,
		async edit() {
			return apiSetAppAuth(addEditFormModel.value)
		},
	})
}

let authList = ref<AuthItem[]>([])
async function onSetCompanyAuth(item: AppItem, type: AuthType) {
	authList.value = await apiGetAuthList(item._id, type)
	let list = authList.value.map(auth => auth.data)
	addEditFormModel.value.type = type
	addEditFormModel.value[type == 'company' ? 'companyIds' : 'phones'] = list
	addEditFormModel.value.__appId = item._id
	onAddEditModalChangeShowStatus(true, addEditFormModel.value)
}
</script>
<style scoped lang="scss">
.page-app-auth {
}
</style>
@/api/company
