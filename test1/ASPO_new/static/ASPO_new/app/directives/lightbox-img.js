(function () {
    "use strict";
	
function adsasdasd() {
	alert("test");
}
	
	function replaceAll(find, replace, str) {
		return str.replace(new RegExp(find, 'g'), replace);
	}
	
	angular.module("ASPO").directive("lightboxImg", function($compile) {
		return {
			restrict: "E",
			scope: {
				img: "=img",
				text: "=text",
				appropriate: "=appropriate",
			},
			link: function(scope, element, attrs) {
				var appropriate = scope.appropriate ? true : false;
				var e = $compile("<span onclick=\"openDialog('" + scope.img + "', '" + scope.text + "'," + appropriate + ")\" class=\"lightbox-img\">" + element.html() + "</span>")(scope);
				element.replaceWith(e);
			},
		};
	});
})();