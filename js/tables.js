function showTables() {
  var dbtree = [];
  for(var dbid in alasql.databases) {
    if(dbid != 'dbo' && dbid != 'alasql') {
      var db = {type:'folder',value:dbid, id:dbid, open:true, data:[]};
      dbtree.push(db);

      var dbt = {type:'folder',value:'Tables', id:dbid+'.tables', open:true, data:[]};
      var dbv = {type:'folder',value:'Views', id:dbid+'.views', open:false, data:[]};
      var dbc = {type:'folder',value:'Classes', id:dbid+'.classes', open:false, data:[]};
      var dbo = {type:'file',value:'Objects', id:dbid+'.objects'};
      db.data.push(dbt);
      db.data.push(dbv);
      db.data.push(dbc);
      db.data.push(dbo);

      for(var tableid in alasql.databases[dbid].tables) {
//        console.log(tableid);
        if(alasql.databases[dbid].tables.view) {
          dbv.data.push({type:'file',value:tableid, id:dbid+'.'+tableid, databaseid:dbid});
        } else {
          dbt.data.push({type:'file',value:tableid, id:dbid+'.'+tableid, databaseid:dbid});
        }
      };
    }
  };
  $$('dbtree').clearAll();
  $$('dbtree').parse(dbtree);

  $$('dbtree').attachEvent("onAfterSelect", function (id) {
    var item = $$('dbtree').getItem(id);
    var tb = alasql.databases[item.databaseid].tables[item.value];
      console.log(tb);
    if(tb && tb.data) {
      var res = tb.data;
      showResults([res]);
    }
  });

};

