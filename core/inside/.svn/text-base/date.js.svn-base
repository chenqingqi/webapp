
/**
 * 标准时间格式化(2016-08-06 12:06:08)
 */
Date.prototype.format = function()
{
	  
    var year 		= this.getFullYear();   
    var month 		= this.getMonth()+1;   
    var date 		= this.getDate();   
    var day 		= this.getDay();   
    var hours 		= this.getHours();   
    var minutes 	= this.getMinutes();   
    var seconds 	= this.getSeconds();   
    var ms 			= this.getMilliseconds();     
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
	    
	    return curDateTime;
	}
