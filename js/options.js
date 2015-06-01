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

