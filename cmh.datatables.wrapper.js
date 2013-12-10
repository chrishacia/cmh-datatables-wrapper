/* repourposed from my cmh-global-js */
//if you are using cmh-global-js
//the it is safe to remove the following functions from
//this file to prevent duplication errors
//countObjs(),mergeObjs(),isNumber()
function countObjs(obj)
{
	var count = 0;
	for(var prop in obj) {
		if (obj.hasOwnProperty(prop))
		{
			++count;
		}
	}
	return count;
}
function mergeObjs(obj1,obj2){
    var obj3 = {};
    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
    return obj3;
}
function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
/* repourposed from my cmh-global-js */














//this is an object of objects, where the main property name per set is the "id" of the given table.
var cmhTableIndex = {
	"table_defaults" :{}, // out of box dataTables functionaitly.
    //<table> id="my_table" settings defined here
	"my_table" :{
            "bPaginate": false,
            "bFilter": false,
            "bAutoWidth": true,
            "bScrollCollapse": true,
            "oLanguage": {
                "sInfo": 'Showing _END_ Logs.',
                "sEmptyTable": ' ',
                "sInfoEmpty": ' '
            },
            "aoColumns": [
                  { "bSortable": false, "sWidth":"100%" }
               ]
	},
    //<table> id="my_table_two" settings defined here
	"my_table_two" :{
			"sPaginationType": "full_numbers",
            "bPaginate": true,
            "bFilter": false,
            "bAutoWidth": true,
            "bScrollCollapse": true,
            "oLanguage": {
                "sInfo": 'Showing _END_ Logs.',
                "sEmptyTable": ' ',
                "sInfoEmpty": ' '
            },
            "aoColumns": [
                  { "bSortable": true, "sWidth":"100%" }
               ]
	}
};
//Functionality to roll out table based on options provided by above defaults and specific table definitions
//or through parameters passed through the function itself.
var cmhDTW = {
	buildTable: function(tableID, tableOptions, fixedHeight, preFunc, postFunc)
	{
		var tableOpt = {};
		//need to run a function before the table instanciates?
		//build a function somewhere.. and then define it by name as the parameter
		if(typeof preFunc !== 'undefined')
		{
			if(preFunc !== null && preFunc !== false && preFunc !== '')
			{
				typeof window[preFunc] === "function" && window[preFunc]();
			}
		}

		//check for cmhTableIndex one to one mapping with tableID
		if(typeof tableID == 'undefined' || tableID == null || tableID == undefined || tableID == ''){return false;}
		if(typeof cmhTableIndex[tableID] !== 'undefined')
		{
			tableOpt = cmhTableIndex[tableID];
		}

		//check to see if tableOptions param is even there
		if(typeof tableOptions !== 'undefined')
		{
			//if tableOptions is found defined, lets make sure its not invalid
			if(tableOptions !== '' && tableOptions !== null && tableOptions !== undefined && tableOptions.toString() == '[object Object]')
			{
				//if tableOptions is valid lets make sure its got anything to work with not an empty object
				if(countObjs(tableOptions) > 0)
				{
					tableOpt = mergeObjs(tableOpt,tableOptions);
				}
			}
		}

		//some tables need a static height, some don't some we want to flip/flop the notion of
		//this appends the scroll
		if(typeof fixedHeight !== 'undefined')
		{
			//true defaults it to 200px, a numeric defaults it to that provided numba
			if(fixedHeight !== false && fixedHeight !== '' && fixedHeight !== null)
			{
				tableOpt.sScrollY = "200px";
				if(isNumber(fixedHeight) == true)
				{
					tableOpt.sScrollY = fixedHeight+"px";
				}
			}
		}

		//instanciates table
		var oTable = $('#'+tableID).dataTable(tableOpt);

		//need to run a function after the table instanciates?
		//build a function somewhere.. and then define it by name as the parameter
		if(typeof postFunc !== 'undefined')
		{
			if(postFunc !== null && postFunc !== false && postFunc !== '')
			{
				typeof window[postFunc] === "function" && window[postFunc]();
			}
		}
		return oTable;
	}
};