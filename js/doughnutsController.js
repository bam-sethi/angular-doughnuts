angular.module('doughnutApp', [])
        .controller('DoughnutController', DoughnutController)

    DoughnutController.$inject = ['$http'];

function DoughnutController($http){
  this.name = "All yours favourite mind bending doughnuts";
  var self = this;
  self.all = [];

  function getDoughnuts(){
    $http
      .get('http://api.doughnuts.ga/doughnuts')
      .then(function(response){
        self.all = response.data
      });
  };
  getDoughnuts()

  self.addDoughnut = addDoughnut;
  self.newDoughnut = {};

  function addDoughnut(){
    $http
      .post('http://api.doughnuts.ga/doughnuts', self.newDoughnut)
      .then(function(response){
      self.all.push(response.data);
      });
      self.newDoughnut = {};
  };

  self.deleteDoughnut = deleteDoughnut;
  self.delDoughnut = {};

  function deleteDoughnut(donut){
    // console.log(donut)
    $http
      .delete('http://api.doughnuts.ga/doughnuts/' + donut)
      .then(function(response){
        var array = self.all
        var item = donut
        var index = array.indexOf(item);
        array.splice(index, 1);

        getDoughnuts();
      });
      self.delDoughnut = {};
  };


};
