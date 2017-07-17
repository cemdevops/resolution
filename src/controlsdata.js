window.onload = function() {
	populateThemes();
    populateVariables(1);
};

function populateThemes(){
	var selectControl = document.getElementById("option_theme");	
    var option = null;
    
    $.getJSON(
        "src/themes.json", 
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
            document.getElementById("theme_description").innerHTML = $("#option_theme").find('option:selected').attr('title');
        }
    );	
}

function populateVariables(idTheme){
	var selectControl = document.getElementById("option-variables");	
    var option = null;	
    var jsonFiltered = null;
    // Remove elements of "variables" select control 
    var numberOfVariables = selectControl.options.length;
    for (var i = 0; i<numberOfVariables; i++) {
    	selectControl.remove(0);
    }

    $.getJSON(
        "src/variables.json", 
        function(result) {           	
        	jsonFiltered = result.Variables.filter(function(n){
        		return n.idTheme==idTheme;
        	});
        	
        	// criar o primeiro item do SELECT control
        	option = document.createElement("option");
        	option.value = "selecione";
        	option.innerHTML = "Selecione";
        	option.title = "";
        	selectControl.appendChild(option);
        	// Change the variable description
        	document.getElementById("variable_description").innerHTML = "Selecione uma variável";

        	for (var i=0; i<jsonFiltered.length;i++)
        	{
        		option = document.createElement("option");
        		option.value = jsonFiltered[i].codVariable;
        		option.innerHTML = jsonFiltered[i].variable;
        		option.title = jsonFiltered[i].description;
        		selectControl.appendChild(option);
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
	populateVariables(idTheme);
});

/* Change the variable description */
$("#option-variables").change(function(){
	// change the theme description
	document.getElementById("variable_description").innerHTML = $(this).find('option:selected').attr('title');
});
