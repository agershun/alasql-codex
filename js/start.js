/**
  Call this url
  @function
  @param {string} url URL to be loaded
*/
function href(url) {
  location.href = url;
}

/**
  Load blog entries from BLOG.md
  Take first three
  @function
*/
function loadBlog() {
  var result = webix.ajax().sync().get('BLOG.md');
  var text = result.responseText;
  var blog = text.split(/^[#]/gm);
//console.log(blog);
  $$('blog1').setHTML(marked('#'+(blog[1]||'')));
  $$('blog2').setHTML(marked('#'+(blog[2]||'')));
  $$('blog3').setHTML(marked('#'+(blog[3]||'')));

}


  webix.ready(function(){


    // Define main window
    webix.ui(
      { rows:[
        {view:"toolbar", paddingY:2, elements:[
          { id:'title', view:'label',
           template: '<a href="http://github.com/agershun/alasql" \
           style="color:white; text-decoration:none;font-weight:bold;font-size:120%">AlaSQL</a>' },
          // { view:'button',value: "About", width:100,css:'borderless',
          //   click:'href("http://alasql.org")'
          // },
          { id: 'doc',view:'button',value: "Documentation" ,css:'borderless',
              click:'href("http://github.com/agershun/alasql/wiki")'
          },
          { view:'button',value: "Examples" , css:'borderless',
              click:'href("index.html")'
          },
//          { view:'button',value: "Contacts" , css:'borderless',popup:'contacts'},
          { view:'button',value: "Github" , css:'borderless',
              click:'href("http://github.com/agershun/alasql")'
          },
          { view:'button',value: "Download" , css:'borderless',
//            click: 'href("https://github.com/agershun/alasql/zipball/master")'
            click: 'href("http://cdn.jsdelivr.net/alasql/latest/alasql.min.js")'
          },
        ]},
        {cols: [
          {view:'scrollview',scroll:'y',borderless:true,body: {
            cols: [
              {template:' ',width:25, borderless:true,},
              { rows: [
                {template: '<h1>AlaSQL -  JavaScript SQL Database Library</h1><p>Versatile JavaScript SQL database for browser and Node.js. \
                  Handles both traditional relational tables and nested JSON data (noSQL). \
                  Export, store, and import data from localStorage, IndexedDB, or Excel.</p>',
                  autoheight:true, borderless:true,
                },
                {cols:[
                  {rows:[
                    {view:'toolbar',cols:[{view:'label', label:'Enter you SQL or JavaScript code here:'}]},
                    {id:"editor", view:"codemirror-editor", mode:'text/x-sql',height:200, },
                  ]},
                  {view:'resizer'},

                  {id:'rw',rows:[
                    {view:'toolbar',cols:[{view:'label', label:'See the result:'}]},
                    {id:'result',height:200},
                  ]},
                ]},
                {view:"toolbar", paddingY:2,
                  cols:[
                    { view:"button", label:"Run query (Ctrl-Enter)" , css:'query_btn', inputWidth:200,
                      click:function(){
                        i = -1;
                        runQuery2();
                      }
                    },
                    { view:"button", label:"Prev example", type:"prev", width:200, align:"right",
                      click: function(){
                        stop = true;
                        i--;
                        if(i<0) i=exs.length-1;
                        $$('editor').setValue(exs[i].join('\n'));
                        runQuery2();
                      }
                    },
                    { view:"button", label:"Next example" , type:"next",  width:200,
                      click: function(){
                        stop = true;
                        i++;
                        if(i>=exs.length) i=0;
                        $$('editor').setValue(exs[i].join('\n'));
                        runQuery2();
                      }

                     },
//                    { view:"label", label:"35 rows fetched", align:'right'},
                ]},
                {template:'html->info_1',autoheight:true, borderless:true}
              ]},
            {template:' ',width:25,borderless:true,},
            {width:200, borderless:true,rows:[
              {template: ' ', height:25,borderless:true,},
              {id: 'blog1', template: ' ', autoheight:true,borderless:true,},
//              {template: ' ', height:25,borderless:true,},
              {id: 'blog2', template: ' ',autoheight:true,borderless:true,},
//              {template: ' ', height:25,borderless:true,},
              {id: 'blog3', template: ' ',autoheight:true,borderless:true,},

            ]},
            {template:' ',width:25,borderless:true,},
          ]}},

        ]},
    ]});
  
    // Set label AlaSQL version
//    $$('title').setHTML("<span class='main_title'> <a href='http://alasql.org' style='color:white;font-weight:bold;text-decoration:none'>AlaSQL</a> v"+alasql.version+"</span>");

//     $$('editor').setValue('CREATE TABLE City(Id SERIAL, Name STRING); \n\
// INSERT INTO City (Name) \n\
//   VALUES ("Berlin"), ("Paris"), ("Tokyo"), ("Copenhagen"); \n\
// SELECT * FROM City ORDER BY Name ');
    // runQuery2();

//    $$('editor').getTopParentView().addEventListener(function(code,event){
    $$('editor').editor.on('keypress',function(cm,e){
  //console.log(arguments);
        if(!stop) {
          stop = true;
          e.stopPropagation();
          e.preventDefault();
          $$('editor').focus();
        }

        if(e.which == 13 && e.ctrlKey) {
          runQuery2();
          e.stopPropagation();
          e.preventDefault();
          return false;
        }
    });

    webix.on

    showNext();

    loadBlog();

  });

