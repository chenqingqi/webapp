/**
 * 配置类库
 */
config({
		'jquery' 	:'/core/utils/jquery',
		'storage'   :'/core/utils/storage',
		'request'   :'/core/utils/request',
		'configure' :'/module/configure',
		'iscroll'   :'/module/scroll/iscroll',
		'model'     :'/app/secondlevel/curriculum/thisschool/search/src/model',
		'control'   :'/app/secondlevel/curriculum/thisschool/search/src/control',
		'view'      :'/app/secondlevel/curriculum/thisschool/search/src/view'
		 },

function main()
{

	reg('search_model','search_control','search_view')
	
})