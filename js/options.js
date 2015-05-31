function showOptions() {
	var data = [];
	for(var optid in alasql.options) {
		data.push({optid:optid,value:JSON.stringify(alasql.options[optid])});
	};
	$$('opttable').parse(data);
    $$('opttable').sort("#optid#");
};

function showFunctions() {
	var data = [];
	for(var fnid in alasql.fn) {
		data.push({fnid:fnid,value:alasql.fn[fnid]});
	};
	$$('fntable').parse(data);
    $$('fntable').sort("#fnid#");
};

function showVariables() {
	var data = [];
	for(var varid in alasql.vars) {
		data.push({varid:varid,value:JSON.stringify(alasql.vars[varid])});
	};
	$$('vartable').parse(data);
    $$('vartable').sort("#varid#");
};

function showParams() {
	var data = [];
	for(var varid in alasql.params) {
		data.push({parid:parid,value:JSON.stringify(alasql.params[parid])});
	};
	$$('partable').parse(data);
    $$('partable').sort("#parid#");
};

function showTables() {
  var dbtree = [];
  for(var dbid in alasql.databases) {
    if(dbid != 'dbo' && dbid != 'test') {
      var db = {type:'folder',value:dbid, id:dbid, open:true, data:[]};
      dbtree.push(db);

      var dbt = {type:'folder',value:'Tables', id:dbid+'.tables', open:true, data:[]};
      var dbv = {type:'folder',value:'Views', id:dbid+'.views', open:true, data:[]};
      db.data.push(dbt);
      db.data.push(dbv);

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

