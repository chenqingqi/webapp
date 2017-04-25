/**
 * 配置类库
 */
config({
		'jquery' 	:'/core/utils/jquery',
		 'storage'	:'/core/utils/storage',
		 'system'	:'/core/utils/system',
		 'request'	:'/core/utils/request',
		 'toner'  	:'/core/utils/toner',
		 'configure':'/module/configure',
		 'tip'		:'/module/tip/tip',
		 'model'	:'/app/login/src/model',
		 'control'	:'/app/login/src/control',
		 'view'		:'/app/login/src/view',
		 'titlebar'	:'/app/login/src/views/titlebar',
		 'username'	:'/app/login/src/views/username',
		 'password'	:'/app/login/src/views/password',
         'typebtn'	:'/app/login/src/views/typebtn',
		 'loginbtn'	:'/app/login/src/views/loginbtn'},

function main()
{
	reg('model','control','view')
})
