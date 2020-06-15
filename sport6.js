//obj  操作的对象
//json  对象中存放多个attr和target
//callback  代表一个函数  就是回调函数
//加入透明度的操作
function startMove(obj,json,callback){//300w   400h
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var flag = true;//假设值为true时  停止定时器
		for( var attr in json ){//同时改变多个样式值  attr就是操作的属性
			var current = 0;
			//得到当前操作对象的实际样式值
			if( attr == "opacity" ){
				current = parseFloat(getStyle(obj,attr))*100;
			}else if( attr == "zIndex" ){
				current = parseInt(getStyle(obj,attr));
			}else{
				current = parseInt(getStyle(obj,attr));
			}
			//速度获取
			var speed = (json[attr]-current)/10;
			speed = speed>0 ? Math.ceil(speed) : Math.floor(speed);
			if( json[attr] != current ){
				//改变开关变量的值
				flag = false;
			}
			
			//设置样式
			if( attr == "opacity" ){
				obj.style["opacity"] = (current + speed)/100;
			}else if( attr == "zIndex" ){
				obj.style["zIndex"] = json[attr];
			}else{
				obj.style[attr] = current + speed +"px";
			}
		}
		
		//当循环结束后  如果flag值还是true  让定时器停下来
		if( flag ){
			clearInterval(obj.timer);//上一个动作结束  
			//进入下一个动作   函数调用
			//如果没有传递函数  说明所有动作结束了  
			if( callback ){
				callback();
			}
		}
	},30)
}
 
//获取非行内元素样式值  
function getStyle(obj,attr){
	if( window.getComputedStyle ){
		return window.getComputedStyle(obj,false)[attr];
	}else{
		return obj.currentStyle[attr];
	}
}