/**
 * @description 工具拓展函数
 * @description 搜集与网络 http://www.cnblogs.com/kissdodog/p/3386480.html
 * @version v0.1 2014.11.17 14:30
 * @author kong.qf
 */


/**
 * @description 检测对象是否为空
 */
/*Object.prototype.isNullOrEmpty = function() {
	var obj = this;
	var flag = false;
	if (obj == null || obj == undefined || typeof(obj) == 'undefined' || obj == '') {
		flag = true;
	} else if (typeof(obj) == 'string') {
		obj = obj.trim();
		if (obj == '') { //为空  
			flag = true;
		} else { //不为空  
			obj = obj.toUpperCase();
			if (obj == 'NULL' || obj == 'UNDEFINED' || obj == '{}') {
				flag = true;
			}
		}
	} else {
		flag = false;
	}
	return flag;
};
*/

/**  
 * @description Unicode还原
 */
Number.prototype.chrW = function() {
	return String.fromCharCode(this);
};
/**
 * @description 数字补零,将数字补齐长度后返回(前端加0)
 */
Number.prototype.lenWithZero = function(oCount) {
	var strText = this.toString();
	while (strText.length < oCount) {
		strText = '0' + strText;
	}
	return strText;
};


/**
 * @description 格式化字符串
 */
String.prototype.format = function() {
	if (arguments.length == 0) return this;
	//if (arguments.length == 1) return arguments[0];
	var args = arguments[0];
	return Object.prototype.toString.call(arguments[0]) === '[object Array]' ? this.replace(/{(\d+)?}/gm, function(match, name) {
		return args[~~name];
	}) : this.replace(/{([^{}]+)}/gm, function(match, name) {
		return args[name];
	});
};
/** 
 * @description 获取字符串中的数字(按原顺序)
 */
String.prototype.getNum = function() {
	return this.replace(/[^\d]/g, '');
};
/**  
 * @description 获取文件名全名
 */
String.prototype.getFileName = function() {
	return this.replace(/^.*\/([^\/\?]*).*$/, '$1');
};
/**
 * @description 获取文件扩展名
 */
String.prototype.getExtensionFileName = function() {
	return this.replace(/^.*\/[^\/]*(\.[^\.\?]*).*$/, '$1');
};
/**
 * 用正则表达式清除相同的数组(高效率)
 */
String.prototype.unique = function() {
		var x = this.split(/[\r\n]+/);
		var y = '';
		for (var i = 0; i < x.length; i++) {
			if (!new RegExp("^" + x[i].replace(/([^\w])/ig, "\\$1") + "$", "igm").test(y)) {
				y += x[i] + "\r\n"
			}
		}
		return y
	}
	/**
	 * 清除空格
	 */
String.prototype.trim = function() {
		var reExtraSpace = /^\s*(.*?)\s+$/;
		return this.replace(reExtraSpace, "$1")
	}
	/**
	 * 全部替换
	 * @param {Object} s1 正则表达式，需要替换的字符
	 * @param {Object} s2 替换成字符
	 */
String.prototype.replaceAll = function(s1, s2) {
		return this.replace(new RegExp(s1, "gm"), s2)
	}
	/**
	 * 转义html标签
	 * @param {Object} text 需要转移的字符串
	 */
String.prototype.HtmlEncode = function(text) {
		text = text || this;
		return text.replace(/&/g, '&').replace(/\"/g, '"').replace(/</g, '<').replace(/>/g, '>')
	}
	/**
	 * 还原html标签
	 * @param {Object} text 需要还原的字符串
	 */
String.prototype.HtmlDecode = function(text) {
		text = text || this;
		return text.replace(/&/g, '&').replace(/"/g, '\"').replace(/</g, '<').replace(/>/g, '>')
	}
	/**
	 * 字符串反序
	 */

String.prototype.reverse = function() {
		return this.split('').reverse().join('');
	},
	/**
	 * 判断是否为数字类型
	 * @param {Object} value
	 */

	function isDigit(value) {
		var patrn = /^[0-9]*$/;
		if (patrn.exec(value) == null || value == "") {
			return false
		} else {
			return true
		}
	}
	/**
	 * @description 拓展Date操作,格式化时间
	 * @param format 格式化字符串，如:'yyyy-MM-dd hh:mm:ss:S'或'E'
	 */
Date.prototype.format = function(format) {
	var o = {
		'M+': this.getMonth() + 1, // Month
		'd+': this.getDate(), // day
		'h+': this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时 
		'a+': this.getHours() > 12 ? 'PM' : 'AM', //上午/下午
		'A+': this.getHours() > 12 ? '下午' : '上午', //上午/下午
		'H+': this.getHours(), //小时 
		'm+': this.getMinutes(), // minute
		's+': this.getSeconds(), // second
		'q+': Math.floor((this.getMonth() + 3) / 3), // quarter
		'S+': this.getMilliseconds() // millisecond
	}
	var week = {
		"0": "\u65e5",
		"1": "\u4e00",
		"2": "\u4e8c",
		"3": "\u4e09",
		"4": "\u56db",
		"5": "\u4e94",
		"6": "\u516d"
	};
	if (/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
	}
	if (/(E+)/.test(format)) {
		format = format.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "\u661f\u671f" : "\u5468") : "") + week[this.getDay() + ""]);
	}
	for (var k in o) {
		if (new RegExp('(' + k + ')').test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.langth == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
		}
	}
	return format;
};
/**
 * @description 获取当前时间的中文形式
 * @param format 格式化字符串
 */
Date.prototype.getCNDate = function(format) {
	var o = {
		'M+': this.getMonth().lenWithZero(2) + new Number(26376).chrW(), // Month
		'd+': this.getDate().lenWithZero(2) + new Number(26085).chrW(), // day
		'h+': this.getHours().lenWithZero(2) + new Number(26102).chrW(), //小时           
		'H+': this.getHours().lenWithZero(2) + new Number(26102).chrW(), //小时 
		'm+': this.getMinutes().lenWithZero(2) + new Number(20998).chrW(), // minute
		's+': this.getSeconds().lenWithZero(2) + new Number(31186).chrW(), // second
		'q+': new Number(32).chrW() + new Number(32).chrW() + new Number(26143).chrW() + new Number(26399).chrW() + new String('26085199682010819977222352011620845').substr(this.getDay() * 5, 5).ToInt().chrW() // quarter
	}
	if (/(y+)/.test(format)) {
		var y = this.getFullYear().lenWithZero(4) + new Number(24180).chrW();
		format = format.replace(RegExp.$1, (y + ''));
	}
	for (var k in o) {
		if (new RegExp('(' + k + ')').test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.langth == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
		}
	}
	return format;
};
/**
 * @description 校验时间与当前系统时间的时间差
 * @param datetime 需要校验的时间
 * @param interval 校验格式,默认为d
 */
Date.prototype.Diff = function(datetime, interval) {
	//若参数不足或 datetime 不是日期类型則回传 undefined  
	if (!datetime || datetime.constructor != Date) return undefined;

	interval = interval || 'd';
	switch (interval) {
		//计算秒差                                                          
		case 's':
			return parseInt((datetime - this) / 1000);
			//计算分差  
		case 'n':
			return parseInt((datetime - this) / 60000);
			//计算時差  
		case 'h':
			return parseInt((datetime - this) / 3600000);
			//计算日差  
		case 'd':
			return parseInt((datetime - this) / 86400000);
			//计算周差  
		case 'w':
			return parseInt((datetime - this) / (86400000 * 7));
			//计算月差  
		case 'm':
			return (datetime.getMonth() + 1) + ((datetime.getFullYear() - this.getFullYear()) * 12) - (this.getMonth() + 1);
			//计算年差  
		case 'y':
			return datetime.getFullYear() - this.getFullYear();
			//输入有误  
		default:
			return undefined;
	}
};
/**
 * @description 增减天数后返回时间对象
 * @param days 天数数量，可以为正负整数
 */
Date.prototype.addDays = Date.prototype.addDays || function(days) {
	days = days || 0;
	this.setDate(this.getDate() + days);
	return this;
};
/**
 * @description 增减天数后返回时间对象
 * @param {int} diff 间隔,可以为负数
 * @param {string} format 需要检验的格式:y|Y(年)、m|M(月)、d|D(日)、h|H(小时)、mm|MM(分钟)、s|S(秒钟)、ss|SS(毫秒)
 */
Date.prototype.add = Date.prototype.add || function(diff, format) {
	if (format === undefined) {
		format = 'd'; //默认为天数
	}
	format = format.toLowerCase(); //将格式字符串转换成小写
	var o = {
		'y': this.getFullYear(), //Year
		'm': this.getMonth(), // Month
		'd': this.getDate(), // day
		'h': this.getHours(), //小时         
		'mm': this.getMinutes(), // minute
		's': this.getSeconds(), // second
		'ss': this.getMilliseconds() // millisecond
	}
	o[format] = o[format] + parseInt(diff);
	return new Date(o['y'], o['m'], o['d'], o['h'], o['mm'], o['s'], o['ss']);
};
/**
 * @description 获取指定月份的天数
 * @param month 月份数(默认指本月)
 * @param year 年份(默认指本年)
 */
Date.prototype.getDays = Date.prototype.getDays || function(month, year) {
	year = year || this.getFullYear();
	month = month || this.getMonth();
	return new Date(year, month, 0).getDate();
};
/**
 * @description 获取指定日期是本年的第几周
 * @param {Date} date 需要获取的日期
 * @return {Int} 返回指定日期为本年度的第几周
 */
Date.prototype.getYearWeek = Date.prototype.getYearWeek || function(date) {
	date = date || this;
	var date2 = new Date(date.getFullYear(), 0, 1),
		day1 = date.getDay();
	if (day1 == 0) day1 = 7;
	var day2 = date2.getDay();
	if (day2 == 0) day2 = 7;
	var d = Math.round((date.getTime() - date2.getTime() + (day2 - day1) * (24 * 60 * 60 * 1000)) / 86400000);
	//return Math.ceil(d/7)+1;//向上取整,有小数就整数部分加1
	return parseInt(d / 7) + 1; //丢弃小数部分,保留整数部分
};
/**
 * @description 获取指定日期
 * @param p 指定参数,年(y)、月(m)、周(w)、季度(q),默认为月份
 * @param istime 返回值是否携带时间,false默认值，不携带,true为携带返回日期,如:2014-11-01 00:00:00
 * @param fol first or last(第一天或最后一天)
 */
Date.prototype.getDateFromParam = Date.prototype.getDateFromParam || function(p, istime, fol) {
	istime = istime || true;
	p = (p || 'm').toLowerCase(); //都转化为小写,默认值为月份
	var return_time = [], // 分别存储开始时间和结束时间
		date = this,
		start, end, o = {
			'm': date.getMonth() + 1, // Month
			'd': date.getDate(), // day
			'y': date.getFullYear(), // year
			'w': date.getDay() // week
		}
	switch (p) {
		// 星期
		case 'w':
			return_time = [new Date(o['y'], o['m'] - 1, o['d'] - o['w'] + 1, 0, 0, 0), new Date(o['y'], o['m'] - 1, o['d'] - o['w'] + 7, 23, 59, 59)];
			break;
			// 月
		case 'm':
			return_time = [new Date(o['y'], o['m'] - 1, 1, 0, 0, 0), new Date(o['y'], o['m'] - 1, this.getDays(o['m'], o['y']), 23, 59, 59)];
			break;
			// 年
		case 'y':
			return_time = [new Date(o['y'], 0, 1, 0, 0, 0), new Date(o['y'], 11, this.getDays(o['m'], o['y']), 23, 59, 59)];
			break;
			// 季度
		case 'q':
			var quarter = parseInt(date.format('q')); //获取季度
			var ms = quarter == 1 ? [0, 2] : (quarter == 2 ? [3, 5] : (quarter == 3 ? [6, 8] : [9, 11]));
			return_time = [new Date(o['y'], ms[0], 1, 0, 0, 0), new Date(o['y'], ms[1], this.getDays(o['m'], ms[1]), 23, 59, 59)];
			break;
		default:
			return_time = [undefined, undefined];
			break;
	}
	if (!istime) {
		return_time = [return_time[0].format('yyyy-MM-dd H:m:ss'), return_time[1].format('yyyy-MM-dd H:m:ss')];
	}
	//返回对应的值
	if (fol) {
		if (fol == 'last') return return_time[1];
		if (fol == 'first') return return_time[0];
	}
	return return_time;
};
/**
 * 获取主机地址
 * @param {Object} url 访问路径地址
 */
function getHost(url) {
	var host = "null";
	if (typeof url == "undefined" || null == url) {
		url = window.location.href;
	}
	var regex = /^\w+\:\/\/([^\/]*).*/;
	var match = url.match(regex);
	if (typeof match != "undefined" && null != match) {
		host = match[1];
	}
	return host;
}

/**
 * 加载样式文件
 * @param {Object} url
 */

function LoadStyle(url) {
		try {
			document.createStyleSheet(url)
		} catch (e) {
			var cssLink = document.createElement('link');
			cssLink.rel = 'stylesheet';
			cssLink.type = 'text/css';
			cssLink.href = url;
			var head = document.getElementsByTagName('head')[0];
			head.appendChild(cssLink)
		}
	}
	/**
	 * 返回脚本内容
	 * @param {Object} s
	 */

function evalscript(s) {
		if (s.indexOf('<script') == -1) return s;
		var p = /<script[^\>]*?>([^\x00]*?)<\/script>/ig;
		var arr = [];
		while (arr = p.exec(s)) {
			var p1 = /<script[^\>]*?src=\"([^\>]*?)\"[^\>]*?(reload=\"1\")?(?:charset=\"([\w\-]+?)\")?><\/script>/i;
			var arr1 = [];
			arr1 = p1.exec(arr[0]);
			if (arr1) {
				appendscript(arr1[1], '', arr1[2], arr1[3]);
			} else {
				p1 = /<script(.*?)>([^\x00]+?)<\/script>/i;
				arr1 = p1.exec(arr[0]);
				appendscript('', arr1[2], arr1[1].indexOf('reload=') != -1);
			}
		}
		return s;
	}
	/**
	 * 动态加载脚本文件
	 * @param {Object} src
	 * @param {Object} text
	 * @param {Object} reload
	 * @param {Object} charset
	 */

function appendscript(src, text, reload, charset) {
		/*var id = hash(src + text);
		if (!reload && in_array(id, evalscripts)) return;
		if (reload && $(id)) {
			$(id).parentNode.removeChild($(id));
		}

		evalscripts.push(id);
		var scriptNode = document.createElement("script");
		scriptNode.type = "text/javascript";
		scriptNode.id = id;
		scriptNode.charset = charset ? charset : (BROWSER.firefox ? document.characterSet : document.charset);
		try {
			if (src) {
				scriptNode.src = \'#\'"  = false;
			scriptNode.onload = function () {
				scriptNode. = true;
				JSLOADED[src] = 1;
			};
			scriptNode.onreadystatechange = function () {
				if((scriptNode.readyState == 'loaded' || scriptNode.readyState == 'complete') && !scriptNode.{
					scriptNode. = true;
					JSLOADED[src] = 1;
				}
			};
		} else if(text){
			scriptNode.text = text;
		}
		document.getElementsByTagName('head')[0].appendChild(scriptNode);
	} catch(e) {}*/
	}
	/**
	 * 兼容浏览器绑定元素事件
	 * @param {Object} obj
	 * @param {Object} evt
	 * @param {Object} fn
	 */

function addEventSamp(obj, evt, fn) {
	if (obj.addEventListener) {
		obj.addEventListener(evt, fn, false);
	} else if (obj.attachEvent) {
		obj.attachEvent('on' + evt, fn);
	}
}


/**
 * 跨浏览器添加事件
 * @param {Object} oTarget
 * @param {Object} sEvtType
 * @param {Object} fnHandle
 */

function addEvt(oTarget, sEvtType, fnHandle) {
		if (!oTarget) {
			return;
		}
		if (oTarget.addEventListener) {
			oTarget.addEventListener(sEvtType, fnHandle, false);
		} else if (oTarget.attachEvent) {
			oTarget.attachEvent("on" + sEvtType, fnHandle);
		} else {
			oTarget["on" + sEvtType] = fnHandle;
		}
	}
	/**
	 * 跨浏览器删除事件
	 * @param {Object} oTarget
	 * @param {Object} sEvtType
	 * @param {Object} fnHandle
	 */

function delEvt(oTarget, sEvtType, fnHandle) {
	if (!oTarget) {
		return;
	}
	if (oTarget.addEventListener) {
		oTarget.addEventListener(sEvtType, fnHandle, false);
	} else if (oTarget.attachEvent) {
		oTarget.attachEvent("on" + sEvtType, fnHandle);
	} else {
		oTarget["on" + sEvtType] = fnHandle;
	}
}

/**
 * 确认是否键盘有效输入值
 * @param {Object} iKey
 */

function checkKey(iKey) {
	if (iKey == 32 || iKey == 229) {
		return true;
	} /*空格和异常*/
	if (iKey > 47 && iKey < 58) {
		return true;
	} /*数字*/
	if (iKey > 64 && iKey < 91) {
		return true;
	} /*字母*/
	if (iKey > 95 && iKey < 108) {
		return true;
	} /*数字键盘1*/
	if (iKey > 108 && iKey < 112) {
		return true;
	} /*数字键盘2*/
	if (iKey > 185 && iKey < 193) {
		return true;
	} /*符号1*/
	if (iKey > 218 && iKey < 223) {
		return true;
	} /*符号2*/
	return false;
}

/**
 * var aa = document.documentElement.outerHTML.match(/(url\(|src=\'#\'"  ]+)[\"\'\)]*|(http:\/\/[\w\-\.]+[^\"\'\(\)\<\>\[\] ]+)/ig).join("\r\n").replace(/^(src=\'#\'" ) ]*$/igm,"");
alert(aa)
 */
/**
 * 用正则表达式按字母排序，对每行进行数组排序
 */

function SetSort() {
	var text = K1.value.split(/[\r\n]/).sort().join("\r\n"); //顺序
	var test = K1.value.split(/[\r\n]/).sort().reverse().join("\r\n"); //反序
	K1.value = K1.value != text ? text : test;
}

/**
 * 用正则表达式清除html代码中的脚本
 */

function clear_script() {
		K1.value = K1.value.replace(/<script.*?>[\s\S]*?<\/script>|\s+on[a-zA-Z]{3,16}\s?=\s?"[\s\S]*?"|\s+on[a-zA-Z]{3,16}\s?=\s?'[\s\S]*?'|\s+on[a-zA-Z]{3,16}\s?=[^ >]+/ig, "");
	}
	/**
	 * 实现金额大写转换函数
	 * @param {Object} tranvalue
	 */

function transform(tranvalue) {
		try {
			var i = 1;
			var dw2 = new Array("", "万", "亿"); //大单位
			var dw1 = new Array("拾", "佰", "仟"); //小单位
			var dw = new Array("零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"); //整数部分用
			//以下是小写转换成大写显示在合计大写的文本框中     
			//分离整数与小数
			var source = splits(tranvalue);
			var num = source[0];
			var dig = source[1];
			//转换整数部分
			var k1 = 0; //计小单位
			var k2 = 0; //计大单位
			var sum = 0;
			var str = "";
			var len = source[0].length; //整数的长度
			for (i = 1; i <= len; i++) {
				var n = source[0].charAt(len - i); //取得某个位数上的数字
				var bn = 0;
				if (len - i - 1 >= 0) {
					bn = source[0].charAt(len - i - 1); //取得某个位数前一位上的数字
				}
				sum = sum + Number(n);
				if (sum != 0) {
					str = dw[Number(n)].concat(str); //取得该数字对应的大写数字，并插入到str字符串的前面
					if (n == '0') sum = 0;
				}
				if (len - i - 1 >= 0) { //在数字范围内
					if (k1 != 3) { //加小单位
						if (bn != 0) {
							str = dw1[k1].concat(str);
						}
						k1++;
					} else { //不加小单位，加大单位
						k1 = 0;
						var temp = str.charAt(0);
						if (temp == "万" || temp == "亿") //若大单位前没有数字则舍去大单位
							str = str.substr(1, str.length - 1);
						str = dw2[k2].concat(str);
						sum = 0;
					}
				}
				if (k1 == 3) //小单位到千则大单位进一
				{
					k2++;
				}
			}
			//转换小数部分
			var strdig = "";
			if (dig != "") {
				var n = dig.charAt(0);
				if (n != 0) {
					strdig += dw[Number(n)] + "角"; //加数字
				}
				var n = dig.charAt(1);
				if (n != 0) {
					strdig += dw[Number(n)] + "分"; //加数字
				}
			}
			str += "元" + strdig;
		} catch (e) {
			return "0元";
		}
		return str;
	}
	//拆分整数与小数

function splits(tranvalue) {
	var value = new Array('', '');
	temp = tranvalue.split(".");
	for (var i = 0; i < temp.length; i++) {
		value[i] = temp[i];
	}
	return value;
}

function ltrim(s) {
	return s.replace(/^(\s*|　*)/, "");
}

function rtrim(s) {
	return s.replace(/(\s*|　*)$/, "");
}

function trim(s) {
	return ltrim(rtrim(s));
}