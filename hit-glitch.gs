// 環境変数設定用 コピペ
let setProp =(key, val)=> PropertiesService.getScriptProperties().setProperty(key, val)
let getProp =(key)=> PropertiesService.getScriptProperties().getProperty(key)

const glitchURL = getProp("glitchURL")

function hitGlitch() {
  UrlFetchApp.fetch(glitchURL, {
		'contentType': 'application/json; charset=utf-8',
		'method': 'post',
		'payload': {
			'type': ''
		},
		'muteHttpExceptions': true
	})
}
