import base64 from 'base64-encode-file'


export async function file2base64(file: File) {
	return (await base64(file) as string).split(',')[1]
}
