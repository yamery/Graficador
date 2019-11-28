var nodos = new vis.DataSet([

    {id:1,label:"A"},
    {id:2,label:"B"},
    {id:3,label:"C"},
    {id:4,label:"D"},
    {id:5,label:"E"},
    {id:6,label:"F"}
    ]);
    
    var aristas = new vis.DataSet([
      
     {from:1, to:3},
     {from:2, to:3},
     {from:4, to:1},
     {from:5, to:2},
     {from:5, to:1}
    ]);
    
    var contenedor = document.getElementById("grafo1");
    
    var datos = {
      nodes: nodos,
      edges: aristas
    };
    
    var opciones ={};
    
    var grafo= new vis.Network(contenedor,datos,opciones);