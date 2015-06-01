function runQuery(id) {
  clearDatabases();
  var item = $$('extree').getItem(id);

	alasql('DROP DATABASE IF EXISTS test;CREATE DATABASE test;USE test');
	alasql.options.errorlog = true;
	delete alasql.options.modifier;
  
	var sql = 'SELECT 1;'+(item.ddl||'')+(item.sql||'');

    alasql(sql,{},function(data,err){
          showResults(data,err);
          showTables();
    });

	if(item.js) {
		var s = item.js;
        if(s.indexOf('done') > -1) {
          var fn = new Function('alasql,done',s);
          fn(alasql,function(data,err){
            showResults([data],alasql.error);
            showTables();
          });
        } else {
          s = 'var res;'+s+';return [res];';
          var fn = new Function('alasql',s);
          showResults(fn(alasql),alasql.error);
          showTables();

        }
    };

};

// Clear active databases
function clearDatabases() {
  for(var dbid in alasql.databases) {
      if(alasql.databases[dbid].databaseid != 'alasql') {
        alasql('DROP DATABASE '+dbid);
      }
    };  
}

