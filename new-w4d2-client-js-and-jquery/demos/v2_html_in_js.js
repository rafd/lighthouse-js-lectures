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
  const div = document.createElement('div');
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

const updateTabs = function(pageId) {
	// make all li inactive, then make current li active
	$("nav > ul > li").removeClass("active")
	$("nav > ul > li[data-page-id="+pageId+"]")
  	.addClass("active")

  // hide all pages, then show current page
  $("section").remove()
  createPage(pages.filter(function(page) { return page.id == pageId })[0]);
}

const createNav = function(pages) {
  const $nav = $("<nav>")
  const $ul = $("<ul>").appendTo($nav)

  pages.forEach(function(page) {
    $("<li>")
      .attr("data-page-id", page.id)
      .text(page.title)
      .on("click", function() {
        updateTabs(page.id, this)
      })
      .appendTo($ul)
  });

  $("body").append($nav);
}

$(function() {
  createNav(pages);
  updateTabs(currentPageId);
})
