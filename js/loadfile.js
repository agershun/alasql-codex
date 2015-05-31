function loadFile(id,item){
	var result = webix.ajax().sync().get(item.url);
    var s = result.responseText;
    var ss = s.split(/\n(\%)+\s+/);
    console.log(ss);
};