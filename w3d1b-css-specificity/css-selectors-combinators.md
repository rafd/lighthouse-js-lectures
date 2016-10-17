# CSS Selectors and Combinators

## selectors:

  type             `div`

  id               `#app`

  class            `.user`

  attribute        `[attr=value]`  (also: `~=`, `|=`, `^=`, `$=`, `*=`)

  pseudo-classes   `:hover`, `:active`, `:focus`, `:visited`, `:not()`

  pseudo-elements  `::before`, `::after`


  http://www.w3schools.com/cssref/css_selectors.asp
  http://www.w3schools.com/css/css_pseudo_classes.asp
  https://css-tricks.com/pseudo-element-roundup/




  used to combine selectors:

  descendent     ` `      `.a .b`      matches all `.b` inside an `.a` (no matter how deep)

  child          `>`      `.a > .b`    matches all `.b` that are direct children of `.a`

  sibling        `~`       `.a ~ .b`   matches all `.b` that are siblings of `.a` and come after `.a`

  adjacent       `+`       `.a + .b`   matches all `.b` that immediately follow (and are siblings) of `.a`


  https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors


div a {...}

<div>
  <a></a> ; styled
  <span>
     <a></a> ; styled
  </span>
  <a></a> ; styled
  <a></a> ; styled
</div>


div > a {...}

<div>
   <a></a> ; styled
   <span>
     <a></a> ; not styled
   </span>
  <a></a> ; styled
  <a></a> ; styled
</div>



span ~ a {...}

<div>
  <a></a> ; not styled
  <span>
    <a></a> ; not styled
  </span>
  <a></a> ; styled
  <a></a> ; styled
</div>


span + a {...}

<div>
  <a></a> ; not styled
  <span>
    <a></a> ; not styled
  </span>
  <a></a> ; styled
  <a></a> ; not styled
</div>



