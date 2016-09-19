# approaches to css:

## reusable styles

classes added to HTML based on what style-classes you want (a la bootstrap)

want low-specificity, reausable styles (ie. not much nesting of css)

ex.

.floating-box {
  background: white;
  box-shadow: 0 0 2px 2px #ccc;
}
.user { } /* avoid */

<div class="user floating-box">...</div>


## reusable mixins  (when using a CSS pre-processor such as SASS)

classes added to HTML based on data semantics
mixins added to classes as needed

don't care about specificity, b/c little reliance of CSS inheritance/cascade (mixins intead!)
  CSS nesting ends up almost directly reflecting the HTML

ex.
<div class="user">...</div>

.floating-box() {
  background: white;
  box-shadow: 0 0 2px 2px #ccc;
}

.user {
  .floating-box();
}
