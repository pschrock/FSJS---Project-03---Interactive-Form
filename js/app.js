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





// Form validation
// If any of the following validation errors exist, prevent the user from
// submitting the form:
// - Name: field can't be blank.
// - Email: field must be a validly formatted e-mail address (you don't have to
//   check that it's a real e-mail address, just that it's formatted like one:
//   dave@teamtreehouse.com for example.
// - User: must select at least one checkbox under the "Register for Activities"
//   section of the form.
// - If the selected payment option is "Credit Card," make sure the user has
//   supplied a Credit Card number, a Zip Code, and a 3 number CVV value before
//   the form can be submitted.
//   - Credit Card field should only accept a number between 13 and 16 digits.
//   - The Zip Code field should accept a 5-digit number.
//   - The CVV should only accept a number that is exactly 3 digits long.

// NOTE: Don't rely on the built in HTML5 validation by adding the required
// attribute to your DOM elements. You need to actually create your own custom
// validation checks and error messages.

// NOTE: Avoid using snippets or plugins for this project. To get the most out
// of the experience, you should be writing all of your own code for your own
// custom validation.

// NOTE: Make sure your validation is only validating Credit Card info if Credit
// Card is the selected payment method.



$('button').click(function(e) {
  e.preventDefault();
  let validated = true;
  function validator(element, regex) {
    const $value = element.val();
    const regexTest = regex.test($value);
    if(regexTest) {
      element.css('border', '2px solid #c1deeb');
      element.prev().css('color', '#000');
      validated = validated && true;
    }else{
      element.css('border', '2px solid #ff0000');
      element.prev().css('color', '#ff0000');
      validated = validated && false;
    }
  }
  // Registration First and Last name (Capital Letter followed by multiple lowercase letter, a space, Capital
  // letter followed by multiple lowecase letters - First Last)
  validator($('#name'), /^[A-Z][a-z]+ [A-Z][a-z]+$/);
  // email userinfo + @ + host + . + top-level domain
  validator($('#mail'), /^.+@.+\..+$/);
  // credit card (13-16 digits)
  validator($('#cc-num'), /^\d{13}[0-9]?[0-9]?[0-9]?$/);
  // zip code (5 digits)
  validator($('#zip'), /^\d{5}$/);
  // cvv verification (3-4 digits)
  validator($('#cvv'), /^\d{3}[0-9]?$/);

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
  console.log(totalChecked);

  if(validated) {
    window.location.reload();
  }
});
