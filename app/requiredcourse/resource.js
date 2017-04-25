/**
 * 配置类库
 */
config({
		'jquery' 	:'/core/utils/jquery',
		'storage'   :'/core/utils/storage',
		'request'   :'/core/utils/request',
		'configure' :'/module/configure',
		'iscroll'   :'/module/scroll/iscroll',
		'model'     :'/app/requiredcourse/src/model',
		'control'   :'/app/requiredcourse/src/control',
		'view'      :'/app/requiredcourse/src/view'
		 },

function main()
{

	reg('required_model','required_control','required_view')
	
})