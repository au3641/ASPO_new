(function () {
    "use strict";

    angular.module("ASPO").controller('PageCtrl', ["$location", function ($location) {
        var that = this;
		
		that.menuItems = [
			{
				text: 'Vprašalnik',
				link: '#/vprasalnik/uvod',
				icon: 'questions-css.svg',
			},
			{
				text: 'Opis spolno prenosljivih okužb',
				link: '#/o-spolno-prenosljivih-okuzbah',
				icon: 'virus-css.svg',
				subpages: [
					{
						name: 'Splošno o SPO',
						link: '',
					},
					{
						name: 'Gonoreja',
						link: 'gonoreja',
					},
					{
						name: 'Genitalni herpes',
						link: 'genitalni-herpes',
					},
					{
						name: 'Genitalne bradavice',
						link: 'genitalne-bradavice',
					},
					{
						name: 'Okužba s klamidijo',
						link: 'okuzba-s-klamidijo',
					},
					{
						name: 'Sifilis',
						link: 'sifilis',
					},
					{
						name: 'Trihomonoza',
						link: 'trihomonoza',
					},
					{
						name: 'Okužba z urogenitalnimi mikoplazmami',
						link: 'okuzba-z-urogenitalnimi-mikoplazmami',
					},
					{
						name: 'Hepatitis B',
						link: 'hepatitis-b',
					},
					{
						name: 'Hepatitis C',
						link: 'hepatitis-c',
					},
					{
						name: 'HIV/aids',
						link: 'hiv-aids',
					}],
			},
			{
				text: 'Bolezenski znaki',
				link: '#/bolezenski-znaki',
				icon: 'doctor-css.svg',
				subpages: [{
					name: 'Izcedek',
					link: 'izcedek',
				},
				{
					name: 'Razjeda',
					link: 'razjeda',
				}]
			},
			{
				text: 'Pregled pri zdravniku',
				link: '#/pregled-pri-zdravniku',
				icon: 'doctor-css.svg',
			},
			{
				text: 'Zaščita',
				link: '#/zascita',
				icon: 'safety-css.svg',
			},
			{
				text: 'Primeri',
				link: '#/primeri',
			},
			{
				text: 'O ASPO',
				link: '#/o-nas',
				icon: 'group-css.svg',
			},
		]
		
		that.show = false;
		
		that.close = function() {
			$location.path("/");
			that.show = false;
		}
		
		that.navigate = function() {
			that.show = true;
		}
		
		that.show = $location.url().length > 1 ;
	}]);
})();
