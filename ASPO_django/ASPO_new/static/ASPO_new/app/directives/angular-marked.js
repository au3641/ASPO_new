(function () {
    "use strict";
	
	function replaceAll(find, replace, str) {
		return str.replace(new RegExp(find, 'g'), replace);
	}
	
	angular.module("ASPO").directive("marked", function($compile) {
	return {
		restrict: "AE",
		scope: {

		},
		link: function(scope, element, attrs) {
			var start = "<span class=\"ng-scope\">";
			var end = "</span>";
			
			var html = element.html();
			
			html = replaceAll("\n&gt;", "\n>", html);
			html = replaceAll("\r&gt;", "\n>", html);
			
			if(html.startsWith("&gt;"))
				html = ">" + html.substring(4);
		  
			if(html.startsWith(start))
				html = html.splice(start.length, 0, "\n");
		  
			var e = $compile(marked(html))(scope);
			element.html(e);
		}
	  };
	});
})();