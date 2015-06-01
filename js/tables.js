function showTables() {
  var dbtree = [];
  for(var dbid in alasql.databases) {
    if(dbid != 'dbo' && dbid != 'test') {
      var db = {type:'folder',value:dbid, id:dbid, open:true, data:[]};
      dbtree.push(db);

      var dbt = {type:'folder',value:'Tables', id:dbid+'.tables', open:true, data:[]};
      var dbv = {type:'folder',value:'Views', id:dbid+'.views', open:true, data:[]};
      var dbc = {type:'folder',value:'Classes', id:dbid+'.classes', open:true, data:[]};
      var dbo = {type:'file',value:'Objects', id:dbid+'.objects'};
      db.data.push(dbt);
      db.data.push(dbv);
      db.data.push(dbc);
      db.data.push(dbo);

      for(var tableid in alasql.databases[dbid].tables) {
        if(alasql.databases[dbid].tables.view) {
          dbv.data.push({type:'file',value:tableid, id:tableid, databaseid:dbid});
        } else {
          dbt.data.push({type:'file',value:tableid, id:tableid, databaseid:dbid});
        }
      };
    }
  };
  $$('dbtree').clearAll();
  $$('dbtree').parse(dbtree);
};

