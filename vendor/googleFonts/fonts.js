// Load Google fonts in the head to avoid flickering when fonts are loaded
/**
 * Configuration to load the fonts via the Google CDN
 */
var t;
WebFontConfig = {
	google: {
		families: [
			'Source+Sans+Pro:400,700,400italic,700italic:latin'
		]
	},
	active: function() {
		if(window.jQuery) {
			jQuery(document).trigger('wfActive');
		} else {
			t = setTimeout(function() {
				if(window.jQuery) {
					clearTimeout(t);
					jQuery(document).trigger('wfActive');
				}
			},500);
		}
	}
};

/**
 * Script to load Google Fonts.
 * First try to load fonts from Google repository
 * @return {null} Creates either a new <script> tag with the js to load fonts from google, or a <link> tag to load styles with the fonts to be called from the server.
 */
(function() {
	var wf, s, t;
	wf = document.createElement('script');
	wf.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
	wf.type = 'text/javascript';
	wf.async = 'true';
	s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(wf, s);

	wf.onerror = function() {
		wf = document.createElement('link');
		wf.href = '/assets/vendor/googleFonts/fonts.css';
		wf.type = 'text/css';
		wf.rel = 'stylesheet';
		wf.media = 'all';
		s = document.getElementsByTagName('link')[0];
		s.parentNode.insertBefore(wf, s);
		document.getElementsByTagName('html')[0].className += ' wf-local';
		if(window.jQuery) {
			clearTimeout(t);
			jQuery(document).trigger('wfActive');
		} else {
			t = setTimeout(function() {
				if(window.jQuery) {
					clearTimeout(t);
					jQuery(document).trigger('wfActive');
				}
			},500);
		}
	};
})();

