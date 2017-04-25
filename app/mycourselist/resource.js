/**
 * 配置类库
 */
config({
		'jquery' 	:'/core/utils/jquery',
		'storage'   :'/core/utils/storage',
		'request'   :'/core/utils/request',
		'configure' :'/module/configure',
		'iscroll'   :'/module/scroll/iscroll',
		'model'     :'/app/mycourselist/src/model',
		'control'   :'/app/mycourselist/src/control',
		'view'      :'/app/mycourselist/src/view'
		 },

function main()
{

	reg('mycourselist_model','mycourselist_control','mycourselist_view')
	
})