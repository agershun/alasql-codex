function loadFile(id,root){
//	console.log(root);
	var result = webix.ajax().sync().get(root.url);
    var text = result.responseText;
    var line = text.split(/(\n\r)|(\n)/);

    var i = 0;
    var item = root;
    var firsttime = true;
    while(i<line.length) {
    	var s = line[i];
        i++;
    	var sharp = s.match(/^[#]+\s/)[0];
        console.log('!!!',sharp);
    	if(typeof sharp != 'undefined') {
			item.value = s.substr(sharp.length);
    		if(firsttime) {
    			firsttime = false;
    			item.url = undefined;
    		} else {
    			item = {};
    		}
    		item.value = s.substr(sharp.lenght);
    	}
    }

    console.log(item);
};