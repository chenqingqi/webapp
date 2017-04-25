/**
 * 配置类库
 */
config({
		'jquery' 	:'/core/utils/jquery',
		'storage'   :'/core/utils/storage',
		'request'   :'/core/utils/request',
		'configure' :'/module/configure',
		'iscroll'   :'/module/scroll/iscroll',
		'model'     :'/app/secondlevel/curriculum/resource/src/model',
		'control'     :'/app/secondlevel/curriculum/resource/src/control',
		'view'      :'/app/secondlevel/curriculum/resource/src/view'
		 },

function main()
{

	reg('resource_model','resource_control','resource_view')
	
})