window.onload = function() {
	populateThemes(0);
	populateVariables(1, "");
	// $('#about-resolution').trigger('click')
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
				// Append new option
		        selectControl.appendChild(option);
            });
			// Change the theme description, if there is one
			if (intTheme && intTheme > 0) {
				document.getElementById("option_theme").value = intTheme;
			}
            document.getElementById("theme_description").innerHTML = $("#option_theme").find('option:selected').attr('title');
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
	
	//Populate the variable DropDownList
	populateVariables(idTheme, "");
});

/* Change the variable description */
$("#option_variables").change(function(){
	// change the theme description
	document.getElementById("variable_description").innerHTML = $(this).find('option:selected').attr('title');
});
