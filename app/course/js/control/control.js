/**
 * 主控制器
 */
module('control',function()
{
	listenEvent('READY',function(){
		
		reg('player','intro','classes','tab','chapter','add_class','live');
		
	})
})