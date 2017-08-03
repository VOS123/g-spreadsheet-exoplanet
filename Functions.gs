/**

 * Exoplanets.  See https://exoplanetarchive.ipac.caltech.edu
 *
 * @param {string}  p_table      string, table , defaults to exoplanet
 * @param {string}  p_select     comma list, defaults to all columns of the specific table
 * @param {string}  p_order      comma list no default
 * @param {integer} p_maxrows    max. number of rows , defaults to 1000
 * @param {boolean} p_debug      debug

* @return selected items 

@customFunction
**/

function myexoplanetarchive( select , where , order  ) {

  var maxrows = 1000;

  
  var URL = "https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?format=json&table=exoplanets";
  
  if ( select ) { URL =  URL + "&select=" + select }
  if ( where  )  { URL =  URL + "&where=" + where   }    
  //if ( order  ) { URL =  URL + "&order=" + order   }
    
  var result = UrlFetchApp.fetch(URL,{
   'method' : 'GET'
   , 'contentType': 'application/json'    
  }); 
  
  var root =   JSON.parse(result.getContentText());   
  var cellValues = [];     

  
  
  var header = []
  for ( var elements in root[0] ) {
    header.push (elements  )
  }
  cellValues.push ( header )   
 
  var i = 0
  for (var planets in root ) {
    if ( i < maxrows) {
      var line = []
      var oplanet = root[planets]
      for ( var elements in oplanet ) {
        line.push (oplanet[elements]  )
      }
      cellValues.push ( line )       
    }
    i ++
  }
  
  return cellValues; 

}
