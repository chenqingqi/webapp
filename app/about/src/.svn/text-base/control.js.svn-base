/**
 * 主控制器
 */
module('about_control',function()
{
	var model = reg('about_model');
	var mid='2190';
	var oauth_token='0a87257e5308197df43230edf4ad1dae';
	var oauth_token_secret='bdb2c2cbb8a6620abb46277119f3cd6b';
	reg('configure').start(complete);
	var storage = reg('storage');
	var request = reg('request');
	
	
		function complete()
		{   
			model.school(JSON.parse(storage.read(config.code)));
		}
		/**
		* 获取学校机构信息
		*/
		function getAboutlist()
		{
			loding();
			request.connect({
				debug:1,
				deviceId:'h5',
				webCode:'user1',
				mid:mid,
				oauth_token:oauth_token,
				oauth_token_secret:oauth_token_secret
			},config.api.school,'get',config.service,setresourcelist)
			
		}
		
		function setresourcelist(e)
		{
			alert(config.qrcode(config.code));
	       if(e.code==1000){
				model.setabout(e);
				Removeloding();
			}else{
				Removeloding();	
			}

		}
		
		function loding(){
		   $('body').append('<div id="noClick"><img id="loding" src="/resource/loading.gif"/></div>'); 
	    }
		
	   function Removeloding(){
		$('#noClick')[0].outerHTML='';
	    }
	  
		
})