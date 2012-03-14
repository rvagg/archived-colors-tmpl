#!/usr/bin/env node

var colors = require('colors')
  , colorsTmpl = require('./colors-tmpl')

  , assert = function (v1, v2, msg) {
      var b, msg
      if (arguments.length == 2) {
        b = v1
        msg = v2
      } else
        b = v1 === v2

      console.log((b ? '✓'.green : '✗'.red).bold + ' ' + msg[b ? 'green' : 'red'])
      if (!b && arguments.length != 2) {
        console.log('\t' + arguments[0])
        console.log('\t' + arguments[1])
      }
    }

assert(
    colorsTmpl.render(
      '{red}this should be red{/red}'
    )
  , 'this should be red'.red
  , 'full {red} string'
)

assert(
    colorsTmpl.render(
      '{green}this should be green{/green}'
    )
  , 'this should be green'.green
  , 'full {green} string'
)

assert(
    colorsTmpl.render(
      '{underline}this should be underlined{/underline}'
    )
  , 'this should be underlined'.underline
  , 'full {underline} string'
)

assert(
    colorsTmpl.render(
      'partial {red}red{/red} string'
    )
  , 'partial ' + 'red'.red + ' string'
  , 'partial {red} string'
)

assert(
    colorsTmpl.render(
      'partial {green}green{/green} string'
    )
  , 'partial ' + 'green'.green + ' string'
  , 'partial {green} string'
)

assert(
    colorsTmpl.render(
      'unmatched {green} tag, leave it alone'
    )
  , 'unmatched {green} tag, leave it alone'
  , 'unmatched {green} tag, leave it alone'
)

assert(
    colorsTmpl.render(
      'nonsense {foobar} tag, leave it alone'
    )
  , 'nonsense {foobar} tag, leave it alone'
  , 'nonsense {foobar} tag, leave it alone'
)

assert(
    colorsTmpl.render(
      'nonsense, matched {foobar}tag{/foobar}, leave it alone'
    )
  , 'nonsense, matched {foobar}tag{/foobar}, leave it alone'
  , 'nonsense, matched {foobar}tag{/foobar}, leave it alone'
)

assert(
    colorsTmpl.render(
      'lotsa colours: {red}red{/red}, {green}green{/green}, {blue}blue{/blue}, yeehaw!'
    )
  , 'lotsa colours: ' + 'red'.red + ', ' + 'green'.green + ', ' + 'blue'.blue + ', ' + 'yeehaw!'
  , 'multiple colours in one line'
)

assert(
    colorsTmpl.render(
      '{bold}colours {red}within {green}colours{/green} within {yellow}colours, {underline}oh my!{/underline}{/yellow}{/red} EEEK!{/bold}'
    )
  , ('colours ' + ('within ' + 'colours'.green + ' within ' + ('colours, ' + 'oh my!'.underline).yellow).red + ' EEEK!').bold
  , 'multiple colours contained within colours'
)
