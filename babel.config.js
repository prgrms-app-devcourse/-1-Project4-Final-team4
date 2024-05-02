module.exports = {
	presets: ['module:metro-react-native-babel-preset'],
	plugins: [
		// react-native-dotenv 
		[
			'module:react-native-dotenv',
			// Development 환경 파일 설정
			{
				"envName": "APP_ENV",
				"moduleName": "@env",
				"path": ".env.local",
				"blocklist": null,
				"allowlist": null,
				"blacklist": null, // DEPRECATED
				"whitelist": null, // DEPRECATED
				"safe": false,
				"allowUndefined": true,
			},
			'react-native-dotenv-1', // 고유한 이름 부여
		],
	]
}