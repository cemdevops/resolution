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

	var strJSONFile = "json/themes-" + globalCurrentLanguage + ".json";

    $.getJSON(
        strJSONFile, 
        function(result) {        	
            //find the array and do something
            $.each(result.Themes, function(key,val) {
            	option = document.createElement("option");
		        option.value = val.idTheme;
		        option.innerHTML = val.theme;
		        option.title = val.description;
		        selectControl.appendChild(option);
            });
			// Change the theme description
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
	
	var strJSONFile = "json/variables-" + globalCurrentLanguage + ".json";
	
    $.getJSON(
        strJSONFile, 
        function(result) {
        	jsonFiltered = result.Variables.filter(function(n){
        		return n.idTheme==idTheme;
        	});
        	
        	// criar o primeiro item do SELECT control
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
        		option.innerHTML = jsonFiltered[i].variable;
        		option.title = jsonFiltered[i].description;
        		selectControl.appendChild(option);
			}
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
