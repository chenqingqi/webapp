/**
 * 配置类库
 */
config({
		'jquery' 	:'/core/utils/jquery',
		'storage'   :'/core/utils/storage',
		'request'   :'/core/utils/request',
		'configure' :'/module/configure',
		'iscroll'   :'/module/scroll/iscroll',
		'model'     :'/app/search/src/model',
		'control'   :'/app/search/src/control',
		'view'      :'/app/search/src/view'
		 },

function main()
{

	reg('search_homemodel','search_homecontrol','search_homeview')
	
})