<template>
	<div class="page-ticket p-3">
		<div class="flex items-center justify-between">
			<a-space>
				<a-button type="primary" @click="onAddEditModalChangeShowStatus(true)">发行兑换码</a-button>
			</a-space>
			<div>
				<a-input-search allow-clear v-model="searchInfo.phone" placeholder="手机号搜索" @press-enter="onSearch()"
					@search="onSearch()" />
			</div>
		</div>
		<div class="mt-3">
			<a-table :data="listInfo.list"
				:pagination="{ total: listInfo.total, current: pageInfo.page, pageSize: pageInfo.limit, showTotal: true, pageSizeOptions, showPageSize: true }"
				@page-change="onPageChange" @page-size-change="onPageSizeChange">
				<template #columns>
					<a-table-column title="兑换码" data-index="code"></a-table-column>
					<a-table-column title="图片/配额" data-index="quota.image"></a-table-column>
					<a-table-column title="字数配额" data-index="quota.word"></a-table-column>
					<a-table-column title="所属应用">
						<template #cell="{ record }">
							{{ record.appId == '1168433' ? '小红书文案助手' : '' }}
							<!-- {{ record }} -->
						</template>
					</a-table-column>
					<a-table-column title="类型" #cell="{ record }">
						{{ ({
							'potential-user-reservation': '官网预约兑换码',
							'custom-distribution': '运维发行'
						} as Record<string, string>)[record.type] }}
					</a-table-column>
					<a-table-column title="创建时间">
						<template #cell="{ record }">
							{{ new Date(record.createdAt).toLocaleString(undefined, { hourCycle: 'h12' }) }}
						</template>
					</a-table-column>
					<a-table-column title="状态">
						<template #cell="{ record }">
							{{ record.isUseful ? '未使用' : '已使用' }}
						</template>
					</a-table-column>
					<a-table-column title="手机号" data-index="phone"></a-table-column>
					<a-table-column title="操作">
						<template #cell="{ record }">
							<a-space>
								<a-popconfirm type="warning" content="确定删除?" @ok="onDelete(record)">
									<a-button :type="'primary'" :status="'danger'" :size="'mini'">删除</a-button>
								</a-popconfirm>
							</a-space>
						</template>
					</a-table-column>
				</template>
			</a-table>
		</div>

		<a-modal v-if="addEditModalShow" :visible="addEditModalShow" :title-align="'start'" @ok="onSubmit"
			@cancel="onAddEditModalChangeShowStatus(false)">
			<template #title>
				{{ addEditModalOpenTypeCN }}兑换码
			</template>
			<a-form ref="addEditFormRef" v-model:model="addEditFormModel" @submit="onSubmit">
				<a-form-item field="appId" label="应用" required>
					<a-select v-model="addEditFormModel.appId" placeholder="请选择应用">
						<a-option v-for="item of appList" :value="item.appId" :label="item.name">{{ item.name }}</a-option>
					</a-select>
				</a-form-item>
				<a-form-item field="phone" label="用户" required>
					<a-input v-model="addEditFormModel.phone" placeholder="请输入手机号码"></a-input>
				</a-form-item>
				<a-form-item field="ticket" label="兑换码配额" :rules="[
					{
						required: true,
						min: 1,
						message: '最低1个'
					}
				]">
					<a-input-number v-model="addEditFormModel.word" placeholder="Please Enter" :default-value="0" mode="button"
						class="input-demo" />
				</a-form-item>
				<a-form-item class="w-0 h-0 invisible !mb-0">
					<a-button html-type="submit"></a-button>
				</a-form-item>
			</a-form>
		</a-modal>
	</div>
</template>
<script setup lang="ts">

import { apiGetTicketList, TicketsItem, AddTicketParam, apiAddTicket, apiDeleteTicket } from '@/api/ticket';
import { useAddEditModal } from '@/hooks/useAddEditModal';

import { useTable } from '@/hooks/useTable'
import { FormInstance } from '@arco-design/web-vue';

import { ref } from 'vue';
const appList = ref([{
	appId: '1168433',
	name: '小红书文案助手'
}]);

let {
	listInfo,
	searchInfo,
	pageInfo,
	pageSizeOptions,
	onPageChange,
	onPageSizeChange,
	onSearch,
	getList
} = useTable<Partial<TicketsItem>, {
	phone?: string
}>(apiGetTicketList, {
	phone: ''
})


let {
	addEditModalShow,
	addEditFormModel,
	addEditModalOpenTypeCN,
	onAddEditModalChangeShowStatus,
	onAddEditModalSubmit
} = useAddEditModal<AddTicketParam>({
	appId: '',
	phone: "",
	word: 1,
})

let addEditFormRef = ref<FormInstance>()



async function onSubmit() {
console.log(addEditFormRef.value);

	onAddEditModalSubmit({
		formRef: addEditFormRef.value,
		async add() {

			return apiAddTicket(addEditFormModel.value)
		},
		refresh: getList
	})
}


function onDelete(item: TicketsItem) {
	onAddEditModalSubmit({
		async delete() {
			return apiDeleteTicket([item._id])
		},
		refresh: onSearch
	})
}
</script>
<style scoped lang="scss">
.page-ticket {}
</style>
