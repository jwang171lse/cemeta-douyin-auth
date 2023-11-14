import sh from 'exec-sh'
import path from 'path'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const args = process.argv.slice(2)
let envName = ''
if (args[0]) envName = args[0].toLowerCase()
if (!envName) {
	throw Error('deploy error: empty envName')
}

let shSync = sh.promise
let localDir = path.resolve(__dirname,'../dist')
let remoteDir = `/www/wwwroot/newproject.dev.cenmetahome.cn`
if (envName == 'production') {
	remoteDir = '/www/wwwroot/newproject.pro.cenmetahome.cn'
}
let shell =   `scp -r ${localDir}/* root@101.42.24.166:${remoteDir}`
shSync(shell).then(resp=>{
    console.log("deploy finished.");
})
