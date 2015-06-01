function loadFile(id){
//	console.log(root);
    var root = $$('extree').getItem(id);
    var url = root.url;
    root.url = undefined;
	var result = webix.ajax().sync().get(url);
    var text = result.responseText;
    var line = text.split(/(\n\r)|(\n)/);

    var i = 0;              // Counter
    var stack = [id];     // Stack
    var sp = 0;             // Stack Pointer
    var firsttime = true;
    var state = 'desc';
    var id = stack[sp];

    while(i<line.length) {
        id = stack[sp];
        item = $$('extree').getItem(id);   // Current Item
    	var s = line[i];    // Current Line
        i++;
        if(typeof s != 'undefined') {
        	var sharp = s.match(/^[#]+\s/);    // If sharp exists in this line
        	if(sharp != null) {
                state = 'desc';                
                var sharplevel = sharp[0].length-2;
//                console.log('sharplevel',sharplevel);
        		if(firsttime && sharplevel == 0) {
        			firsttime = false;
        			item.url = undefined;
                    item.type = 'folder';
                    item.open=true;
                    item.value = s.substr(2);  // Set name for the item
                    $$('extree').updateItem(item.id,item);
        		} else {
        			item = {type:'file',id:url+'.'+i,value:s.substr(sharplevel+1)};  // Set name for the item
                    if(sharplevel > sp) {
                        var id = stack[sp];
                        // var rit = $$('exdata').getItem(id);
                        // rit.type = 'folder';
                        // $$('exdata').updateItem(id,rit);
                        $$('extree').add(item,null,id);
                        //if(stack.length>1) stack.length--;
                        stack.push(item.id);
                        sp++;
                    } else if(sharplevel == sp) {
                        var id = stack[sp-1];
                        $$('extree').add(item,null,id);
                        stack[sp] = item.id;
                    } else {
//                        console.log(sharplevel,sp);
                        sp=sharplevel;
                        stack.length = sp;
                        var id = stack[sp-1];
                        $$('extree').add(item,null,id);
                        stack[sp] = item.id;
                    }
        		}
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
//    console.log(63,id);
//    $$('extree').updateItem(item.id,item);

    $$('extree').refresh();
//    $$('extree').clearAll();
//    $$('extree').parse(exdata);
};