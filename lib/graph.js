var _ = require('lodash');
var graphs = {};
graphs.DirectedGraph = function(){
  this.vertices = {};
  this.edges = [];
};

graphs.DirectedGraph.prototype = {
  addVertex : function(vertex){
    this.vertices[vertex] = [];
  },
  addEdge : function(from,to){
    this.edges.push([from,to]);
    this.vertices[from].push(to);
  },
  hasEdgeBetween : function(from,to){
    return this.vertices[from].some(function(node){
      return (node == to);
    });
  },
  order : function(){
    return Object.keys(this.vertices).length;
  },
  size : function(){
    return this.edges.length;
  },
  pathBetween : function(from,to,visitedPath){
    visitedPath = visitedPath || [] ;
    var vertices = this.vertices;
    for (var key in vertices[from]) {
      var node = vertices[from][key];
      if(visitedPath.indexOf(node) < 0){
	       var resultingPath = this.pathBetween(node, to,_.concat(visitedPath,from));
 	       if (resultingPath[resultingPath.length - 1] == to)
           return resultingPath;
      }
    }
    return (from == to) ? _.concat(visitedPath,to) : visitedPath;
  },
}
module.exports = graphs;
