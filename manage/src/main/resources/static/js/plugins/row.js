/**
 * Row ver1.0
 * 
 * Created by Alan 2017/1/19
 * updated by LIU  2017/1/23
 * @param cellCount
 * @returns
 */
function Row(cellCount) {
	this.values = [];
	this.defaultValue = "";
	this.tdid="";
	this.cellCount = cellCount;
}

/**
 * @param index: td元素的索引
 * @param value: td元素的值
 * @param defaultValue: 如果value为null，则填充默认值
 * @Return this: 返回当前的tr对象
 */
Row.prototype.set = function(index, value, defaultValue,tdid) {
	if(typeof tdid =="undefined"||tdid=="null"||$.trim(tdid).length==0){
		tdid="";
	}
	var value = {"index": index, "value": value, "defaultValue": defaultValue, "tdid": tdid};
	this.values.push(value);
	return this;
}
/**
 * 获取tr元素对象
 */
Row.prototype.buildTR = function() {
	var cells = "";
	for (var i = 0; i < this.cellCount; i++) {
		cells+="<td>" + this.defaultValue + "</td>";
	}
	var tr = document.createElement("tr");
	tr.innerHTML = cells;
	
	var cellArray = tr.cells;
	for (var i = 0; i < this.values.length; i++) {
		if (this.values[i].tdid) {
			cellArray[i].id = this.values[i].tdid;
		}
	}
	
	for (var i = 0; i < this.values.length; i++) {
		var v = this.values[i];
		if (v.value === 0) {
			v.value = '0';
		}
		if (v.value == 'null') {
			v.value = v.defaultValue;
		}
		if (this.css) {
			tr.style = this.css;
		}
		if (this.id) {
			tr.id = this.id;
		}
		if (this.className) {
			tr.setAttribute("class", this.className);
		}
		tr.cells[v.index].innerHTML = v.value || v.defaultValue || this.defaultValue;
	}
	return tr;
}
Row.prototype.setDefaultValue = function(defaultValue) {
	this.defaultValue = defaultValue;
}
Row.prototype.setCss = function(css) {
	this.css = css;
	return this;
}
Row.prototype.setId = function(id) {
	this.id = id;
	return this;
}
Row.prototype.setClassName = function(className) {
	this.className = className;
	return this;
}

Row.prototype.getHtmlText = function() {
	var tr = this.buildTR();
	var div = document.createElement("div");
	div.appendChild(tr);
	return div.innerHTML;
}
