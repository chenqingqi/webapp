/**
 * String扩展
 */
define(function()
{
	
	/**
	 * 是否是手机号码
	 */
	String.prototype.isMobileNumber = function()
	{
		var reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
		return reg.test(this);
	}
	
	/**
	 * 是否是邮箱
	 */
	String.prototype.isMail = function()
	{
		var reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
		return reg.test(this);
	}
})