import App from './App'

// #ifdef VUE3
import { createSSRApp } from 'vue'

export function createApp() {
	const app = createSSRApp(App);
	app.config.globalProperties.$userData = {
		"userInfo": {},
		"openId": '',
		"sessionKey": '',
		"unionId": '',
	"avatarUrl": '',
	"nickName": ''
	} ;
	return {
		app
	}
}

// #endif