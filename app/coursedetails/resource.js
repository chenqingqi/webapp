/**
 * 配置类库
 */
config({
		'jquery' 	:'/core/utils/jquery',
		'storage'   :'/core/utils/storage',
		'request'   :'/core/utils/request',
		'system'    :'/core/utils/system',
		'configure' :'/module/configure',
		'iscroll'   :'/module/scroll/iscroll',
		'model'     :'/app/coursedetails/src/model',
		'control'   :'/app/coursedetails/src/control',
		'view'      :'/app/coursedetails/src/view'
		 },

function main()
{
	reg('coursedetails_model','coursedetails_control','coursedetails_view')
	
})