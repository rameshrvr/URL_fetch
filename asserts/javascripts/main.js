
(function ($) {
    "use strict";

    var customerUserName;
     /*==================================================================
    [ Focus input ]*/
    $('.input100').each(function(){
        $(this).on('blur', function(){
            if($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })    
    })
  
  
    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        return check;
    });

    // Custom JS functions

    $('#login-button').click(function(){
        customerUserName = $('#username').val();
        var validationData;
        
        // Ajax function definition
        function ajax() {
           return $.ajax({
                url: 'http://127.0.0.1:5000/validate_user',
                data: {
                    'username': customerUserName
                },
                type: 'GET',
                success: function(data){ validationData = data}
            })
        }

        // Ajax function call
        ajax().done(function(){
            if (validationData['user_validation'] == 'Success') {
                // Move to main page
                window.location.href = 'mainwindow.html';
                // Override the pop-up display page
                chrome.browserAction.setPopup({ popup: "mainwindow.html" });
            } else {
                alert('UserName/Password validation failed. Please Try Again!');
            }
        }).fail(function(){ alert('Please enter Username and Password')})
    });


    $('#logout-button').click(function(){
        // Move to LogIn page
        window.location.href = 'welcome.html';
        chrome.browserAction.setPopup({ popup: "welcome.html" });
    });

    //


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(
                /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/
            ) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }

    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
        var tabUrl = tabs[0].url;
        var ajaxResults;

        if (tabUrl.includes('www.google')){
            var regex = /.*&q=(.*)&oq=/g;
            tabUrl = regex.exec(tabUrl)[1].replace(/\+/g, ' ')
        }
        // Ajax for sending browser url to server
        function ajax() {
            return $.ajax({
                url: 'http://127.0.0.1:5000/send_url',
                data: {
                    'url': tabUrl.toString(),
                    'username': customerUserName
                },
                type: 'GET',
                dataType: 'json',
                success: function(data){ ajaxResults = data}
            })
        }
        ajax().done(function(){
            console.log(ajaxResults);
        });
    });
    
    

})(jQuery);
