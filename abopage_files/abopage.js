$(document).ready(function() {
    completeCarteBlanche();
    Selectie();
    contactToggle();
    contactForm();
    scrollEase();
    websiteField();
    stickyHeader();
    checkErrorMsg();	
}); // end of document ready

function Selectie() {

    var Target;
    var Month;
    var pType="12";
    var finalUrl;
    var priceList = { 'type':[
			
        {"type":"cl","code":"O-00028002","month":"1","student":"n","price":"49"},
        {"type":"cl","code":"O-00027084","month":"3","student":"n","price":"137"},
        {"type":"cl","code":"O-00029002","month":"3","student":"y","price":"95.90"},
        {"type":"cl","code":"O-00027085","month":"6","student":"n","price":"254"},
		{"type":"cl","code":"O-00029003","month":"6","student":"y","price":"177.80"},
        {"type":"cl","code":"O-00027082","month":"12","student":"n","price":"464"},
        {"type":"cl","code":"O-00029004","month":"12","student":"y","price":"324.80"},
        		
        {"type":"cp","code":"O-00029035","month":"1","student":"n","price":"54"},
        {"type":"cp","code":"O-00029015","month":"6","student":"n","price":"272"},
        {"type":"cp","code":"O-00029017","month":"6","student":"y","price":"195.65"},
        {"type":"cp","code":"O-00029016","month":"12","student":"n","price":"499"},
		{"type":"cp","code":"O-00029018","month":"12","student":"y","price":"359.80"},		
		
		{"type":"di","code":"O-00029056","month":"1","student":"n","price":"36"},
        {"type":"di","code":"O-00029059","month":"3","student":"n","price":"109"},
        {"type":"di","code":"O-00029062","month":"3","student":"y","price":"76.30"},
        {"type":"di","code":"O-00029060","month":"6","student":"n","price":"204"},
		{"type":"di","code":"O-00029072","month":"6","student":"y","price":"142.80"},
        {"type":"di","code":"O-00029061","month":"12","student":"n","price":"369"},
        {"type":"di","code":"O-00029073","month":"12","student":"y","price":"258.30"},
		
		{"type":"dl","code":"O-00029074","month":"1","student":"n","price":"24"},
        {"type":"dl","code":"O-00029059","month":"3","student":"n","price":"69"},
        {"type":"dl","code":"O-00029062","month":"3","student":"y","price":"48.30"},
        {"type":"dl","code":"O-00029060","month":"6","student":"n","price":"129"},
		{"type":"dl","code":"O-00029072","month":"6","student":"y","price":"90.30"},
        {"type":"dl","code":"O-00029061","month":"12","student":"n","price":"229"},
        {"type":"dl","code":"O-00029073","month":"12","student":"y","price":"160.30"},
		
		{"type":"we","code":"O-00029103","month":"1","student":"n","price":"49"},
        {"type":"we","code":"O-00029083","month":"6","student":"n","price":"254"},
		{"type":"we","code":"O-00010010","month":"6","student":"y","price":"120.50"},
        {"type":"we","code":"O-00029088","month":"12","student":"n","price":"464"},
        {"type":"we","code":"O-00010011","month":"12","student":"y","price":"212.30"}
    ]
	
};


    var length=0;
    for (var key in priceList.type) {
        if(priceList.type.hasOwnProperty(key))
            length++;
    }



    var pref = { 'targ':[
        {"targ":"#digital_light_select .ammount","pref":"digital_light","type":"dl"},
        {"targ":"#digital_select .ammount","pref":"digital","type":"di"},
        {"targ":"#classic_select .ammount","pref":"classic","type":"cl"},
        {"targ":"#weekend_select .ammount","pref":"weekend","type":"we"},
        {"targ":"#classic_plus_select .ammount","pref":"classic_plus","type":"cp"}
    ]};


    var lengthObj=0;
    for (var key in pref.targ) {
        if(pref.targ.hasOwnProperty(key))
            lengthObj++;
    }

    setStartAmount();

    function setStartAmount() {
        for (i=0;i<lengthObj;i++){

            for (j=0;j<length;j++) {
                if (priceList.type[j].type==pref.targ[i].type && priceList.type[j].month=="12" && priceList.type[j].student=="n" ) {
                    pret=priceList.type[j].price;
                }
                if (priceList.type[j].type==pref.targ[i].type && priceList.type[j].month=="1" && priceList.type[j].student=="n" ) {
                    pretMonth=priceList.type[j].price;
                }
            }






            spar=pretMonth*12-pret;
            $(pref.targ[i].targ).html(pret+'.-');
            $('[id='+pref.targ[i].pref+'] [class="core accordion-trigger"] .costs .ammount' ).html(pretMonth+'.-');
            $('#'+pref.targ[i].pref+'_select [class="costs total"] .main').remove();
            $('#'+pref.targ[i].pref+'_select [class="costs total"] .extro').remove();
            $('#'+pref.targ[i].pref+'_select [class="costs total"]').append('<div class="main">' +
                '<span class="currency">CHF <strong class="ammount">'+pret+'.-</strong></span>'+
                '</div>'+
                '<div class="extro">'+
                'Sie sparen '+
                '<span class="currency">CHF '+spar+'.-</span>'+
                '</div>');



        }
    }



    var student="n";
    $("#subscriptions").delegate('li', 'click', function () {
        subscrType=$(this).index();
        switch (subscrType) {
            case 0: sType="dl";Price='#digital_light .ammount';Target='#digital_light_select .main';prefix='digital_light';hideFooter();setCxParamDataValue("tam-propertyid","abo-clickedabo");setCxParamDataValue("tam-clickedbundle","B-0000000");break;
            case 1: sType="di";Price='#digital .ammount';Target='#digital_select .main';prefix='digital';hideFooter();setCxParamDataValue("tam-propertyid","abo-clickedabo");setCxParamDataValue("tam-clickedbundle","B-0000001");break;
            case 3: sType="we";Price='#weekend .ammount';Target='#weekend_select .main';prefix='weekend';$('#'+prefix+'_select '+'#'+prefix+'_edu').remove();$('#'+prefix+'_select '+'[for="'+prefix+'_edu"]').remove();hideFooter();delMonth();setCxParamDataValue("tam-propertyid","abo-clickedabo");setCxParamDataValue("tam-clickedbundle","B-0000002");break;
            case 2: sType="cl";Price='#classic .ammount';Target='#classic_select .main';prefix='classic';hideFooter();setCxParamDataValue("tam-propertyid","abo-clickedabo");setCxParamDataValue("tam-clickedbundle","B-0000003");break;
            case 4: sType="cp";Price='#classic_plus .ammount';Target='#classic_plus_select .main';prefix='classic_plus';hideFooter();delMonth();setCxParamDataValue("tam-propertyid","abo-clickedabo");setCxParamDataValue("tam-clickedbundle","B-0000004");break;
        }
    });

    function delMonth() {
        keyword='3 Monate';
        $('#'+prefix+'_select .option_wrap .radios_as_button_row' ).find('div:contains('+keyword+')').remove();
    }

    function hideFooter() {
        if($('#'+prefix+' [class="core accordion-trigger"]').attr("aria-selected")=="true") {
            for (i=0;i<lengthObj;i++) {
                if (pref.targ[i].type==sType) {
                    $('#'+pref.targ[i].pref+' footer .costs').hide();
                    $('#'+pref.targ[i].pref+' footer [class="costs expanded"]').hide();
                } else {$('#'+pref.targ[i].pref+' footer .costs').hide();
                    $('#'+pref.targ[i].pref+' footer [class="costs expanded"]').show();
                }
            }
        } else {
            $(' footer .costs').show();
            $(' footer [class="costs expanded"]').hide();
        }
    }


    $('input[name=subscr-option]').click(function() {
        $("#"+prefix+"_edu").prop("checked", false);
        student="n";
        var subscrPeriod = $( this ).val();
        if(subscrPeriod=="01-year") {
            pType="12";} else {
            pType=subscrPeriod.substring(1,2);
        }

        if (pType==1) {
            $('#'+prefix+'_select '+'#'+prefix+'_edu').remove();
            $('#'+prefix+'_select '+'[for="'+prefix+'_edu"]').remove();
            $('#'+prefix+'_select [class="costs total"] .main .currency').html('<span class="currency">CHF <strong class="promo_ammount">1.-</strong></span>');
            $('#'+prefix+'_select [class="costs total"] .extro').html('<i>Monatlich kündbar</i>');
            student="n";
        }  else if (pType==12) {

        }
        else if (pType!=1 || pType!=12) {

            $('#'+prefix+'_select [class="costs total"] .extro').html('');

        }
        if (pType!=1 && $('#'+prefix+'_edu').html()==null ) {
            $('#'+prefix+'_select .option_wrap [class="form_unit checkbox"]').append("<input id='"+prefix+"_edu' name='edu' type='checkbox' value='edu'><label class='option' for='"+prefix+"_edu'>Preise für Studenten anzeigen</label>");
            student="n"	;
        }
        $("[type=checkbox]").click(function() {
            var studentStat = $( this ).is(":checked");
            switch (studentStat) {
                case true: student="y";NewPrices(Target);break;
                case false: student="n";NewPrices(Target);break;
            }
        });
        NewPrices(Target);
    });



    $("[type=checkbox]").click(function() {
        var studentStat = $( this ).is(":checked");
        switch (studentStat) {
            case true: student="y";NewPrices(Target);break;
            case false: student="n";NewPrices(Target);break;
        }
    });





    function NewPrices(Target) {
        for (i=0;i<length;i++) {
            if (priceList.type[i].type==sType && priceList.type[i].month==pType && priceList.type[i].student==student ) {
                cod=priceList.type[i].code;
                pret=priceList.type[i].price;
            }
            if (priceList.type[i].type==sType && priceList.type[i].month==1) {
                pretMonth=priceList.type[i].price;
            }
        }
		if (pret.indexOf('.') != -1) {
        if (pType==1) {$('#'+prefix+'_select [class="costs total"] .extro').html('danach CHF '+pret+' /Monat<br><i>Monatlich kündbar</i>');}
        else if (pType==12) {$(Target).html('<span class="currency">CHF <strong class="ammount">'+pret+'</strong></span>');
            pret=pretMonth*12-pret;
			if(student=="y") {$('#'+prefix+'_select [class="costs total"] .extro').html('')} else {
            $('#'+prefix+'_select [class="costs total"] .extro').html('Sie sparen CHF'+pret+'');
			}
        } else if (pType!=1 || pType!=12){$(Target).html('<span class="currency">CHF <strong class="ammount">'+pret+'</strong></span>'); }
		} else {
		if (pType==1) {$('#'+prefix+'_select [class="costs total"] .extro').html('danach CHF '+pret+'.- /Monat<br><i>Monatlich kündbar</i>');}
        else if (pType==12) {$(Target).html('<span class="currency">CHF <strong class="ammount">'+pret+'.-</strong></span>');
            pret=pretMonth*12-pret;
			if(student=="y") {$('#'+prefix+'_select [class="costs total"] .extro').html('')} else {
            $('#'+prefix+'_select [class="costs total"] .extro').html('Sie sparen CHF '+pret+'.- ');
			}
        } else if (pType!=1 || pType!=12){$(Target).html('<span class="currency">CHF <strong class="ammount">'+pret+'.-</strong></span>'); }
		}
		
        var launchHost=location.protocol+"//"+window.location.host;
        var rot=launchHost+"/tamstorefront/tamedia/product/add/";
        finalUrl=rot+cod+"?kavz="+kavz;
		
		setCxParamDataValue("tam-newoffer",cod);		
    }
	
	
    $('body').find('button').bind('click',function (e) {
	    e.preventDefault();		        
        NewPrices(Target);
        window.location.href=finalUrl;
		//setCxParamDataValue("tam-propertyid","abo-clickedorder");
    });



}

function completeCarteBlanche() {

    $.ajax({
	type: "GET",
	dataType: "json",
	url: "http://mobile2.tagesanzeiger.ch/api/categories/51500dcbca9ac26a890000c9",  
	success: function (data) {
            $(document).trigger('ajax_inserted');
            rssF=data.category.page_elements[0].articles;



            var FeedLong=0;
            for (var articles in data.category.page_elements[0]) {
                if(data.category.page_elements[0].hasOwnProperty(articles))
                    FeedLong++;
            }

					
			
            
            function compPubD(p1, p2) {
                var pDat1 = Date.parse(p1.refresh);
                var pDat2 = Date.parse(p2.refresh);
                return pDat2 - pDat1;
            }

            rssF.sort(compPubD);


            var sections=["latest", "stage", "music", "cinema", "exhibition-museum", "travel-pleasure", "sports","read-know"];
            var categ=["Aktuell","Musik","Buehne","BÃ¼hne","Kino","Reisen-und-Genuss","Reisen & Genuss","Messe","Lesen-und-Wissen","Lesen & Wissen", "Austellung & Museum","Austellung-und-Museum","Sport"];
            var wrap =  [
                {"categ":"Aktuell","wrap":"Musik","section":"latest","header":"Musik"},
                {"categ":"reisen-und-genuss","wrap":"Musik","section":"travel-pleasure","header":"Reisen & Genuss"},
                {"categ":"musik","wrap":"Musik","section":"music","header":"Musik"},
                {"categ":"buehne","wrap":"Kino","section":"stage","header":"Bühne"},
                {"categ":"kino","wrap":"Kino","section":"cinema","header":"Kino"},
                {"categ":"lesen-und-wissen","wrap":"Musik","section":"read-know","header":"Lesen & Wissen"},
                {"categ":"austellung-und-museum","wrap":"Musik","section":"exhibition-museum","header":"Ausstel­lungen"},
                {"categ":"sport","wrap":"Sport","section":"sports","header":"Sport"}
            ]


            document.getElementById('princeps').style.display="none";


            var wrapLong=0;
            for (var key in wrap) {
                if(wrap.hasOwnProperty(key))
                    wrapLong++;
            }
			
			//For debugging
			//for (j=0;j<FeedLong;j++){
			//console.log(rssF[j]);
			//}
			
			
			

            for(i=0;i<wrapLong;i++) {
                k=0;
                for (j=0;j<FeedLong;j++){
					if (rssF[j] !== undefined ) {
					if(rssF[j].article_elements[0] !== undefined) {
					if(rssF[j].article_elements[0].links) {
					varLink=rssF[j].article_elements[0].links[0].name;
					urlLink=rssF[j].article_elements[0].links[0].url;
					varTitleL=rssF[j].article_elements[0].title;
					} else {varLink=''; urlLink='';varTitleL=''}
					} else {varLink=''; urlLink='';varTitleL=''}
					if(rssF[j].article_elements[1] == undefined) {varHtml='';varTitle=''} else {
					varTitle=rssF[j].article_elements[1].title;
					if(rssF[j].article_elements[1].html) {
					varHtml=rssF[j].article_elements[1].html} else {varHtml='';rssF[j].article_elements[1].title=''}
					}
                    variabila='<header aria-selected="false" data-accordion-trigger>'+
                        '<figure>'+
                        '<img alt'+rssF[j].title+' class="rss_picture" src='+rssF[j].picture_big_url+' title='+rssF[j].title+' width="420" height="250">'+
                        '<figcaption>'+
                        '<h3 class="rss_title">'+rssF[j].title+'</h3>'+
                        '<p class="rss_description"></p>'+
                        '</figcaption>'+
                        '</figure>'+
                        '</header>'+
                        '<div aria-expanded="false" aria-hidden="true" class="component_panel" data-accordion-collapsible>'+
                        '<aside>'+
                        '<figure>'+
                        '<img alt='+rssF[j].title+' class="rss_picture" src='+rssF[j].picture_big_url+' title='+rssF[j].title+'>'+
                        '</figure>'+
                        '<p class="rss_text"><font size="4"><b>'+varTitleL+'</b></font><br><br><a href="'+urlLink+'" target="_blank">'+varLink+'</a></p>'+
						'<p class="rss_text"><font size="4"><b>'+varTitle+'</b></font>'+varHtml+'</p>'+
                        '</aside>'+
                        '<article>'+
                        '<header>'+
                        '<h1 class="rss_title">'+rssF[j].title+'</h1>'+
                        '</header>'+
                        '<div class="main">'+
                        '<p class="rss_text">'+rssF[j].text+'</p>'+
                        '</div>'+
                        '</article>'+
                        '</div></li>'

                    if(rssF[j].statistics[2].customVars[2].value.replace('carteblanche/','')==wrap[i].categ){
                        if(k%4==0) {fillClear(wrap[i].section,wrap[i].wrap);} else if ((k-2)%4==0) {fillSmall(wrap[i].section,wrap[i].wrap);} else {fill(wrap[i].section,wrap[i].wrap);}
                        k++;
                    
					}
					}
                }
            }





            for (j=0;j<FeedLong;j++){
				if (rssF[j] !== undefined) {
				if(rssF[j].article_elements[0] !== undefined) {
				if(rssF[j].article_elements[0].links) {
				varLink=rssF[j].article_elements[0].links[0].name;
				urlLink=rssF[j].article_elements[0].links[0].url;
				varTitleL=rssF[j].article_elements[0].title;
				} else {varLink=''; urlLink='';varTitleL=''}
				} else {varLink=''; urlLink='';varTitleL=''}
				if(rssF[j].article_elements[1] == undefined) {varHtml='';varTitle=''} else {
				varTitle=rssF[j].article_elements[1].title;
				if(rssF[j].article_elements[1].html) {
				varHtml=rssF[j].article_elements[1].html} else {varHtml='';rssF[j].article_elements[1].title=''}
				}
                variabila='<header aria-selected="false" data-accordion-trigger>'+
                    '<figure>'+
                    '<img alt'+rssF[j].title+' class="rss_picture" src='+rssF[j].picture_big_url+' title='+rssF[j].title+' width="420" height="250">'+
                    '<figcaption>'+
                    '<h3 class="rss_title">'+rssF[j].title+'</h3>'+
                    '<p class="rss_description"></p>'+
                    '</figcaption>'+
                    '</figure>'+
                    '</header>'+
                    '<div aria-expanded="false" aria-hidden="true" class="component_panel" data-accordion-collapsible>'+
                    '<aside>'+
                    '<figure>'+
                    '<img alt='+rssF[j].title+' class="rss_picture" src='+rssF[j].picture_big_url+' title='+rssF[j].title+'>'+
                    '</figure>'+
                    '<p class="rss_text"><font size="4"><b>'+varTitleL+'</b></font><br><br><a href="'+urlLink+'" target="_blank">'+varLink+'</a></p>'+
					'<p class="rss_text"><font size="4"><b>'+varTitle+'</b></font>'+varHtml+'</p>'+
                    '</aside>'+
                    '<article>'+
                    '<header>'+
                    '<h1 class="rss_title">'+rssF[j].title+'</h1>'+
                    '</header>'+
                    '<div class="main">'+
                    '<p class="rss_text">'+rssF[j].text+'</p>'+
                    '</div>'+
                    '</article>'+
                    '</div></li>'
                if(j%4==0) {fillClear("latest","Musik");} else if ((j-2)%4==0) {fillSmall("latest","Musik")} else {fill("latest","Musik");}
				
				}
            }




            function fill(cl,cat) {
                $('[id="'+cl+'"] .subsection_panel [class="grid tab_acco two_four"]').append('<li class="component_wrap level_02 '+cat+' " data-accordion-panel="collapsed">'+variabila);
            }

            function fillClear(cl,cat) {
                $('[id="'+cl+'"] .subsection_panel [class="grid tab_acco two_four"]').append('<li class="component_wrap level_02 '+cat+' clear large_grid " data-accordion-panel="collapsed">'+variabila);
            }

            function fillSmall(cl,cat) {
                $('[id="'+cl+'"] .subsection_panel [class="grid tab_acco two_four"]').append('<li class="component_wrap level_02 '+cat+' clear small_grid " data-accordion-panel="collapsed">'+variabila);
            }

            function deleteSections () {

                for(m=0;m<wrapLong;m++){
                    count=0;
                    for(n=0;n<FeedLong;n++){
						if(rssF[n]) {
                        if(rssF[n].statistics[2].customVars[2].value.replace('carteblanche/','')===wrap[m].categ){count++;}
						}
                    }
                    if (count==0 && wrap[m].section!="latest"){
                        $('[id="'+wrap[m].section+'"]').css({"backgroundColor":"#C0C0C0","color":"#C0C0C0"});						
                    }
                }

            }
        }
    });
}
function contactForm() {
    $("#submit_btn").click(function() {
			
        // Collect input field values
        var user_name       = $('input[name=name]').val();
        var user_email      = $('input[name=email]').val();
        var user_reason     = $('select[name=reason]').val();
        var user_website    = $('input[name=website]').val();
        var user_message    = $('textarea[name=message]').val();

        // Simple js validation
        var proceed = true;
        if(user_name=="") {
            $('input[name=name]').css('border-color','#dd1122');
            proceed = false;
        }
        if(user_email=="") {
            $('input[name=email]').css('border-color','#dd1122');
            proceed = false;
        }
        /* if(user_reason=="") {
            $('select[name=reason]').css('border-color','red');
            proceed = false;
        } // commented out - not mandatory */
        if(user_message=="") {
            $('textarea[name=message]').css('border-color','#dd1122');
            proceed = false;
        }

        // Fields are all populated
        if(proceed) {

            // Collect data to be sent to server
            post_data = {'userName':user_name, 'userEmail':user_email, 'userReason':user_reason, 'userWebsite':user_website, 'userMessage':user_message};

            // Post data to server using ajax
            $.post('abopage_files/contact_formprocessing.php', post_data, function(data){

                // Replace form with success message using replaceWith
                $("#contact_form").replaceWith('<div id="result"><div class="success">'+data+'</div></div>');

                // Reset values in input fields
                $('#contact_form input[type="text"]').val('');
                $('#contact_form select').val(''); // not sure if working
                $('#contact_form textarea').val('');

            }).fail(function(err) {  // Load any error data into #result using slideDown
                // $("#result").hide().html('<div class="error">'+err.statusText+'</div>').slideDown();
                $("#result").html('<div class="error">'+err.statusText+'</div>');
            });
        }

    });

    // Reset previously set border colors on keyup
    $("#contact_form input, #contact_form textarea").keyup(function() {
        $("#contact_form input, #contact_form textarea").css('border-color','');
    });
}
function contactToggle() {

    // set vars, easing (0/1), effect, speed
    var easing = 1
    var easing_effect = 'easeInOutQuad';
    var animation_speed = 350

    // initially set margin
    $('#contact-slider').css("margin-right", "-342px");

    // click function
    $('#js-contact-toggler').click(function(){

        // current state of slider
        var is_collapsed = $('#contact-slider').css("margin-right") == "-342px" && !$(this).is(':animated');

        // set prefix (collapsed+/expanded-)
        var sign = (is_collapsed) ? '+' : '-';

        // prevent double click
        if(!$(this).is(':animated')) {
            if(easing) $('#contact-slider').animate({"margin-right": sign+'='+342},animation_speed,easing_effect);
            else $('#contact-slider').animate({"margin-right": sign+'='+342},animation_speed);
        }
        //if you need you can add class when expanded // probably no need
        (is_collapsed) ? $('#contact-slider').removeClass('expanded') : $('#contact-slider').addClass('expanded');

    });
}

function scrollEase() {
    $(".section_anchor").click(function() {
        $("html, body").animate({
            scrollTop: $($(this).attr("href")).offset().top + "px"
        }, {
            duration: 800,
            easing: "linear"
        });
        return false;
    });
}

function websiteField() {
    // Hide website field in contact form
    $("#websitefield").hide();
}

function stickyHeader() {
    var offset = $( ".visual_wrap" ).offset();
    var sticky = document.getElementById("visual_wrap")
    $(window).scroll(function() {
        if ($(window).scrollTop() > offset.top) {
            $('#page_header').addClass('fixed');
            $('#content').addClass('sticky');
        } else {
            $('#page_header').removeClass('fixed');
            $('#content').removeClass('sticky');
        }
    });
};

function checkErrorMsg() {
    $('.status-message .error').load('active-error.txt', [], function(response, status, XMLHttpRequest){
        if ('success' != status) {
            // do nothing
        } else {
            $('.status-message .error').show();
}
    });
};

//Cxense procedure

//Tam-target settings
//if (document.referrer.indexOf('mobile') > -1) {tamtarget="mobile_site"} else {tamtarget="desktop_site"};
var ua = navigator.userAgent.toLowerCase();
var isAndroid = ua.indexOf("android") > -1;
if (document.referrer.indexOf('mobile') > -1) {tamtarget="mobile_site"} 
else if (isAndroid) { tamtarget="native_android_phone"}
else {tamtarget="desktop_site"};



//Monitoring the events

$("#services").delegate('li', 'click', function () {
        subscrType=$(this).index();
		switch (subscrType) {
            case 0: setCxParamDataValue("tam-propertyid","abo-services");setCxParamDataValue("tam-services","Ferienunterbruch");break;
            case 1: setCxParamDataValue("tam-propertyid","abo-services");setCxParamDataValue("tam-services","Ferienumleitung");break;
            case 2: setCxParamDataValue("tam-propertyid","abo-services");setCxParamDataValue("tam-services","Adressänderung");break;
            case 3: setCxParamDataValue("tam-propertyid","abo-services");setCxParamDataValue("tam-services","Zustellprobleme");break;
            case 4: setCxParamDataValue("tam-propertyid","abo-services");setCxParamDataValue("tam-services","Onlinearchiv");break;
			case 5: setCxParamDataValue("tam-propertyid","abo-services");setCxParamDataValue("tam-services","Carte Blanche");break;
            case 6: setCxParamDataValue("tam-propertyid","abo-services");setCxParamDataValue("tam-services","Abo ändern");break;
            case 7: setCxParamDataValue("tam-propertyid","abo-services");setCxParamDataValue("tam-services","Digitalabo freischalten");break;            
        }
    });
	
	
$("#carte_blanche_wrap").delegate('li', 'click', function () {
        subscrType=$(this).index();
		switch (subscrType) {
            case 0: setCxParamDataValue("tam-propertyid","abo-carteblanche");setCxParamDataValue("tam-cartebl-cat","Latest");break;
            case 1: setCxParamDataValue("tam-propertyid","abo-carteblanche");setCxParamDataValue("tam-cartebl-cat","Bühne");break;
            case 2: setCxParamDataValue("tam-propertyid","abo-carteblanche");setCxParamDataValue("tam-cartebl-cat","Musik");break;
            case 3: setCxParamDataValue("tam-propertyid","abo-carteblanche");setCxParamDataValue("tam-cartebl-cat","Kino");break;
            case 4: setCxParamDataValue("tam-propertyid","abo-carteblanche");setCxParamDataValue("tam-cartebl-cat","Austellungen");break;
			case 5: setCxParamDataValue("tam-propertyid","abo-carteblanche");setCxParamDataValue("tam-cartebl-cat","Reisen & Genus");break;
            case 6: setCxParamDataValue("tam-propertyid","abo-carteblanche");setCxParamDataValue("tam-cartebl-cat","Sport");break;
            case 7: setCxParamDataValue("tam-propertyid","abo-carteblanche");setCxParamDataValue("tam-cartebl-cat","Lesen & Wissen");break;            
        }
    });	


$("#section_anchor_01").bind('click', function () {
        setCxParamDataValue("tam-propertyid","abo-clickedabo");     
    });
$("#section_anchor_02").bind('click', function () {
        setCxParamDataValue("tam-propertyid","abo-services");     
    });
$("#section_anchor_03").bind('click', function () {
        setCxParamDataValue("tam-propertyid","abo-carteblanche");     
    });	
$("#section_anchor_04").bind('click', function () {
        setCxParamDataValue("tam-propertyid","abo-faq");     
    });	
            
$("#questions").delegate('li', 'click', function () {
        setCxParamDataValue("tam-propertyid","abo-faq");     
    });	

$("#kont").bind('click', function () {
        setCxParamDataValue("tam-propertyid","abo-contact");     
    });	

$("#submit_btn").bind('click', function () {
		setCxParamDataValue("tam-propertyid","abo-contact-send");
	});	
	
$("#tagi_back").bind('click', function () {
		setCxParamDataValue("tam-propertyid","abo-back2tagi");
	});

	
	


$(window).load(function () {
        initCXense();
    });
    function initCXense()
    {   
		
        TAMSiteId = "9222261986533147877"; 
        cxParamD ='[{ "tam-landingpage", "abopage"}'+
        ',{ "tam-loggedin-state", "not-logged-in"}'+
		',{ "tam-target", "'+tamtarget+'"}'+
		',{ "tam-propertyid", ""}'+
        ',{ "tam-pagetype", "campaign_landing_page"}'+
        ',{ "tam-lastpagebef-login", "abopage"}'+
        ',{ "tam-lastpagebef-checkout", "abopage"}'+
        ',{ "tam-campaign", ""}]';      
		
        triggerCxPageTracking();
    }

cxParamData = "";  //Defining global variable cxParamData
function triggerCxEventTracking() {
			location.hash = "#" + "clicked" + Math.random();
			$(window).bind('hashchange', function() { cX.callQueue.push(['invoke', function() { sendAnnotatedPageViewEvent(); }]); });	
	}
	
function triggerCxPageTracking() {
			cxParamD=cxParamD.replace(/\s/g, "");
			cxParamD=cxParamD.replace(/"tam-/g,'"cp_name":"tam-');
			cxParamD=cxParamD.replace(/,/g,',"cp_value":');
			cxParamD=cxParamD.replace(/"cp_value":{/g,'{');
			cxParamData=JSON.parse(cxParamD);
			cX.callQueue = cX.callQueue || [];
			cX.callQueue.push(['invoke', function() { sendAnnotatedPageViewEvent(); }]);
	}	
// CMS Json Data
function cmsCustom() {
			var lst = window.location.hash;
			lst=lst.slice(1);				
			if (lst=="poa" || lst=="pol" || lst=="ra" || lst=="rl") {
			switch(lst)	{
			case "poa" : lastpagebef="pyw-overlay-anonymous";break;
			case "pol" : lastpagebef="pyw-overlay-logged-in";break;
			case "ra" : lastpagebef="pyw-reminder-anonymous";break;
			case "rl" : lastpagebef="pyw-reminder-logged-in";break;
			}			
			} else {
			lastpagebef=" ";
			}
			cX.startSessionAnnotation({"tam-lastpagebef-abopg": ('' + lastpagebef).toLowerCase()});	
			if(kavz!=""){replaceCxParamDataValue( "tam-campaign", kavz)}			
			//Reading the Json			
			for(i=0;i<cxParamData.length;i++){
				if (cxParamData[i].cp_name=="tam-propertyid" && cxParamData[i].cp_value=="") {cxParamData[i].cp_value="abo-frontpage"};
				obj={};
				obj[cxParamData[i].cp_name]=cxParamData[i].cp_value;				
				cX.setCustomParameters(obj);
				}
}				
//Events controls
				
				
function setCxParamDataValue(key,value) {
				for (i=1;i<cxParamData.length;i++) {
					if(cxParamData[i].cp_name==key) {
					cxParamData.splice(i,1);
						}
					}
				cxParamData.push({cp_name:key,cp_value:value});
				triggerCxEventTracking();	
}

function replaceCxParamDataValue( field, newvalue ) {
			for( k = 0; k < cxParamData.length; k++ ) {
					 if( cxParamData[k].cp_name==field) {
						cxParamData[k].cp_value = newvalue ;
					}
				}
	
}

//Sending page view events and tracked events to Cxense

function sendAnnotatedPageViewEvent() {
			cX.initializePage();
			cmsCustom();
			cX.setSiteId(TAMSiteId);
			cX.sendPageViewEvent();
			cX.stopAllSessionAnnotations();
}

(function() { try { var scriptEl = document.createElement('script'); scriptEl.type = 'text/javascript'; scriptEl.async = 'async';
    scriptEl.src = ('https:' == document.location.protocol) ? 'https://scdn.cxense.com/cx.js' : 'http://cdn.cxense.com/cx.js';
    var targetEl = document.getElementsByTagName('script')[0]; targetEl.parentNode.insertBefore(scriptEl, targetEl); } catch (e) {};})();



//Hide Costs and auswahlen_button when Promo is Selected
$(document).ready(function() {
	if($(window).width()>918.25 ){
		$('.core > .main').on('click',function(){
			$( ".component_wrap.subscription" ).each(function( index ) {
				$(this).find('.costs, .auswahlen_button').css('visibility','visible');
				$(this).find('.core header').css("background","#e4e4e4");//Suscription Backgrounds for default
				$(this).find('.core .main').css("background","#f2f2f2");//Suscription Backgrounds for default
				$(this).find('.footer-suscriptions').css("background","#f2f2f2");//Suscription Backgrounds for default
			});
			$(this).find('.costs, .auswahlen_button').css('visibility','hidden');
			$(this).parent().find('header').css("background","#d0e7ec");//Suscription Backgrounds for selected
			$(this).css("background","#e9f8fb");//Suscription Backgrounds for selected
			$(this).find('.footer-suscriptions').css("background","#e9f8fb");//Suscription Backgrounds for selected
			

		});	
		
		
	}
	else if($(window).width()<752 ) {
		$('.core header .auswahlen_button-mobile').on('click',function(){
			$('.auswahlen_button-mobile').css('visibility','visible');
			$(this).css('visibility','hidden');
		});	
	}

	if($(window).width()<458 ){
	$('.content_wrap .component_wrap.subscription').on('click',function(){
		$( ".subscription " ).each(function( index ) {
			$(this).find('.core').css('border','1px solid #b3b3b3');
		});
		$(this).find('.core').css({'border':'2px solid #0070c0','top':'-2px'});
	});	
	}
	
	//Hide Show Auswahlen Button for mobile or Desktop
	if($(window).width()<983 ){
			$(".auswahlen_button").css("display","none");
			$(".auswahlen_button-mobile").css("display","block");
	}
	else{
		$(".auswahlen_button").css("display","block");
		$(".auswahlen_button-mobile").css("display","none");
	}
	
	
	$( window ).resize(function() {
		if($(window).width()<983 ){
			$(".auswahlen_button").css("display","none");
			$(".auswahlen_button-mobile").css("display","block");
		}
		else{
			$(".auswahlen_button").css("display","block");
			$(".auswahlen_button-mobile").css("display","none");
		}
		if($(window).width()<918.25){
			$( ".component_wrap.subscription" ).each(function( index ) {
				$(this).find('header').css("background","#fff");//Suscription Backgrounds for default
				$(this).find('.core .main').css("background","transparent");//Suscription Backgrounds for default
				$(this).find('.footer-suscriptions').css("background","#fff");//Suscription Backgrounds for default
			});
		}
	});
	
	
}); // end of document ready

