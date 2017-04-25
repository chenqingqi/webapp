//Date原型扩展

/**
 * 标准时间格式化(2016-08-06 12:06:08)
 */
Date.prototype.format = function(d)
{
	  
    var year 		= d.getFullYear();   
    var month 		= d.getMonth()+1;   
    var date 		= d.getDate();   
    var day 		= d.getDay();   
    var hours 		= d.getHours();   
    var minutes 	= d.getMinutes();   
    var seconds 	= d.getSeconds();   
    var ms 			= d.getMilliseconds();     
    var curDateTime	= year; 
    
    if(month>9)
    {
    	curDateTime = curDateTime +"-"+month; 
    }
    else 
    {
    	curDateTime = curDateTime +"-0"+month;  
    }
    
    if(date>9) 
    {
    	curDateTime = curDateTime +"-"+date; 
    }
    else
    {
    	curDateTime = curDateTime +"-0"+date; 
    } 
     
    if(hours>9)
    {
    	curDateTime = curDateTime +" "+hours;
    }
    else
    {
    	curDateTime = curDateTime +" 0"+hours; 
    }
      
    if(minutes>9)
    {
    	curDateTime = curDateTime +":"+minutes; 
    }
    else
    {
    	curDateTime = curDateTime +":0"+minutes;
    }
      
    if(seconds>9) 
    {
    	curDateTime = curDateTime +":"+seconds;
    }
    else
    {
    	curDateTime = curDateTime +":0"+seconds; 
    }
}