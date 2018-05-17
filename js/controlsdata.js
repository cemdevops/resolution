
//window.onload = function()  {
function loadControlsAndTokens(){
	populateThemes(0);
	populateVariables(1, "");
	// Update language tokens for the first time
	getLanguageTokens ();
	updateLanguageTokens ();
};

function populateThemes(intTheme){
	var selectControl = document.getElementById("option_theme");	
    var option = null;

	var strJSONFile = "json/themes.json";
	//var strAux = "";

    $.getJSON(
        strJSONFile, 
        function(result) {        	
            //find the array and do something
            $.each(result.Themes, function(key,val) {
            	option = document.createElement("option");
				option.value = val.idTheme;
				// Read theme
				if (val ["theme-" + globalCurrentLanguage]) {
					option.innerHTML = val ["theme-" + globalCurrentLanguage];
				} else {
					// default = pt-br
					option.innerHTML = val ["theme-pt-br"];
				}
				// Read theme description
				if (val ["description-" + globalCurrentLanguage]) {
					option.title = val ["description-" + globalCurrentLanguage];
				} else {
					// default = pt-br
					option.title = val ["description-pt-br"];
				}
                BASE_YEAR_OF_THEMES.push(val.baseYear);

				// Append new option
		        selectControl.appendChild(option);
            });
			// Change the theme description, if there is one
			if (intTheme && intTheme > 0) {
				document.getElementById("option_theme").value = intTheme;

			}
			var baseYearString = 'Ano base';
			if (globalLangTokens.themeBaseYearString != null){
				baseYearString = globalLangTokens.themeBaseYearString;
			}
            document.getElementById("theme_baseyear").innerHTML = baseYearString + " " +BASE_YEAR_OF_THEMES[$("#option_theme")[0].selectedIndex] ;
            document.getElementById("theme_description").innerHTML = globalLangTokens.themeDescString;
        }
    );	
}

function populateVariables(idTheme, op){
	var selectControl = document.getElementById("option_variables");	
    var option = null;	
    var jsonFiltered = null;
    // Remove elements of "variables" select control 
    var numberOfVariables = selectControl.options.length;
    for (var i = 0; i<numberOfVariables; i++) {
    	selectControl.remove(0);
	}
	
	var strJSONFile = "json/variables.json";
	
    $.getJSON(
        strJSONFile, 
        function(result) {
        	jsonFiltered = result.Variables.filter(function(n){
        		return n.idTheme==idTheme;
        	});
        	
        	// Create first item of SELECT control
			option = document.createElement("option");
        	option.value = globalLangTokens.variableOptionSelectString;
        	option.innerHTML = globalLangTokens.variableOptionSelectString;
        	option.title = "";
        	selectControl.appendChild(option);
        	// Change the variable description to "Select" option (default)
        	document.getElementById("variable_description").innerHTML = globalLangTokens.variableOptionSelectDescription;

        	for (var i=0; i<jsonFiltered.length;i++)
        	{
        		option = document.createElement("option");
				option.value = jsonFiltered[i].codVariable;
				// Read variable
				if (jsonFiltered[i]["variable-" + globalCurrentLanguage]) {
					option.innerHTML = jsonFiltered[i]["variable-" + globalCurrentLanguage];
				} else {
					// default pt-br
					option.innerHTML = jsonFiltered[i]["variable-pt-br"];
				}
				// Read variable description
				if (jsonFiltered[i]["description-" + globalCurrentLanguage]) {
					option.title = jsonFiltered[i]["description-" + globalCurrentLanguage];
				} else {
					// default pt-br
					option.title = jsonFiltered[i]["description-pt-br"];
				}
        		
        		selectControl.appendChild(option);
			}
			// Change variable and description, if there is one
			if (op && op != "") {
				document.getElementById("option_variables").value = op;
				document.getElementById("variable_description").innerHTML = $("#option_variables").find('option:selected').attr('title');
			}
		}
    );
}

/* Change variable DropDownList*/
$("#option_theme").change(function(){
	var idTheme = $(this).val();
	// change the theme description
	document.getElementById("theme_description").innerHTML = $(this).find('option:selected').attr('title');
    document.getElementById("theme_baseyear").innerHTML = globalLangTokens.themeBaseYearString + BASE_YEAR_OF_THEMES[idTheme-1];
	
	//Populate the variable DropDownList
	populateVariables(idTheme, "");
});

/* Change the variable description */
$("#option_variables").change(function(){
	// change the theme description
	document.getElementById("variable_description").innerHTML = $(this).find('option:selected').attr('title');
});

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id)) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id).onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
