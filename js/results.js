function showResults(data,err){
  $$('rw').removeView('result');

  if(err) {
    $$('rw').addView({ 
      id:'result', template:err, css:'error'
    });
  } else {
    var res = data[data.length-1];

    if(typeof res == 'object') {
      if(res instanceof alasql.Recordset) {
        var columns = [];
        res.columns.forEach(function(columnid){
//          if(columnid != 'id') {
            columns.push({id:columnid});
//          }
        });     
        $$('rw').addView({ 
          id:'result', view:"datatable", columns:columns,data:res.data
        });        

      } else if(res instanceof Array) {
        if(res.length > 0) {
          if(typeof res[0] != 'object') {
            columns = [{id:'_'}];
            res = res.map(function(d){
              if(typeof d == 'object') d = JSON.stringify(d);
              return {'_':d};
            });
          } else {
            var allcol = {};
            for(var i=0;i<Math.min(res.length,alasql.options.columnlookup||10);i++) {
              for(var key in res[i]) {
                allcol[key] = true;
              }
            }

            var columns = [];
            Object.keys(allcol).forEach(function(columnid){
              if(columnid != 'id') {
                columns.push({id:columnid});
              }
            });     
          }
        } else {
          // Cannot recognize columns
          var columns = [];
        };
        $$('rw').addView({ 
          id:'result', view:"datatable", columns:columns,data:res
        });        
      } else {
        $$('rw').addView({ 
          id:'result', template:JSON.stringify(res)
        });        

      }
    } else {
      $$('rw').addView({ 
        id:'result', template:res
      });        

    }

  }
};
