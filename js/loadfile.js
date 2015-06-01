function loadFile(id){
//	console.log(root);
    var root = $$('extree').getItem(id);
	var result = webix.ajax().sync().get(root.url);
    var text = result.responseText;
    var line = text.split(/(\n\r)|(\n)/);

    var i = 0;
    var stack = [root];
    var sp = 0; 
    var firsttime = true;
    var state = 'desc';
    var item = stack[sp];
    var url = item.url;
    while(i<line.length) {
        item = stack[sp];
    	var s = line[i];
        i++;
        if(typeof s != 'undefined') {
        	var sharp = s.match(/^[#]+\s/);
        	if(sharp != null && sharp.length > 0) {
        		if(firsttime && sharp.length == 2) {
        			firsttime = false;
        			item.url = undefined;
                    $$('extree').updateItem(item.id,item);
        		} else {
        			item = {type:'file',id:url+'.'+i};
                    if(sharp.length-1 > sp) {

                        if(typeof stack[sp].data == 'undefined') {
                            stack[sp].type = 'folder';
                            stack[sp].data = [];
                        }
//                        stack[sp].data.push(item);
                        $$('extree').add(item,null,stack[sp].id);

                        stack.push(item);
                        sp++;
                    } else if(sharp.length-1 == sp) {
                        stack[sp] = item;
                    } else {
                        sp=sharp.length-1;
                        stack.length = sp-1;
                        stack.push(item);
                    }
        		}
        		item.value = s.substr(sharp[0].length);  
                state = 'desc';
            } else if(s == '%ddl') {
                state = 'ddl';
        	} else if(s == '%sql') {
                state = 'sql';
            } else if(s == '%js') {
                state = 'js';
            } else {
                item[state] = (item[state]||'')+s;
            }
        }
    };
    console.log(item);
    $$('extree').updateItem(item.id,item);

    $$('extree').refresh();
//    $$('extree').clearAll();
//    $$('extree').parse(exdata);
};