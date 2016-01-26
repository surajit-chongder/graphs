var graphs = {};
graphs.DirectedGraph = function(){
  this.vertices = [];
  this.edges = [];
};

graphs.DirectedGraph.prototype = {
  addVertex : function(vertex){
    this.vertices.push(vertex);
  },
  addEdge : function(from,to){
    this.edges.push(from+to);
  },
  hasEdgeBetween : function(from,to){
    return this.edges.some(function(edge){
      return (edge == (from+to));
    });
  },
  order : function(){
    return this.vertices.length;
  },
  size : function(){
    return this.edges.length;
  },
}

graphs.UndirectedGraph = function(){
  this.vertices = [];
  this.edges = [];

}

graphs.UndirectedGraph.prototype = {
  addVertex : function(vertex){
    this.vertices.push(vertex);
  },
  addEdge : function(from,to){
    this.edges.push(from+to);
  },
  hasEdgeBetween : function(from,to){
    return this.edges.some(function(edge){
      return (edge==(from+to));
    });
  }
};
module.exports = graphs;
