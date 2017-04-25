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
		'model'     :'/app/releasecourse/src/model',
		'control'   :'/app/releasecourse/src/control',
		'view'      :'/app/releasecourse/src/view'
		 },

function main()
{
	reg('releasecourse_model','releasecourse_control','releasecourse_view')
	
})