var exs = [
	[
'CREATE TABLE city (\n\
    id INT PRIMARY KEY,\n\
    name NVARCHAR(40)\n\
);',
'INSERT INTO city \n\
    VALUES (1,"New York"),\n\
        (2,"Berlin"),(3,"Paris");',
'SELECT * FROM city;'
	],
	[
"res = alasql('SELECT 2*2 AS a');",
"res = alasql('SELECT 3*3 AS a');",
	],
	[
"DECLARE @a AS INT = 100;",
"SELECT @a",
	],
	[
"/* Enter your code in SQL\n\
 or JavaScript below */"
	]
];

//function showExample(){
	var i=0,j=0,k=0;
	var stop = false;
	var s = '';

//	showNext();
	function showNext() {
		if(stop) return;
		if(i>=exs.length || i<0) return;
		
		s += exs[i][j][k];
		$$('editor').setValue(s);
		k++;
		if(k>=exs[i][j].length) {
			s+='\n';
			k = 0;
			j++;
			runQuery2();
			if(j>=exs[i].length) {
				s = '';
				j=0;
				i++;
				setTimeout(showNext,3000);
			} else {
				setTimeout(showNext,1000);
			}
		} else {
			setTimeout(showNext,40);
		}
	}
