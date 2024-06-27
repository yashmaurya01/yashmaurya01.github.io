// $(document).ready(function(){
//  $('.s-bg-image').height($(window).height());
// })
//
$(".navbar a").click(function () {
  $("body,html").animate({
    scrollTop: $("#" + $(this).data('value')).offset().top - 100
  }, 1000)
})

document.addEventListener('DOMContentLoaded', function () {
  var element = document.body;
  var icon = document.getElementById('toggle-icon');

  // Enable dark mode by default
  element.classList.add('dark-mode');
  icon.children[0].style.display = 'block'; // Sun icon
  icon.children[1].style.display = 'none'; // Moon icon

  document.getElementById('theme-toggle').onclick = function () {
    element.classList.toggle('dark-mode');

    // Check if dark mode is active after the toggle
    if (element.classList.contains('dark-mode')) {
      icon.children[0].style.display = 'block'; // Sun icon
      icon.children[1].style.display = 'none'; // Moon icon
    } else {
      icon.children[0].style.display = 'none'; // Sun icon
      icon.children[1].style.display = 'block'; // Moon icon
    }
  };
});


