// ”Job Role” section

// - Include a text field that will be revealed when the "Other" option is selected
//   from the "Job Role" drop down menu.
// - Give the field an id of “other-title,” and add the placeholder text of
//   "Your Job Role".
// Note: You'll need to add the "Other" job role input directly into the HTML and
// hide it initially with JS in order to get this feature to work when JS is
// disabled, which is a requirement below.

$('#name').focus();




// ”T-Shirt Info” section
// - For the T-Shirt "Color" menu, only display the color options that match the
//   design selected in the "Design" menu.
//   - If the user selects "Theme - JS Puns" then the color menu should only
//     display "Cornflower Blue," "Dark Slate Grey," and "Gold."
//   - If the user selects "Theme - I ♥ JS" then the color menu should only display
//     "Tomato," "Steel Blue," and "Dim Grey."
// - When a new theme is selected from the "Design" menu, the "Color" field and
//   drop down menu is updated.
function colors(one, two, three) {
  $('#color option').each(function() {
    $(this).attr('disabled', false);
    let $value = $(this).val();
    if($value !== one && $value !== two && $value !== three) {
      $(this).attr('disabled', 'disabled');
    }
  });
};

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
// - Some events are at the same day and time as others. If the user selects a
//   workshop, don't allow selection of a workshop at the same day and time --
//   you should disable the checkbox and visually indicate that the workshop in
//   the competing time slot isn't available.
// - When a user unchecks an activity, make sure that competing activities (if
//   there are any) are no longer disabled.

const $activitiesInput = $('.activities input').slice(1,5);
function checker(input, boolean, font) {
  let $timeSlot = input.parent().text().split('-');
  $timeSlot = $timeSlot[1].split(',');
  $activitiesInput.each(function() {
    if(!$(this).prop('checked')) {
      let $label = $(this).parent().text();
      if($label.indexOf($timeSlot) > 0) {
        $(this).attr('disabled', boolean);
        $(this).parent().css('color', font);
      }
    }
  })
}

$activitiesInput.click(function() {
  if($(this).prop('checked')) {
    checker($(this), true, '#7f7f7f');
  }else{
    checker($(this), false, '#000');
  }
});

// - As a user selects activities, a running total should display below the list
//   of checkboxes. For example, if the user selects "Main Conference", then
//   Total: $200 should appear. If they add 1 workshop, the total should change
//   to Total: $300.
