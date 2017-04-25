/**
 * 主视图
 */
app.view('search_view',function()
{
	var model = app.reg('search_model');
	var control = app.reg('search_control');
	
	
	var ui;
	
	listenEvent('READY',onReady);
	
	function onReady(e)
	{   	
		ui = $('#bar_title_search').attr('hidden',false);
	     $('#back').bind('click',onBack);
//	    $('#type').bind('click',selectshow);
//	    $('#course').bind('click',selectCourse);
//	    $('#class').bind('click',selectClass);
	    $('#search_btn').bind('click',search);
	    style(model.school().mainColor);
	    
	    listenEvent('searchcurserready',searchcurserlist);
	    listenEvent('searchclassready',searchclasslist);
	    
        
	}
 /*
 * 点击搜索课程和班级
 */		
    function search(){
    	var type1= $("#type").text();
    	var values= $("#searchKey").val();
    	var classx;
    	if(type1=='课程'){
    		control.search_listcurser(values);
    	}else{
    		control.search_listclass(values);
    	}
    	
    }
 /*
 * 课程和班级的下拉框显示（目前暂时不需要）
 */	   
	function selectshow(){
		  $("#drop_down_list").toggle();
	}
/*
 * 选择班级（目前暂时不需要）
 */		
	function selectClass(){
		  $("#drop_down_list").toggle();
		  var selects=$('#class').text();
		  $("#type").text(selects);
		  
	}
/*
 * 选择课程（目前暂时不需要）
 */	
	function selectCourse(){
		  $("#drop_down_list").toggle();
		  var selects=$('#course').text();
		  $("#type").text(selects);
		  
	}
/*
 * 搜索课程
 */
	function searchcurserlist(){
		
		var datesearch=model.searchcurser().data;
		if(datesearch.length>0){
			    var temp = $('#item_course_full')[0].outerHTML;
		        $('#item_course_full').remove();
			    $('#panel_empty').attr('hidden',true);
			for(var i=0;i<datesearch.length;i++){
				var uisearchui = $(temp).attr('hidden',false);
				if(datesearch[i].pic==''){
					datesearch[i].pic='/resource/course_photo.jpg';
				}else{
					uisearchui.find('img').attr('src',datesearch[i].pic);
				}
				if(datesearch[i].price=='0'){
					uisearchui.find('#price').text('免费');
					uisearchui.find('#price').css('color','green');
				}else{
					uisearchui.find('#price').text('￥'+datesearch[i].price);
				}
				uisearchui.find('#title').text(datesearch[i].title);
				uisearchui.find('#hour').text(datesearch[i].timeLength+'课时');
				$('#wrapper').append(uisearchui);
			}	
		}else{
			     var temp = $('#item_course_full')[0].outerHTML;
		         $('#wrapper')[0].innerHTML="";
		         $('#wrapper').append(temp);
		         $('#item_course_full').attr('hidden',true);
				 $('#panel_empty').find('p').text('没有搜索到课程信息');
				 $('#panel_empty').attr('hidden',false);
			}
    }
	
/*
 * 搜索班级（目前暂时不需要）
 */

	function searchclasslist(){
		$('#wrapper')[0].innerHTML="";
		var dateclass=model.searchclass().data;
        
		if(dateclass.length>0){
			
		     var temp = $('#item_class')[0].outerHTML;
		     $('#item_class').remove();
			     
			for(var i=0;i<dateclass.length;i++){
				
				var classui = $(temp).attr('hidden',false);
				if(dateclass[i].logo==''){
					dateclass[i].logo='/resource/course_photo.jpg';
				}
				classui.find('img').attr('src',dateclass[i].logo);
				classui.find('#title').text(dateclass[i].title);
				classui.find('#create_name').text(dateclass[i].createName);
				classui.find('#memberNum').text(dateclass[i].memberNum);
				$('#wrapper').append(classui);
			}	
			
		}else{
			
				 $('#panel_empty').find('p').text('没有搜索到班级信息');
				 $('#panel_empty').attr('hidden',true);
			}
    }
	function onBack(e)
	{
		history.back();
	}
/*
 * 修改导航条的背景颜色
 */
	
	function style(bgcolor)
	{
			ui.css('background-color',bgcolor)	
	}
	
	return{
		
		ui:ui,
		style:style
	}


})