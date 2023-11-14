<template>
	<div class="page-test">
		<input type="file" @input="onInput" />
	</div>
</template>
<script setup lang="ts">
import { OSS } from '@/util/oss'

function onInput(evt: Event) {
	let input = evt.target as HTMLInputElement
	let file = input?.files?.[0]
	if (file) {
		OSS.putObject({
			Body: file,
			Bucket: 'web-1313090634',
			Region: 'ap-beijing',
			Key: file.name,
		}).then(resp => {
			console.log('upload result:', resp)
		})
	}
}
</script>
<style scoped lang="scss">
.page-test {
}
</style>
