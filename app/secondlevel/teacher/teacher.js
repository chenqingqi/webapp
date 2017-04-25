/**
 * 配置类库
 */
config({
		'jquery' 	:'/core/utils/jquery',
		'storage'   :'/core/utils/storage',
		'request'   :'/core/utils/request',
		'configure' :'/module/configure',
		'iscroll'   :'/module/scroll/iscroll',
		'model'     :'/app/secondlevel/teacher/src/model',
		'control'   :'/app/secondlevel/teacher/src/control',
		'view'      :'/app/secondlevel/teacher/src/view'
		 },

function main()
{

	reg('teacher_model','teacher_control','teacher_view')
	
})