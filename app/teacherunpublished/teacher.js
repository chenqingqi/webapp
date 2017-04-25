/**
 * 配置类库
 */
config({
		'jquery' 	:'/core/utils/jquery',
		'storage'   :'/core/utils/storage',
		'request'   :'/core/utils/request',
		'configure' :'/module/configure',
		'iscroll'   :'/module/scroll/iscroll',
		'model'     :'/app/teacherunpublished/src/model',
		'control'   :'/app/teacherunpublished/src/control',
		'view'      :'/app/teacherunpublished/src/view'
		 },

function main()
{

	reg('teacherunpublished_model','teacherunpublished_control','teacherunpublished_view')
	
})