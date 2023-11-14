<template>
	<div class="page-server-manage p-3">
		<div class="flex items-center justify-between">
			<a-space>
				<a-button type="primary" @click="onAddEditModalChangeShowStatus(true)" v-permission="'admin'">添加服务器</a-button>
			</a-space>
			<div>
				<a-input-search allow-clear v-model="searchInfo.address" placeholder="服务器地址" @press-enter="onSearch()"
					@search="onSearch()" />
			</div>
		</div>
		<div class="mt-3">
			<a-table :data="listInfo.list"
				:pagination="{ total: listInfo.total, current: pageInfo.page, pageSize: pageInfo.limit, showTotal: true, pageSizeOptions, showPageSize: true }"
				@page-change="onPageChange" @page-size-change="onPageSizeChange">
				<template #columns>
					<a-table-column title="名称" data-index="name"></a-table-column>
					<a-table-column title="类型">
						<template #cell="{ record }">
							{{ ({
								sd: 'Stable Diffusion'
							} as Record<string, string>)[record.type] }}
						</template>
					</a-table-column>
					<a-table-column title="地址" data-index="address"></a-table-column>
					<a-table-column title="状态">
						<template #cell="{ record }">
							{{ ({
								free: '空闲',
								busy: '执行中',
								unknown: '未知',
								error: '出错'
							} as Record<string, string>)[record.status] }}
						</template>

					</a-table-column>
					<a-table-column title="接收任务">
						<template #cell="{ record }">
							<a-switch v-model="record.receiveReq" :checked-value="true" :unchecked-value="false"
								:disabled="!usePermission('admin').value.hasPermission"
								@change="(status) => onSetPullTaskStatus(record, status as boolean)" />
						</template>
					</a-table-column>
					<a-table-column title="操作" v-if="usePermission('admin').value.hasPermission">
						<template #cell="{ record }">
							<a-space>
								<a-button type="primary" :size="'mini'" @click="onAddEditModalChangeShowStatus(true, record, (item) => {
									Object.assign(item, {
										id: item._id
									})
								})">编辑</a-button>
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
				{{ addEditModalOpenTypeCN }}服务器
			</template>
			<a-form ref="addEditFormRef" v-model:model="addEditFormModel" @submit="onSubmit">
				<a-form-item field="name" label="名称" required>
					<a-input v-model="addEditFormModel.name" placeholder="请输入服务器名称"></a-input>
				</a-form-item>
				<a-form-item field="type" label="类型">
					<a-select v-model="addEditFormModel.type">
						<a-select-option v-for="item in ['sd']" :key="item"></a-select-option>
					</a-select>
				</a-form-item>
				<a-form-item field="address" label="地址" required>
					<a-input v-model="addEditFormModel.address" placeholder="请输入服务器地址"></a-input>
				</a-form-item>
				<a-form-item field="weight" label="权重">
					<a-input-number v-model="addEditFormModel.weight" :min="1" :step="1" placeholder="权重"></a-input-number>
				</a-form-item>
				<a-form-item field="receiveReq" label="接收请求">
					<a-switch v-model="addEditFormModel.receiveReq"></a-switch>
				</a-form-item>
				<a-form-item class="w-0 h-0 invisible !mb-0">
					<a-button html-type="submit"></a-button>
				</a-form-item>
			</a-form>
		</a-modal>
	</div>
</template>
<script setup lang="ts">
import { ServerItem, apiAddServer, apiDeleteServer, apiGetServerList, apiSetServerPullTaskStatus } from '@/api/server';
import { useAddEditModal } from '@/hooks/useAddEditModal';
import { usePermission } from '@/hooks/usePermission';

import { useTable } from '@/hooks/useTable'
import { FormInstance } from '@arco-design/web-vue';
import { ref } from 'vue';


let {
	listInfo,
	searchInfo,
	pageInfo,
	pageSizeOptions,
	onPageChange,
	onPageSizeChange,
	onSearch,
	getList
} = useTable<Partial<ServerItem>, {
	address?: string
}>(apiGetServerList, {
	address: ''
})

let {
	addEditModalShow,
	addEditFormModel,
	addEditModalOpenTypeCN,
	onAddEditModalChangeShowStatus,
	onAddEditModalSubmit
} = useAddEditModal<ServerItem>({
	_id: '',
	name: '',
	address: '',
	type: "sd",
	weight: 1,
	receiveReq: true,
	status: "free",
	taskId: null,
	distributed: false,
})

let addEditFormRef = ref<FormInstance>()

async function onSubmit() {
	onAddEditModalSubmit({
		formRef: addEditFormRef.value,
		async add() {
			return apiAddServer(addEditFormModel.value)
		},
		async edit() {
			return apiAddServer(addEditFormModel.value)
		},
		refresh: getList
	})
}

function onDelete(item: ServerItem) {
	onAddEditModalSubmit({
		async delete() {
			return apiDeleteServer(item._id)
		},
		refresh: onSearch
	})
}

async function onSetPullTaskStatus(item: ServerItem, status: boolean) {
	await apiSetServerPullTaskStatus(item._id, {
		receiveReq: status
	})
	getList()
}

</script>
<style scoped lang="scss">
.page-server-manage {}
</style>
