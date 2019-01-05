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

$('#design').change(function() {
  let designSelection = $(this).val();
  if(designSelection === 'js puns') {
    $('#color option').each(function() {
      $(this).attr('disabled', false);
      let value = $(this).val();
      if(value !== 'cornflowerblue' && value !== 'darkslategrey' && value !== 'gold') {
        $(this).attr('disabled', 'disabled');
      }
    });
  }else if(designSelection === 'heart js'){
    $('#color option').each(function() {
      $(this).attr('disabled', false);
      let value = $(this).val();
      if(value !== 'tomato' && value !== 'steelblue' && value !== 'dimgrey') {
        $(this).attr('disabled', 'disabled');
      }
    });
  }else{
    $('#color option').each(function() {
      $(this).attr('disabled', false);
    });
  }
});
