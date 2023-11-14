import { apiGetOssSts } from '@/api/cos';
import COS from 'cos-js-sdk-v5'


let cos = new COS({
	getAuthorization: async function (_options, callback) {
		let sts = await apiGetOssSts()
		callback({
			TmpSecretId: sts.credentials.tmpSecretId,
			TmpSecretKey: sts.credentials.tmpSecretKey,
			XCosSecurityToken: sts.credentials.sessionToken,
			StartTime: sts.startTime, // 时间戳，单位秒，如：1580000000，建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
			ExpiredTime: sts.expiredTime, // 时间戳，单位秒，如：1580000900
		});
	}
})


export {
	cos as OSS
}
