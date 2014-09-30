/*
 * Modified autocomplete plugin.
 * Binded to postcode input, but it autocompletes the town.
 */


jQuery.fn.autocompleteZipPlugin = function (options) {
	var $this = this;
	var options = jQuery.extend({}, options);
	
	jQuery(this).find('#address\\.postcode').keypress(function(e){
	      if (e.which == 13){
	      	return false;
	       }
    });
	
	jQuery(this).find('#address\\.postcode').autocomplete({
		source: function( request, response ) {                            
			jQuery.ajax({
               url: "/tamstorefront/autocomplete/zip",
               dataType: "json",
               data: request,
               success: function(data){
            	    jQuery(".zip.ui-autocomplete").empty();
            	    jQuery(".zip.ui-autocomplete").show();
            	    jQuery('#address\\.townCity').val("");

            	    var items = [];
            	    var array = new Array();
	       			for (var i=0;i<data.length;i++) {
	       				items.push('<option class="ui-menu-item" >' + data[i].cityName + '</option>');
	       			}
	       			
	       			if (items.length == 1) {
	       				jQuery('#address\\.townCity').val(data[0].cityName);
	       			} else if (items.length > 0) {
	       				enableTownDropdown(items.length);
	       			} else {
	       				disableTownDropdown();
	       			}
	       			
	       			if (items.length == 0) {
	       				placeErrorMessage();
	       			} else {
	       				clearErrorMessage();
	       			}
	       			
       			 	jQuery(".zip.ui-autocomplete").append( items.join('') );
       			 	initializeSelectionEvent();
       			 	inializeSelectOptionEvent();
               }
           });
		},
       	minLength: 4,
	});
	
	initializeZipCodeEvent();	
	initializeCountryChangeEvent();
	setInitialStateOfAutocomplete();
}

function placeErrorMessage() {
	jQuery(".zip.ui-autocomplete").parent().addClass('form_field_error');
	jQuery(".zip.ui-autocomplete").after('<span id="address.street.dropdown.errors" class="errors">Ungültige Postleitzahl für die Schweiz. Bitte ändern Sie zuerst das Land, wenn Sie keine Schweizer Adresse eingeben möchten.</span>')
}


function clearErrorMessage() {
	jQuery("#address\\.street\\.dropdown\\.errors").remove();
	jQuery(".zip.ui-autocomplete").parent().removeClass('form_field_error');
}


/*
 * Enable the autocomplete dropdown i.e.: 
 * 	1. set the size of the number of items that are result
 *  2. set the class 'multiple' on the select tag
 */
function enableTownDropdown(length) {
	var newSize = 1;
	if (length > 7) {
		newSize = 7
	} else {
		newSize = length;
	}
	jQuery(".zip.ui-autocomplete").attr("size", newSize);
	jQuery(".zip.ui-autocomplete").addClass("multiple");
}

/*
 * Disable the autocomplete dropdown i.e.:
 * 1. set the size to 1. (default)
 * 2. remove the 'multiple' class 
 */
function disableTownDropdown() {
	jQuery(".zip.ui-autocomplete").attr("size", 1);
	jQuery(".zip.ui-autocomplete").removeClass("multiple");
}


/*
 * Hide town input, show town dropdown.
 */
function showTownDropdown() {
	jQuery('#address\\.townCity').hide();
	jQuery(".zip.ui-autocomplete").show();
}


/*
 * Hide the town dropdown, show the town input.
 */
function hideTownDropdown() {
	jQuery(".zip.ui-autocomplete").hide();
	jQuery('#address\\.townCity').show();
}

/*
 * Reset search i.e.:
 *  1. empty the town dropdown
 *  2. disable it
 *  3. empty the town input 
 */
function resetSearch() {
	jQuery(".zip.ui-autocomplete").empty();
	disableTownDropdown();
	jQuery('#address\\.townCity').val("");
	clearErrorMessage();
}


/*
 * Check if new and old value are CH, if yes then returns true.
 * Also 'undefined' is possible - this CH because this one is preselected when form is shown 
 * for first time.
 */
function resetNeededForTownAndPostal(oldValue, newValue) {
	
	if ((oldValue == "CH" || oldValue === undefined) || (newValue == "CH")) {
		return true;
	}
	return false;
}


/*
 * Bind the keypress event on the selection dropdown.
 * The keypress event is for selection of option - when 'enter' is pressed. 
 * Value from selected option is taken, this one is set to the town input - and then disable dropdown.
 * 
 * Before that hide the town input. 
 */
function initializeSelectionEvent() {
	jQuery('#address\\.townCity').hide();
	
	//for pressing enter from keyboard
	jQuery("select.zip.ui-autocomplete.ui-menu").keypress(function(e) {
		var selectedValue = jQuery(this).children(":selected").html();
		jQuery('#address\\.townCity').val(selectedValue);
		
		disableTownDropdown();
	});
}


/*
 * Bind 'click' event on the option tags inside the select dropdown.
 * Value from the 'clicked' option is taken and set to the town input - and then disable dropdown.
 * 
 */
function inializeSelectOptionEvent() {
	//for clicking some option element
	jQuery("select.zip.ui-autocomplete.ui-menu option.ui-menu-item").click(function(e){
		var selectedValue = jQuery(this).html();
		jQuery('#address\\.townCity').val(selectedValue);
		
		disableTownDropdown();
	})
}

/*
 *  Additional event binded to the postcode input (despite the 'autocomplete' plugin).
 *  This is used for handling typing when lenght is less than 4 chars.
 *  
 */
function initializeZipCodeEvent() {
	jQuery("#address\\.postcode").keyup(function(e){
		
		//initialize the 'first' state - where preselected country is CH already and user starts typing in the zip code.
		//hide the existing town input, show the  
		var countryVal = jQuery("#address\\.country").val();
		var autocompleteHidden = jQuery(".zip.ui-autocomplete").is(':hidden');
		if (countryVal == "CH" && autocompleteHidden) {
			showTownDropdown();
		}
		
		//whenever user has less than 4 chars - reset the state
		var lenght = jQuery(this).val().length;
		if (lenght < 4) {
			resetSearch();
		}
	})
}


/*
 * Bind 'change' event of the country dropdown - so whenever the value is changed and source or target is CH, reset the state and enable/disable
 * the town dropdown.
 */
function initializeCountryChangeEvent() {
	jQuery("#address\\.country").change(function() {
		jQuery(this).data("old", jQuery(this).data("new") || jQuery(this).attr("origValue"));
		jQuery(this).data("new", jQuery(this).val());
	    
		var oldValue = jQuery(this).data("old");
		var newValue = jQuery(this).data("new");
		
		if (resetNeededForTownAndPostal(oldValue, newValue)) {
			jQuery("#address\\.postcode").val("");
			jQuery("#address\\.townCity").val("");
			
			if (newValue == "CH") {
				jQuery("#address\\.postcode" ).autocomplete({ disabled: false });
				showTownDropdown();
			} else {
				jQuery("#address\\.postcode" ).autocomplete({ disabled: true });
				hideTownDropdown();
			}
		}
		clearErrorMessage();
	});
}


/*
 * This is needed to setup the initial state of the autocomplete.
 * It might be that the user already has existing address, in that case we don't want to change the
 * existing town with the dropdown.
 */
function setInitialStateOfAutocomplete() {
	
	var countryVal = jQuery("#address\\.country").val();
	if (countryVal == "CH") {
		var townLength = jQuery('#address\\.townCity').val().length;
		if (townLength > 0) {
			hideTownDropdown();
		} else {
			showTownDropdown();
		}
		
		jQuery("#address\\.postcode" ).autocomplete({ disabled: false });
	} else {
		jQuery("#address\\.postcode" ).autocomplete({ disabled: true });
		hideTownDropdown();
	}
		
}

 

