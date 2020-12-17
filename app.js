angular.module('app', ['ngMaterial', 'ngMessages']);

const standings = {
    templateUrl: './standings/standings.html',
    controller: 'StandingsController'
}

angular.module('app').component('standings', standings);

angular.module('app').controller('StandingsController', ['StandingsService', '$http', function(StandingsService, $http) {
    const ctrl = this;                                                 
          
    function sortNumber(a,b) {
        return a - b;
        
    }
    ctrl.getLeague = function() {
        StandingsService.getLeague(ctrl.leagueId).then(function(league_data) {
        console.log(league_data.data);
        
        ctrl.league_data = league_data.data;
        temp = [];
       
        for (i = 0; i < ctrl.league_data.length; i++) {
            temp.push(ctrl.league_data[i][ctrl.league_data[i].length-2]);
            
        }
        temp.sort();
        temp.reverse();
        console.log(temp);
            
        ctrl.order = [];
        for (i = 0; i < temp.length; i++) {
            for (j = 0; j < temp.length; j++) {
            if (ctrl.league_data[j][ctrl.league_data[j].length-2] == temp[i]) {
                num = [ctrl.league_data[j][0], ctrl.league_data[j][ctrl.league_data[j].length-2]];
                ctrl.order.push(num);
                ctrl.league_data[j][ctrl.league_data[j].length-2] = -300; // avoid duplicates
               
            }}
        }
            
        temp = [];
        for (i = 0; i < ctrl.league_data.length; i++) {
            temp.push(ctrl.league_data[i][ctrl.league_data[i].length-1]);   
        }
        temp.sort(sortNumber);
        temp.reverse();
        console.log(temp);
            
        ctrl.luck = [];
        for (i = 0; i < temp.length; i++) {
            for (j = 0; j < temp.length; j++) {
            if (ctrl.league_data[j][ctrl.league_data[j].length-1] == temp[i]) {
                num = [ctrl.league_data[j][0], ctrl.league_data[j][ctrl.league_data[j].length-1]];
                ctrl.luck.push(num);
                ctrl.league_data[j][ctrl.league_data[j].length-1] = -300; // avoid duplicates
               
            }}
        }
            
        

//        ctrl.order = [];
//        max = 100;
//        for (j = 0; j < temp.length; j++) {
//            console.log(temp);
//            wins = 0; 
//            for (i = 0; i < temp.length; i++) {
//                if (temp[i][temp[i].length-2] > wins) {
//                    console.log('in if statement');
//                    wins = temp[i][temp[i].length-2];
//                    index = i;
//                }
//            
//            }
//            max = wins;
//            info = [temp[index][0], temp[index][temp.length-2]];
//            temp = temp.slice(0,index).concat(index + 1, temp.length);
//            ctrl.order.push(info);
//        }
            
    })   
    }
    
                                                
                                              
                                                                                                       
}]);

function StandingsService($http) {
    const self = this;
    self.getLeague = getLeague;
        
    function getLeague(leagueId) {
        console.log(leagueId);
        url = "https://expected-wins.uc.r.appspot.com/?leagueId=".concat(leagueId);
        console.log(url);
        return $http.get(url)
    }
    
}

angular.module('app').service('StandingsService', StandingsService);
StandingsService.$inject = ['$http'];
