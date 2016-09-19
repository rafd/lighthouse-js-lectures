# CSS specificity

when two rules conflict, css uses a calculation to decide which one to apply

it depends on the number of inline-styles, ids, classes, and elements in the selector

the browser calculates a specificity value for each rule:

style attribute?   |    # of ID   |  # of class, pseudo-class, attribute  | # of type, pseudo-elements

<div style="">    |   #foo    |  .foo,  :hover,  [attr=value]    |    div, ::before

(order within a selector does not matter, combinators do not matter)

if specificity is tied, the "lower" rule wins (whichever rule was defined later)


## !important

`!important` overrides specificity

(if 2 rules w/ !important apply to the same element, specifity rules apply)
ex.

```css
div {
  color: green !important;
}
```


## References

https://css-tricks.com/wp-content/csstricks-uploads/specificity-calculationbase.png

https://css-tricks.com/specifics-on-css-specificity/

https://www.smashingmagazine.com/2007/07/css-specificity-things-you-should-know/

https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity



