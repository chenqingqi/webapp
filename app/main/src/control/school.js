/**
 * 院系
 */
module('school',function()
{
	
	var ui = $('#school');
	
	var model = reg('model');
	
	var request = reg('request');
	
	var storage = reg('storage');
	
	var user_data = JSON.parse(storage.read('user'));
	
	var loading = get('loading')();
	
	
	function main()
	{
		ui.append(loading.ui);
		loading.show((640-90)/2,($(window).height()-250)/2)
		
		request.connect({

			debug:1,
			deviceId:'h5'
		
		},config.api.school_tree,'get',config.service,function(e)
		{
			if(e.code == 1000)
			{
				model.school_tree(e.data);
			}
			
			if(e.code == 2001)
			{
				location.href = config.route.login;
			}
			
			console.log(e.code)
		});
		
		listenEvent('SCHOOLTREE_COMPLETE',school_complete)
	}
	
	
	
	function school_complete(e)
	{
		
		loading.ui.remove();
		
		ui.find('#search').attr('hidden',false)
		
		var data = model.school_tree();
		
		var tree_html = $('#tree')[0].outerHTML;
		
		for(var i=0;i<data.length;i++)
		{
			
			var tree = $(tree_html).attr('hidden',false);
			var tree_content = tree.find('#tree_content');
			tree.find('#tree_txt').text(data[i].name);
			
			if(data[i].iconUrl && data[i].iconUrl !=="")
			{
				tree.find('#tree_icon').css('background-image','url('+data[i].iconUrl+')');
			}
			
			if(data[i].children.length==0)
			{
				tree.find('#tree_arrow').css('background-image','none');
				tree.find('#tree_link').attr('href',config.route.courselist+'?id='+data[i].id)
			}
			else
			{
				tree.bind('click',function(e)
				{
					if($(this).attr('status')==0)
					{
						$(this).find('#tree_arrow').css('background-image','url(/resource/arrow_rotate.png)');
						$(this).attr('status','1');
						$(this).find('#tree_content').attr('hidden',false);
					}
					else
					{
						if(e.target.parentNode.id == 'tree_title')
						{
							$(this).find('#tree_arrow').css('background-image','url(/resource/arrow_right.png)');
							$(this).attr('status','0');
							$(this).find('#tree_content').attr('hidden',true);
						}
					}
				});
			}
			
			
			var trunk_html = $('#trunk')[0].outerHTML;
			
			for(var k=0;k<data[i].children.length;k++)
			{
				var trunk = $(trunk_html).attr('hidden',false);
				var trunk_content = trunk.find('#trunk_content');
				trunk.find('#trunk_txt').text(data[i].children[k].name);
				
				if(data[i].children[k].children.length == 0)
				{
					trunk.find('#trunk_arrow').css('background-image','none');
					trunk.find('#trunk_link').attr('href',config.route.courselist+'?id='+data[i].children[k].id)
				}
				else
				{
					trunk.find('#trunk_arrow').css('background-image','url(/resource/add.png)');
					
					trunk.bind('click',function(e)
					{
						if($(this).attr('status')==0)
						{
							$(this).find('#trunk_arrow').css('background-image','url(/resource/minus.png)');
							$(this).attr('status','1');
							$(this).find('#trunk_content').attr('hidden',false);
						}
						else
						{
							if(e.target.parentNode.id == 'trunk_title')
							{
								$(this).find('#trunk_arrow').css('background-image','url(/resource/add.png)');
								$(this).attr('status','0');
								$(this).find('#trunk_content').attr('hidden',true);
							}
						}
					})
				}
				
				var leaves_html = $('#leaves')[0].outerHTML;
			
				for(var t=0;t<data[i].children[k].children.length;t++)
				{
					var leaves = $(leaves_html).attr('hidden',false);
					leaves.find('#txt').text(data[i].children[k].children[t].name);
					leaves.attr('href',config.route.courselist+'?id='+data[i].children[k].children[t].id)
					
					trunk_content.append(leaves)
				}
				
				if(data[i].children[k].children.length>0)
				{
					trunk.find('#trunk_link').removeAttr('href')
				}
				
				tree_content.append(trunk)
			}
			
			ui.append(tree)
		}
		
		ui.append('<p style="height:15px"></p>')
	}
	
	main()
})
