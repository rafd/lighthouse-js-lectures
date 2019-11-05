const updateTabs = function(currentPageId) {
	// make all li inactive, then make current li active
	$("nav > ul > li").removeClass("active")
	$("nav > ul > li[data-page-id="+currentPageId+"]")
  	.addClass("active")

  // hide all pages, then show current page
  $("section").hide()
  $("section[data-page-id="+currentPageId+"]").show()
}


$(function() {
 	updateTabs("page-a");

  $("nav > ul > li").on("click", function(e) {
  	updateTabs($(this).attr("data-page-id"))
  })
})