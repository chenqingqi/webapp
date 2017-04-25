/**
 * 聊天控制器
 */
module('talk',function()
{
	
	var model   	= reg('model');
	var request 	= reg('request');
	var system  	= reg('system');
	var user    	= JSON.parse(reg('storage').read('user'));
	var ui      	= $('#im');
	var input_panel = $('#input_panel');
	var emotions	= $('#emotions');
	
	var selToID;
	var selType;
	var selSess;
	var selSessHeadUrl;
	var loginInfo;
	var accountMode;
	var avChatRoomId;
	var isAccessFormalEnv;
	var isLogOn;
	var listeners;
	var timer;
	
	listenEvent('READY',ready);
	listenEvent('TALK_DATA_COMPLETE',login_im);
	
	
	function ready(e)
	{
		ui.css('height',($(window).height()-360-90)+'px');
		ui.find('#talk').css('height',($(window).height()-360-90-30)+'px');
		ui.find('#talk').css('overflow-y','auto')
		input_panel.find('#button').css('color',model.school().mainColor);
		
		if(model.talk_status == 0)
		{
			talk_close()
		}
		else
		{
			talk_open();
			
			for(var i in webim.Emotions)
			{
				var img = $('<img id="'+webim.Emotions[i][0]+'" src="'+webim.Emotions[i][1]+'">');
				img.bind('click',icon_click)
				emotions.append(img);
			}
			
			input_panel.find('#button').bind('click',send_button_click)
			input_panel.find('#icon').bind('click',icon_button_click)
			input_panel.find('#user_input').bind('click',input_click)
			$('#photo').find('#close').bind('click',photo_close_click)
		}
		
		ui.show();
		//input_panel.show();
	}
	
	
	/**
	 * 聊天室已关闭
	 */
	function talk_close()
	{
		var close = $('#close');
		close.css('top',($('body').height()-360-160-90)/2+'px');
		close.attr('hidden',false);
		
		input_panel.find('#input').css('opacity','0.2');
		input_panel.find('input').attr('disabled',true);
		input_panel.find('#button').css('color','#333');
	}
	
	
	/**
	 * 聊天室已开启
	 */
	function talk_open()
	{
		request.connect({
	
			debug:1,
			deviceId:'h5',
			liveId:system.getValue('id'),
			mid:user.uid,
			oauth_token:user.oauth_token,
			oauth_token_secret:user.oauth_token_secret
	
		},config.api.chat_room,'post',config.service,function(e)
		{
			if(e.code == 1000)
			{
				model.talk_data(e.data);
			}
			else
			{
				alert(e.msg)
			}
		})
	}
	
	
	
	/**
	 * 5分钟重登录
	 */
	function createReLogin()
	{
		timer = window.setInterval(function(e)
		{
			webim.logout(function(e)
			{
				loginInfo = null;
				
				listeners = null;
				
				login_im(e);
				
			},function()
			{
				alert('重连失败')
			})
			
		},280000)
	}
	
	createReLogin();
	
	
	/**
	 * 重置计时
	 */
	function reTimer()
	{
		window.clearInterval(timer);
		createReLogin()
	}
	
	
	
	/**
	 * 登录聊天室
	 */
	function login_im(e)
	{
		
		/**
		 * 帐号模式，0-表示独立模式，1-表示托管模式
		 */
        accountMode = 1;
        
        /**
         * 默认房间群ID，群类型必须是直播聊天室（AVChatRoom）
         */
        avChatRoomId = model.talk_data().chatRoomId;
        
        /**
         * 会话类型
         */
        selType = webim.SESSION_TYPE.GROUP;
        
        /**
         * 当前选中聊天id（当聊天类型为私聊时，该值为好友帐号，否则为群号）
         */
        selToID = avChatRoomId;
        
        /**
         * 当前聊天会话
         */
        selSess = null;
        
        /**
         * 是否访问正式环境
         */
        isAccessFormalEnv = true;
        
        /**
         * 是否在浏览器控制台打印sdk日志
         */
        isLogOn = true;
        
        /**
         * 默认群组头像(选填)
         */
        selSessHeadUrl = 'img/2017.jpg';
        
        
        /**
		 * 当前用户身份
		 */
        loginInfo = 
        {
            'sdkAppID'      : model.talk_data().sdkAppID, 		//用户所属应用id,必填
            'appIDAt3rd'	: model.talk_data().sdkAppID, 		//用户所属应用id，必填
            'accountType'   : model.talk_data().accountType, 	//用户所属应用帐号类型，必填
            'identifier'    : model.talk_data().identifier, 	//当前用户ID,必须是否字符串类型，必填
            'identifierNick': user.nickname, 					//当前用户昵称，选填
            'userSig'       : model.talk_data().userSig, 		//当前用户身份凭证，必须是字符串类型，必填
            'headurl'       : user.userface						//当前用户默认头像，选填
        }
        
        listeners = 
        {
        	"onConnNotify": onConnNotify,           //监听用户连接状态变化的函数
            "onBigGroupMsgNotify"	: null, 		//监听新消息(大群)事件，必填
            "onMsgNotify"			: onMsgNotify,	//监听新消息(私聊(包括普通消息和全员推送消息)，普通群(非直播聊天室)消息)事件，必填
            "onGroupSystemNotifys"	: null, 		//监听（多终端同步）群系统消息事件，必填
        }
        
        
        webim.login(loginInfo,listeners,null,function(e)
        {
       		//alert('登录IM成功')
       		input_panel.show();
       		
       	},function(e)
       	{
       		alert('登录IM失败'+e.ErrorInfo)
       	});
  	}
	
	
	/**
	 * 连接状态
	 */
	function onConnNotify(resp) 
	{
	    switch (resp.ErrorCode) 
	    {
	        case webim.CONNECTION_STATUS.ON:
	            //webim.Log.warn('连接状态正常...');
	            break;
	            
	        case webim.CONNECTION_STATUS.OFF:
	            //alert('IM连接已断开，是否重连');
	            login_im()
	            break;
	            
	        default:
	        	//alert('IM连接已出错，是否重连')
	        	login_im()
	            break;
	    }
	}
		
	
	/**
	 * 侦听消息
	 */
	function onMsgNotify(data)
	{
		console.log(data)
		
		var user = data[0].fromAccountNick;
		
		var node;
		
		if(data[0].isSend == true)
        {
        	node = $('<div class="right"><p id="nicename">'+user+'</p><div id="content"></div></div>');
        	node.find('#content').css('background-color',model.school().mainColor);
        }
        else
        {
        	node = $('<div class="left"><p id="nicename">'+user+'</p><div id="content"></div></div>');
        }
        
        
		/**
		 * 遍历消息
		 */
		for (var i=0;i<data[0].elems.length;i++) 
	    {
	    	if(data[0].sess._impl.id !== model.talk_data().chatRoomId)
	    	{
	    		return;
	    	}
	    	
	    	/**
	    	 * 文字
	    	 */
	    	if(data[0].elems[i].type == "TIMTextElem")
	    	{
	    		var span = $('<span>'+data[0].elems[i].content.text+'</span>');
	    		
	    		if(data[0].isSend == true)
		        {
		        	span.css('color','#FFF');
		        }
		        else
		        {
		        	span.css('color','#333');
		        }
		        
	    		node.find('#content').append(span);
	    		
	    		console.log(node.find('#content')[0])
	    	}
	    	
	    	/**
	    	 * 表情
	    	 */
	    	if(data[0].elems[i].type== "TIMFaceElem")
	    	{
	    		var img = $('<img src="'+webim.Emotions[data[0].elems[i].content.index][1]+'"/>');
	    		img.css('background-color','rgba(255,255,255,0.6)');
	    		img.css('border-radius','50%');
	    		img.css('margin','0');
	    		img.css('padding','0');
	    		img.width(36);
	    		node.find('#content').append(img);
	    	}
	    	
	    	
	    	/**
	    	 * 图片
	    	 */
	    	if(data[0].elems[i].type== "TIMImageElem")
	    	{
	    		var img = $('<img src="'+data[0].elems[i].content.ImageInfoArray[2].url+'"/>');
	    		img.attr('url',data[0].elems[i].content.ImageInfoArray[0].url)
	    		img.bind('click',img_click)
	    		node.find('#content').append(img);
	    		//alert('收到图片消息')
	    	}
	    }
	    
	    ui.find('#talk').append(node);
	    ui.find('#talk')[0].scrollTop = ui.find('#talk')[0].scrollHeight;
	}
	
	
	/**
	 * 打开表情框
	 */
	function icon_button_click(e)
	{
		
		if(emotions.attr('hidden'))
		{
			emotions.attr('hidden',false);
		}
		else
		{
			emotions.attr('hidden',true);
		}
	}
	
	
	/**
	 * 表情图片被点击
	 */
	function icon_click(e)
	{
		emotions.attr('hidden',true);
		
		if(input_panel.find('#user_input').val() == '说点什么') 
		{
			input_panel.find('#user_input').val('');
		}
		
		input_panel.find('#user_input').val(input_panel.find('#user_input').val()+this.id);
	}
	
	/**
	 * 聊天图片被点击
	 */
	function img_click(e)
	{
		$('#photo').attr('hidden',false);
		$('#photo').find('#content').attr('src',$(this).attr('url'));
		$('#photo').find('#content').css('overflow-y','auto');
	}
	
	/**
	 * 关闭聊天大图
	 */
	function photo_close_click(e)
	{
		$('#photo').attr('hidden',true);
	}
	
	
	/**
	 * 输入框被点击
	 */
	function input_click(e)
	{
		if(input_panel.find('#user_input').val() == '说点什么') input_panel.find('#user_input').val('');
		
		try
		{
			input_panel.scrollIntoView(true);
			
		}catch(e){}
		
		reTimer();
	}
	
	
	/**
	 * 发送消息
	 */
	function send_button_click(e)
	{
		
		if(!selToID)
		{
	        alert("没有正确进入房间，暂不能聊天");
	        return;
	    }
		
		
		/**
		 * 获取消息内容
		 */
	    var msgtosend = input_panel.find('#user_input').val();
	    
	    var msgLen = webim.Tool.getStrBytes();
	
	    if ((msgtosend.replace(/(^\s*)|(\s*$)/g, "")).length < 1) 
	    {
	        alert("发送的消息不能为空!");
	        return;
	    }
	    
	    
	    /**
	     * 字数超限
	     */
	    var maxLen, errInfo;
	    
	    if (selType == webim.SESSION_TYPE.GROUP) 
	    {
	        maxLen = webim.MSG_MAX_LENGTH.GROUP;
	        errInfo = "消息长度超出限制(最多" + Math.round(maxLen / 3) + "汉字)";
	    } 
	    else 
	    {
	        maxLen = webim.MSG_MAX_LENGTH.C2C;
	        errInfo = "消息长度超出限制(最多" + Math.round(maxLen / 3) + "汉字)";
	    }
	    
	    if(msgLen > maxLen) 
	    {
	        alert(errInfo);
	        return;
	    }
	    
	    
	    if (!selSess) 
	    {
        	selSess = new webim.Session(selType, selToID, selToID, selSessHeadUrl, Math.round(new Date().getTime() / 1000));
        }
	    
	    
	    /**
	     * 是否为自己发送
	     */
	    var isSend = true;
	    
	    /**
	     * 消息序列，-1表示sdk自动生成，用于去重
	     */
	    var seq = -1;
	    
	    /**
	     * 消息随机数，用于去重
	     */
	    var random = Math.round(Math.random() * 4294967296);
	    
	    /**
	     * 消息时间戳
	     */
	    var msgTime = Math.round(new Date().getTime() / 1000);
	    
	    /**
	     * 消息类型
	     */
	    var subType;
	    
	    if (selType == webim.SESSION_TYPE.GROUP) 
	    {
	        subType = webim.GROUP_MSG_SUB_TYPE.COMMON;
	
	    } 
	    else 
	    {
	        subType = webim.C2C_MSG_SUB_TYPE.COMMON;
	    }
	    
	    /**
	     * 房间ID
	     */
	    
	    var msg = new webim.Msg(selSess, isSend, seq, random, msgTime, loginInfo.identifier, subType, loginInfo.identifierNick);
	    
	    
	    /**
	     * 解析文本和表情
	     */
	    var expr = /\[[^[\]]{1,3}\]/mg;
	    
	    var emotions = msgtosend.match(expr);
	    
	    var text_obj, face_obj, tmsg, emotionIndex, emotion, restMsgIndex;
	    
	    if (!emotions || emotions.length < 1) 
	    {
	        text_obj = new webim.Msg.Elem.Text(msgtosend);
	        msg.addText(text_obj);
	    } 
	    else 
	    {
			for (var i = 0; i < emotions.length; i++) 
			{
	            tmsg = msgtosend.substring(0, msgtosend.indexOf(emotions[i]));
	            
	            if (tmsg) 
	            {
	                text_obj = new webim.Msg.Elem.Text(tmsg);
	                msg.addText(text_obj);
	            }
	            
	            emotionIndex = webim.EmotionDataIndexs[emotions[i]];
	            emotion = webim.Emotions[emotionIndex];
	            
	            if (emotion) 
	            {
	                face_obj = new webim.Msg.Elem.Face(emotionIndex, emotions[i]);
	                msg.addFace(face_obj);
	            } 
	            else 
	            {
	                text_obj = new webim.Msg.Elem.Text(emotions[i]);
	                msg.addText(text_obj);
	            }
	            restMsgIndex = msgtosend.indexOf(emotions[i]) + emotions[i].length;
	            msgtosend = msgtosend.substring(restMsgIndex);
	        }
			
	        if (msgtosend) 
	        {
	            text_obj = new webim.Msg.Elem.Text(msgtosend);
	            msg.addText(text_obj);
	        }
	    }
	    
	    webim.sendMsg(msg,function(e)
	    {
	    	console.log('发消息成功')
	    	
	    },function(e)
	    {
	    	alert("发消息失败,请重新发送")}
	    )
	    
	    input_panel.find('#user_input').val('')
	}
	
	
	window.addEventListener('orientationchange',onOrientationchange);
	
	function onOrientationchange(e)
	{
		
		if(orientation == 90 || orientation == -90)
		{
			ui.hide();
			input_panel.hide();
			emotions.attr('hidden','true');
			
			window.addEventListener('click',requestFullScreen)
		}
		else
		{
			window.removeEventListener('click',requestFullScreen)
			exitFullscreen()
        
			ui.show();
			input_panel.show();
		}
	}
	
	
	/**
     * 进入全屏
     */
    function requestFullScreen() 
    {
        var de = document.documentElement;
        if(de.requestFullscreen) 
        {
            de.requestFullscreen();
        } 
        else if(de.mozRequestFullScreen) 
        {
            de.mozRequestFullScreen();
        } 
        else if(de.webkitRequestFullScreen) 
        {
            de.webkitRequestFullScreen();
        }
    }

    /**
     * 退出全屏
     */
    function exitFullscreen()
    {
        var de = document;

        if (de.exitFullscreen) 
        {
            de.exitFullscreen();
        } 
        else if (de.mozCancelFullScreen) 
        {
            de.mozCancelFullScreen();
        } 
        else if (de.webkitCancelFullScreen) 
        {
            de.webkitCancelFullScreen();
        }
    }
	
})