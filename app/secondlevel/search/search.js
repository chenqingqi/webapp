/**
 * 配置类库
 */
config({
		'jquery' 	:'/core/utils/jquery',
		'storage'   :'/core/utils/storage',
		'request'   :'/core/utils/request',
		'configure' :'/module/configure',
		'iscroll'   :'/module/scroll/iscroll',
		'model'     :'/app/secondlevel/search/src/model',
		'control'   :'/app/secondlevel/search/src/control',
		'view'      :'/app/secondlevel/search/src/view'
		 },

function main()
{

	reg('search_homemodel','search_homecontrol','search_homeview')
	
})