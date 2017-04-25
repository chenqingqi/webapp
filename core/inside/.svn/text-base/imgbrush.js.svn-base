define(function() {

	/**
	 * 替换图片像素
	 */
	function Imgbrush()
	{
		var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
		
		/*
		 * 获取Dom中的图片
		 */
		function getImgDom(ref) 
		{
			if(ref.nodeName == "IMG") 
			{
				return ref;
			}
			
			var bg = window.getComputedStyle(ref, null).backgroundImage;
			if(bg) 
			{
				var img = new Image();
				img.src = bg.replace(/['"]/g, '').slice(4, -1);
				return img;
			}
			return false;
		}
		
		/*
		 *
		 * 通过Canvas修改并返回图片像素
		 */
		function initCanvas(c, img) 
		{
			c.clearRect(0, 0, c.width, c.height);
			if(img.width > 0 && img.height > 0) 
			{
				try 
				{
					c.drawImage(img, 0, 0, img.width, img.height);
					return (c.getImageData(0, 0, c.width, c.height));
	
				}catch(err){}
			}
		}
		
		
		/**
		 * 16进制颜色转为RGB颜色值
		 */
		function colorRgb(color) 
		{
			var sColor = color.toLowerCase();
			
			if(sColor && reg.test(sColor)) 
			{
				if (sColor.length === 4) 
				{
					var sColorNew = "#";
					for(var i = 1; i < 4; i += 1) 
					{
						sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
					}
					sColor = sColorNew;
				}
				
				//处理六位的颜色值
				var sColorChange = [];
				for(var i = 1; i < 7; i += 2) 
				{
					sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
				}
				
				//return "RGB(" + sColorChange.join(",") + ")";
				return sColorChange;
				
			} 
			else 
			{
				return sColor;
			}
		}
		
		/**
		 * 重写GRB图像
		 */
		function resetRGB(data, index, r, g, b) 
		{
			data[index] = r;
			data[index + 1] = g;
			data[index + 2] = b;
			return data;
		}
		
		/**
		 * 重置图片颜色
		 */
		function placeReferenceImage(ref, result, img) 
		{
			if (ref.nodeName == "IMG") 
			{
				img.src = result;
			} 
			else
			{
				ref.style.backgroundImage = "url(" + result + ")";
			}
		}
		
		/*
		 * 绘制图片背景色
		 * @dom：要操作的Dom对象
		 * @oldColor：之前颜色
		 * @newColor：替换后的颜色
		 */
		function BrushBgColor(dom, oldColor, newColor) 
		{
			var img = getImgDom(dom);
			var buffer = document.createElement("canvas");
			var c = buffer.getContext('2d');
			img.onLoad = processImage(dom, img, buffer, c, oldColor, newColor);
		}
		
		
		/**
		 * 图片处理
		 */
		function processImage(dom, img, buffer, c, oldColor, newColor) 
		{
			var result = resetColor(img, buffer, c, oldColor, newColor);
			placeReferenceImage(dom, result, img);
		}
		
		/*
		 * 重置颜色
		 */
		self.resetColor = function(img,buffer,c,oldColor, newColor)
		{
			var result = '';
			c.width = buffer.width = img.width;
			c.height = buffer.height = img.height;
	
			if (img && c) 
			{
				var pixels = initCanvas(c, img);
				var oldColor = colorRgb(oldColor);
				var newColor = colorRgb(newColor);
	
				for(var i = 0, data = pixels.data, length = data.length; i < length >> 2; i++) 
				{
					var index = i << 2;
					
					//取相近值
					if ((data[index] < oldColor[0] + 10 && data[index] > oldColor[0] - 10) &&(data[index + 1] < oldColor[1] + 10 && data[index + 1] > oldColor[1] - 10) && (data[index + 2] < oldColor[2] + 10 && data[index + 2] > oldColor[2] - 10)) 
					{
						data = resetRGB(data, index, newColor[0], newColor[1], newColor[2]);
					}
				}
				c.putImageData(pixels, 0, 0);
				result = buffer.toDataURL("image/png");
			}
			
			return result;
		}
		
		/*
		 * 根据图片路径重置图片颜色
		 */
		self.resetColorByPath = function(img_src,oldColor,newColor,callback)
		{
			var buffer = document.createElement("canvas");
			var c = buffer.getContext('2d');
			
			var img = new Image();
			img.src =img_src;
			img.onload = function()
			{
			 	var result = resetColor(img, buffer, c, oldColor, newColor);
			 	if(callback)
			 	{
			 		callback(result);
			 	}
			}
		}
	}
	
	return Imgbrush;

});