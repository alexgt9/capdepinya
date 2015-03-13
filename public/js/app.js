(function() {
  var app = angular.module('castellersMap', ['castellersServices']);

    app.directive("castellerSelection", function() {
        return {
            restrict: 'EA',
            templateUrl: "partials/casteller-selection.html",
            controller: ['Casteller', function(Casteller){

                this.selectedCasteller = "Select";
                this.active = false;
                this.castellersList = [];
            
                this.showCastellers = function(){
                    this.active = !this.active;
                    if (this.active)
                        this.castellersList = Casteller.query();
                };

                this.selectCasteller = function(casteller){
                    this.selectedCasteller = casteller.name;
                    this.active = false;
                };
            }],
            controllerAs: 'map',
            scope: {
            }
        };
    });

    app.directive("allCastellers", function() {
        return {
            restrict: 'E',
            templateUrl: "partials/listing.html",
            controller: ['Casteller', function(Casteller){
                this.castellersList = Casteller.query();

                this.deleteCasteller = function(id){
                    this.castellersList = this.castellersList.filter(function(value) {
                        return value.id != id;
                    });
                    
                    Casteller.delete({id:id});
                };
            }],
            controllerAs: 'listing',
        };
    });

    app.controller('CreateCastellerController', ['Casteller','$cacheFactory', function(Casteller, $cacheFactory){
        this.casteller = {};

        this.cache = $cacheFactory.get('$http');

        this.addCasteller = function(listing){
            this.casteller.id = new Date().getTime();
            
            Casteller.save(this.casteller);

            toast('Amunt, un més!', 4000);

            listing.castellersList.unshift(this.casteller);
            this.casteller = {};
            this.duplicated = false;
            this.cache.removeAll();
        };

        this.deleteCasteller = function(id){
            Casteller.delete({id:id});
        };
    }]);
})();