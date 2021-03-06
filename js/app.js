// ”Job Role” section
// create focus on first input for Name
$('#name').focus();




// ”T-Shirt Info” section
function colors(one, two, three) {
  $('#color option').each(function() {
    $(this).attr('disabled', false);
    let $value = $(this).val();
    if($value !== one && $value !== two && $value !== three) {
      $(this).attr('disabled', 'disabled');
    }
  });
};

// when T-shirt design is selected, evaluate what color options are available
$('#colors-js-puns').css('display', 'none');
$('#design').change(function() {
  let $designSelection = $(this).val();
  if($designSelection === 'js puns') {
    colors('cornflowerblue', 'darkslategrey', 'gold');
  }else if($designSelection === 'heart js'){
    colors('tomato', 'steelblue', 'dimgrey');
  }else{
    $('#color option').each(function() {
      $(this).attr('disabled', false);
    });
  }
  $('#colors-js-puns').css('display', 'inline-block');
});




// ”Register for Activities” section
// Used ".slice" to select the portion of the list of "input" relevant to
// overlaping time slots
const $activitieConflict = $('.activities input').slice(1,5);
function checker(input, boolean, font) {
  // selecting the portion of the text relevant for evaluation
  let $timeSlot = input.parent().text().split('-');
  $timeSlot = $timeSlot[1].split(',');

  // evaluate each option of group
  $activitieConflict.each(function() {
    if(!$(this).prop('checked')) {
      let $label = $(this).parent().text();
      if($label.indexOf($timeSlot) > 0) {
        $(this).attr('disabled', boolean);
        $(this).parent().css('color', font);
      }
    }
  })
}

$activitieConflict.click(function() {
  if($(this).prop('checked')) {
    // disable options if a selection overlaps another selection with same day and time
    checker($(this), true, '#7f7f7f');
  }else{
    // enables all disabled options when option is deselected.
    checker($(this), false, '#000');
  }
});

// - As a user selects activities, a running total should display below the list
//   of checkboxes. For example, if the user selects "Main Conference", then
//   Total: $200 should appear. If they add 1 workshop, the total should change
//   to Total: $300.

const $activityInput = $('.activities input');
let runningTotal = 0;
function addOrSubtract(selection, cost) {
  if(selection.prop('checked')) {
    runningTotal += Number.parseInt(cost, 10);
  }else{
    runningTotal -= Number.parseInt(cost, 10);
  }
}

$activityInput.click(function() {
  let $activitieCost = $(this).parent().text().split('$');
  if(runningTotal === 0) {
    addOrSubtract($(this), $activitieCost[1]);
    $('.activities').append('<h2>Total: $' + runningTotal + '</h2>');
  }else{
    addOrSubtract($(this), $activitieCost[1]);
    if(runningTotal === 0) {
      $('.activities h2').remove();
    }else{
      $('.activities h2').html('Total: $' + runningTotal);
    }
  }
})
// selecting the portion of the text relevant for evaluation





// "Payment Info" section
// Display payment sections based on the payment option chosen in the select menu.
// - The "Credit Card" payment option should be selected by default. Display the
//   #credit-card div, and hide the "PayPal" and "Bitcoin" information. Payment
//   option in the select menu should match the payment option displayed on the
//   page.
// - When a user selects the "PayPal" payment option, the PayPal information
//   should display, and the credit card and “Bitcoin” information should be
//   hidden.
// - When a user selects the "Bitcoin" payment option, the Bitcoin information
//   should display, and the credit card and “PayPal” information should be hidden.
// NOTE: The user should not be able to select the "Select Payment Method" option
// from the payment select menu, because the user should not be able to submit
// the form without a chosen payment option.

$('#credit-card ~ div').css('display', 'none');
$('#payment').change(function() {
  let $paymentOption = $('#payment').val();
  $('#payment option:first-of-type').attr('disabled', 'disabled');
  if($paymentOption === 'paypal') {
    $('#payment ~ div').css('display', 'none');
    $('#credit-card + div').css('display', 'block');
  }else if($paymentOption === 'bitcoin') {
    $('#payment ~ div').css('display', 'none');
    $('#credit-card + div + div').css('display', 'block');
  }else{
    $('#payment ~ div').css('display', 'none');
    $('#credit-card').css('display', 'block');
  }
})




$('button').click(function(e) {
  e.preventDefault();
  let validated = true;
  const regexObject = {
    name: /^[A-Z][a-z]+ [A-Z][a-z]+$/,
    email: /^.+@.+\..+$/,
    ccnum: /^\d{4}-?\d{4}-?\d{2}-?\d{2}-?[0-9][0-9]?[0-9]?[0-9]?$/,
    zip: /^\d{5}$/,
    cvv: /^\d{3}[0-9]?$/
  };
  const errorMessageObject = {
    name: "First Last",
    email: "name@email.com",
    ccnum: "13-16 digits",
    zip: "5 digit zip code",
    cvv: "CVV number"
  }

  function validator(element, regex, messageWidth, errorMessage) {
    const $value = element.val();
    const regexTest = regex.test($value);
    if(regexTest) {
      element.css('border', '2px solid #c1deeb');
      element.prev().css('color', '#000');
      validated = validated && true;
    }else{
      element.css('border', '2px solid #ff0000');
      element.prev().css('color', '#ff0000');
      element.hover(
        function() {
          $(this).parent().css('position', 'relative');
          $(this).after(`
            <div style='position: absolute;
              z-index: 10;
              background: #323232;
              border: 2px solid #ff0000;
              width: ${messageWidth};'>
              <span style='position: absolute;
                bottom: 100%;
                left: 10px;
                display: inline-block;
                width: 0;
                height: 0;
                border-bottom: 18px solid #ff0000;
                border-right: 18px solid transparent;
                border-left: 18px solid transparent;'></span>
              <span style='position: absolute;
                bottom: calc(100% - 4px);
                left: 10px;
                display: inline-block;
                width: 0;
                height: 0;
                border-bottom: 18px solid #323232;
                border-right: 18px solid transparent;
                border-left: 18px solid transparent;'></span>
              <p style='color: #ff0000;
                text-align: center;
                padding: 5px;'>
                ${errorMessage}
              </p>
            </div>
          `);
        },
        function() {
          $(this).parent().find('div:last').remove();
        }
      )
      validated = validated && false;
    }
  }
  // Registration First and Last name (Capital Letter followed by multiple lowercase letter, a space, Capital
  // letter followed by multiple lowecase letters - First Last)
  validator($('#name'), regexObject.name, '25%', errorMessageObject.name);
  // email userinfo + @ + host + . + top-level domain
  validator($('#mail'), regexObject.email, '35%', errorMessageObject.email);


  let $payment = $('#payment').val();
  if($payment === 'credit card') {
    $('#payment').prev().css('color', '#000');
    // credit card (13-16 digits)
    validator($('#cc-num'), regexObject.ccnum, '65%', errorMessageObject.ccnum);
    // zip code (5 digits)
    validator($('#zip'), regexObject.zip, '100%', errorMessageObject.zip);
    // cvv verification (3-4 digits)
    validator($('#cvv'), regexObject.cvv, '100%', errorMessageObject.cvv);
  }else if($payment === 'select_method') {
    $('#payment').prev().css('color', '#ff0000');
  }else{
    $('#payment').prev().css('color', '#000');
  }

  let totalChecked = 0;
  $activityInput.each(function() {
    if($(this).prop('checked')) {
      totalChecked += 1;
    }
  })

  if(totalChecked > 0) {
    $('.activities legend').css('color', 'inherit');
    validated = validated && true;
  }else{
    $('.activities legend').css('color', '#ff0000');
    validated = validated && false;
  }

  if(validated) {
    window.location.reload();
  }
});
