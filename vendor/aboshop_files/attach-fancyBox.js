// FancyBox adjustments
jQuery(document).ready(function() {
	jQuery(".fancybox").fancybox({
		padding: 0,
		afterLoad   : function() {
			this.outer.prepend( '<div class="close-bg"></div>' );
		},
		tpl : {
		closeBtn : '<a title="Schliessen" class="fancybox-item fancybox-close" href="javascript:;">Schliessen</a>'
		}
	});
});
