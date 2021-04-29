// var COL_WIDTH = 62 // should be calculated dynamically, and recalculated at window resize
// var GUTTER_WIDTH = 30

// var COL_WIDTHS = {
//   750: 62,
//   970: 81,
//   1170: 97
// }

// $(function() {
  
//   var d = dragula({
//     invalid: function(el, target) {
//       return $(el).hasClass('ui-resizable-handle')
//     }
//   })
//   $('.row').each(function() {
//     d.containers.push(this)
//   })

//   $('.block').resizable({
//     grid: COL_WIDTH - GUTTER_WIDTH,
//     handles: 'se',
//     resize: function(e, ui) {
//       console.log('resized', ui.size)
//       $(this).css('width', '').removeClass(function(index, css) {
//         return (css.match (/(^|\s)col-sm-\S+/g) || []).join(' ')
//       })
//       .addClass('col-sm-' + Math.max(1, Math.round(ui.size.width / COL_WIDTH)))
//     }
//   })
  
//   var colWidth = COL_WIDTHS[$('.container').width()] || COL_WIDTHS[0]
//   $(window).resize(function() {
//     colWidth = COL_WIDTHS[$('.container').width()] || COL_WIDTHS[0]
//     console.log('set colWidth to', colWidth, $('.container').width())
//   })
  
// })


$(function(){
	$('#grid').gridstrap({
		/* default options */
	});
});

function getOrden() {
    let children = $("#grid").children();
    for (let i = 0; i < children.length -1; i++) {
        console.log(children[i].innerHTML);
    }
}