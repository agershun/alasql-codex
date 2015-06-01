
  var exdata = [
    {id:0,value:'Init',url:'index.txt'},
//    {id:1,value:'Welcome to AlaSQL',desc:'# Welcome to AlaSQL Code Examples! \n```sql\nSELECT 100\n```\nThis is a text'},
//    {id:2,value:'SELECT',sql:'SELECT 100'},
//    {id:3,value:'SELECT',js:'console.log("Ok!")'}
  ];

  webix.ready(function(){

    // Define about popup
    webix.ui({view:"popup",id:"about_pop",
      width:300,height:150,
      body:{template:'AlaSQL Code Examples<br>(c) 2015 Andrey Gershun'}
    });

    // Define main window
    webix.ui({rows:[
        {view:"toolbar", paddingY:2,
            elements:[
              { id:'title', view:'label',template: "" },
              {view:"icon",width: 40, icon:"question-circle", popup: "about_pop" }
          ]},

      {cols:[
        {width:250, rows: [
          { type:"header", template:"Examples" },
          {view:"search", align:"center", placeholder:"Search..", id:"search"}, 
          { id:'extree',view:"tree", gravity:0.4, select:true,
            data: exdata
          },
        ]},
        { view:"resizer" },        
        {rows: [
          {rows: [
              {
                  borderless:true, view:"tabbar", id:'editbar', value: 'listView', multiview:true, options: [
                      { value: 'Description', id: 'descView'},
                      { value: 'SQL Data Model', id: 'ddlView'},
                      { value: 'SQL Query', id: 'sqlView'},
                      { value: 'JavaScript', id: 'jsView'},
                  ]
              },
              { cells:[ 
                  {id:"descView", template:"Description"},
                  {id:"ddlView", view:"codemirror-editor", mode:'text/x-sql'},
                  {id:"sqlView", view:"codemirror-editor", mode:'text/x-sql'},
                  {id:"jsView", view:"codemirror-editor", mode:'text/x-javascript'}
              ]}
          ]},

          { view:"resizer" },
          {id:'rw', rows: [
            {view:"toolbar", paddingY:2,
              cols:[
                { view:"button", label:"Prev", type:"prev", width:100 },
                { view:"button", label:"Next" , type:"next",  width:100 },
                { view:"button", label:"Run query" , css:'query_btn', inputWidth:100, align:"right" },
            ]},
            {id: 'result'}            
          ]},
        ]},

        { view:"resizer" },
        {width:200, view:'accordion',rows: [
          { header:"Tables", headerAlt:"Tables", collapsed:false,
            body: { id:'dbtree',view:"tree", gravity:0.4, select:true },
          },
          { header:"Variables", headerAlt:"Variables", collapsed:true,
            body:{
             id:'vartable',view:"datatable",header:false,columns:[
              {id:'varid',sort:'string'},
              {id:'value'},
             ] 
           },          
          },
          { header:"Functions", headerAlt:"Functions", collapsed:true,
            body:{
             id:'fntable',view:"datatable",header:false,columns:[
              {id:'fnid',sort:'string'},
              {id:'value'},
             ] 
           },          
          },
          { header:"Parameters", headerAlt:"Parameters", collapsed:true,
            body:{
             id:'partable',view:"datatable",header:false,columns:[
              {id:'parid',sort:'string'},
              {id:'value'},
             ] 
           },          
          },
          { header:"Options", headerAlt:"Options",collapsed:true,
            body:{
             id:'opttable',view:"datatable",header:false,columns:[
              {id:'optid',sort:'string'},
              {id:'value'},
             ] 
           },          
          },
        ]},
      ]},
    ]});
  
    // Set label AlaSQL version
    $$('title').setHTML("<span class='main_title'> <a href='http://alasql.org' style='color:white;font-weight:bold;text-decoration:none'>AlaSQL</a> Code Examples v"+alasql.version+"</span>");

    showTables();
    showOptions();
    showFunctions();
    showVariables();
    showParams();

    $$('extree').attachEvent("onAfterSelect", function (id) {
      var item = $$('extree').getItem(id);

//      console.log(item);

      if(item.url && !item.desc && !item.ddl && !item.sql && !item.js) {
        // Load file and tree

        loadFile(id);

//        item.url = undefined;
      };

      if(item.desc) {
        $$('descView').setHTML(marked(item.desc));
      };
      if(item.ddl) {
        $$('ddlView').setValue(item.ddl);
      };
      if(item.sql) {
        $$('sqlView').setValue(item.sql);
      };
      if(item.js) {
        $$('jsView').setValue(item.js);
      };

      if(item.js) {
        $$('editbar').setValue('jsView');
      } else if(item.sql) {
        $$('editbar').setValue('sqlView');
      } else if(item.ddl) {
        $$('editbar').setValue('ddlView');
      } else if(item.desc) {
        $$('editbar').setValue('descView');
      };

      runQuery(id);
    });

    $$('extree').select($$('extree').getFirstId());

//    showResults([[1,2,3]]);

  });

