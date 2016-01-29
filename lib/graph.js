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
    return this.edges.some(function(node){
      return (_.isEqual(node,[from,to]));
    });
  },
  order : function(){
    return Object.keys(this.vertices).length;
  },
  size : function(){
    return this.edges.length;
  },
  pathBetween : function(from,to,visitedNode){
    visitedNode = visitedNode || [] ;
    var vertices = this.vertices;
    for (var index in vertices[from]) {
      var node = vertices[from][index];
      if(visitedNode.indexOf(node) < 0){
	       var path = this.pathBetween(node, to,_.concat(visitedNode,from));
 	       if (path[path.length - 1] == to)
           return path;
      }
    }
    return (from == to) ? _.concat(visitedNode,to) : visitedNode;
  },
  farthestVertex : function(vertex,visitedNode){
    visitedNode = visitedNode || [] ;
    var vertices = this.vertices;
    for (var index in vertices[vertex]) {
      var node = vertices[vertex][index];
      if(visitedNode.indexOf(node) < 0)
	       return this.farthestVertex(node,_.concat(visitedNode,vertex));
    }
    return vertex;
  },
  allPaths : function(from,to,visitedNode,allPath){
    visitedNode = visitedNode || [];
    allPath = allPath || [];
    var vertices = this.vertices;
    if(from == to) return _.concat(visitedNode,to);
    for (var index in vertices[from]) {
      var node = vertices[from][index];
      if (visitedNode.indexOf(node) < 0) {
        var path = this.allPaths(node, to,_.concat(visitedNode,from),allPath);
        if (path[path.length - 1] == to)
          allPath.push(path);
      }
    }
    return allPath;
  },
}



graphs.UndirectedGraph = function(){
  this.vertices = {};
  this.edges = [];
};

graphs.UndirectedGraph.prototype = {
  addVertex : function(vertex){
    this.vertices[vertex] = [];
  },
  addEdge : function(from,to){
    this.edges.push([from,to]);
    this.vertices[from].push(to);
    this.vertices[to].push(from);
  },
  hasEdgeBetween : function(from,to){
    return this.edges.some(function(node){
      return (_.isEqual(node,[from,to])||_.isEqual(node,[to,from]));
    });
  },
  order : function(){
    return Object.keys(this.vertices).length;
  },
  size : function(){
    return this.edges.length;
  },
  pathBetween : function(from,to,visitedNode){
    visitedNode = visitedNode || [] ;
    var vertices = this.vertices;
    for (var index in vertices[from]) {
      var node = vertices[from][index];
      if(visitedNode.indexOf(node) < 0){
	       var path = this.pathBetween(node, to,_.concat(visitedNode,from));
 	       if (path[path.length - 1] == to)
           return path;
      }
    }
    return (from == to) ? _.concat(visitedNode,to) : visitedNode;
  },
  farthestVertex : function(vertex,visitedNode){
    visitedNode = visitedNode || [] ;
    var vertices = this.vertices;
    for (var index in vertices[vertex]) {
      var node = vertices[vertex][index];
      if(visitedNode.indexOf(node) < 0)
	       return this.farthestVertex(node,_.concat(visitedNode,vertex));
    }
    return vertex;
  },
  allPaths : function(from,to,visitedNode,allPath){
    visitedNode = visitedNode || [];
    allPath = allPath || [];
    var vertices = this.vertices;
    if(from == to) return _.concat(visitedNode,to);
    for (var index in vertices[from]) {
      var node = vertices[from][index];
      if (visitedNode.indexOf(node) < 0) {
        var path = this.allPaths(node, to,_.concat(visitedNode,from),allPath);
        if (path[path.length - 1] == to)
          allPath.push(path);
      }
    }
    return allPath;
  },
}
module.exports = graphs;
