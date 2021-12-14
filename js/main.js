function Graph() {
    this.nodes = {};
  
    this.addEdge = (u, v) => {
      if (this.nodes[u] === undefined) { 
        this.nodes[u] = [];
      }
      this.nodes[u].push(v);
    };
  
}
  function shortestPath(graph, origin, destination){
    if(origin == destination){ //if already at destination return origin
        return [origin]
    }
    var nodes = [origin], //nodes to keep track of path
        visited = new Map(),  //map to keep collection of visited nodes
        prevNodes = {}  //dictionary of previous nodes when we traverse back
    visited.set(origin,1)
    while(nodes.length != 0){
        let currNode = nodes.pop()  //pop to iterate through queue and keep track of current node
        let childrenNode = graph.nodes[currNode]  //collection of currNode's child nodes
        for(let i = 0; i<childrenNode.length;i++){  //traverse child nodes of currNode
            
            if(visited.get(childrenNode[i]) == 1){  //continue if node has been visited already
                continue
            }
            visited.set(childrenNode[i],1)  //otherwise mark the unvisited child node as visited
            
            if(childrenNode[i] === destination){  // === just to be sure, once we reach destination we can backtrack
                let path = [childrenNode[i]]
                
                while(currNode != origin){  //backtracking
                    path.push(currNode)
                    currNode = prevNodes[currNode]
                }
                path.push(currNode) //push all consecutively traversed nodes
                path.reverse()  //list is in opposite order since the implementation is not recursive
                return path
            }
            
            prevNodes[childrenNode[i]] = currNode //set the parent node for the child node
            nodes.push(childrenNode[i]) //push it to nodes because we will need to traverse the child nodes later too
        }
    }

  }
  
function findPath(){
  var graph = new Graph();
    graph.addEdge('CAN', 'USA');
    graph.addEdge('USA', 'CAN');
    graph.addEdge('USA', 'MEX');
    graph.addEdge('MEX', 'USA');
    graph.addEdge('MEX', 'BLZ');
    graph.addEdge('MEX', 'GTM');
    graph.addEdge('BLZ', 'MEX');
    graph.addEdge('BLZ', 'GTM');
    graph.addEdge("GTM","MEX")
    graph.addEdge("GTM","BLZ")
    graph.addEdge("GTM","SLZ")
    graph.addEdge("GTM","HND")
    graph.addEdge("SLV","GTM")
    graph.addEdge("SLV","HND")
    graph.addEdge("HND","SLV")
    graph.addEdge("HND","GTM")
    graph.addEdge("HND","NIC")
    graph.addEdge("NIC","HND")
    graph.addEdge("NIC","CRI")
    graph.addEdge("CRI","NIC")
    graph.addEdge("CRI","PAN")
    graph.addEdge("PAN","CRI")
  
    let dest = document.getElementById("dest").value
    if(graph.nodes[dest] != undefined){
      let spath = shortestPath(graph,"CAN",dest)
      document.getElementById("path").innerHTML = spath.join(" -> ")
    }else{
      document.getElementById("path").innerHTML = "No such destination"
    }
}

window.onload = ()=>{
  document.getElementById("destBtn").addEventListener("click",(e)=>{
    e.preventDefault()
    findPath()
  },false)
  console.log("loaded")
}