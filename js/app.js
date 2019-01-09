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

const $activitieInput = $('.activities input');
let runningTotal = 0;
$activitieInput.click(function() {
  let $activitieCost = $(this).parent().text().split('$');
  if($(this).prop('checked')) {
    runningTotal += Number.parseInt($activitieCost[1], 10);
  }else{
    runningTotal -= Number.parseInt($activitieCost[1], 10);
  }
  $('.activities').append('<h2>Total: $' + runningTotal + '</h2>');
})
// selecting the portion of the text relevant for evaluation
