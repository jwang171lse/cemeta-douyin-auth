import { Page } from "@/vo/Page"
import { cloneDeep } from "lodash"
import { computed, onMounted, reactive, ref } from "vue"

export function useTable<Item, Search = undefined>(getListApi: (param: {
	limit: number
	skip: number
} & Search) => Promise<Page<Item>>, searchDefaultValue?: Search, options: {
	getListOnMounted?: boolean
} = {
			getListOnMounted: true
		}) {
	let pageSizeOptions = [10, 15, 20, 30]
	let pageInfo = reactive({
		page: 1,
		limit: pageSizeOptions[0],
	})
	let skip = computed(() => (pageInfo.page - 1) * pageInfo.limit)

	let listInfoDefaultValue = function (): Page<Item> {
		return {
			total: 0,
			list: Array<Item>()
		}
	}


	// let listInfo = ref<Page<Item>>()
	let listInfo = ref<Page<Item>>(listInfoDefaultValue())

	let talbeLoading = ref(false)

	let searchInfoDefaultValue = function (): Search {
		return cloneDeep(searchDefaultValue) as Search
	}
	let searchInfo = ref(searchInfoDefaultValue())

	let cloneSearchInfo = searchInfoDefaultValue()

	function onSearch(limit?: number) {
		cloneSearchInfo = cloneDeep(searchInfo.value) as Search

		pageInfo.limit = limit || pageSizeOptions[0]
		pageInfo.page = 1
		listInfo.value = listInfoDefaultValue() as typeof listInfo.value
		getList()
	}

	async function getList() {
		talbeLoading.value = true
		listInfo.value = await getListApi({
			limit: pageInfo.limit,
			skip: skip.value,
			...cloneSearchInfo
		}).finally(() => {

			console.log(listInfo.value);
			talbeLoading.value = false
		}) as typeof listInfo.value

	}

	function onPageChange(page: number) {
		pageInfo.page = page
		getList()
	}

	function onPageSizeChange(pageSize: number) {
		onSearch(pageSize)
	}

	onMounted(() => {
		if (options?.getListOnMounted) {
			getList()
		}
	})
	console.log(listInfo);


	return {
		listInfo,
		searchInfo,
		pageInfo,
		talbeLoading,
		pageSizeOptions,
		onPageChange,
		onPageSizeChange,
		onSearch,
		getList,
	}

}
