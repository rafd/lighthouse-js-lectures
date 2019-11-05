const pages = [
  {id: "page-a",
   title: "Page A",
   content: "<script>alert('i can do anything now')</script>"},
  {id: "page-b",
   title: "Page B",
   content: "Something B"},
  {id: "page-c",
   title: "Page C",
   content: "Something C"}
]

const currentPageId = pages[0].id;

const escape = function(str) {
	var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

const createPage = function(page) {
	$(`<section data-page-id="${page.id}">
    	<h1>${escape(page.title)}</h1>
    	<p>${escape(page.content)}</p>
    </section>`).appendTo($("body"))
}

const createPageV2 = function(page) {
	$section = $("<section>").attr("data-page-id", page.id)
  $("<h1>").text(page.title).appendTo($section)
  $("<p>").text(page.content).appendTo($section)
	$section.appendTo($("body"))
}

$(function() {
   pages.forEach(function(page) {
   	  createPage(page)
   })
})