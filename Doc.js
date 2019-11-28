var matrix = [];
var i, k;
var points = {};
var nodos = new vis.DataSet(points);
var vertices = [];

var openFile = function (event) {
  var input = event.target;

  var reader = new FileReader();
  reader.onload = function () {
    var text = reader.result;
    var text = text.split(/[\s,]+/);

    var c = Math.sqrt(text.length);


    for (i = 0, k = -1; i < text.length; i++) {
      if (i % c === 0) {
        k++;
        matrix[k] = [];
      }

      matrix[k].push(text[i]);
    }

  };
  reader.readAsText(input.files[0]);



  document.getElementById('boton').disabled = false;
};


function Indexado() {


  var t = 65;

  for (var u = 0; u < parseInt(matrix.length); u++) {
    nodos.add([{ id: u + 1, label: String.fromCharCode(t++) }]);
    vertices[u] = u;
  }

}


function Mostrar() {


  Indexado();

  var Grafo1 = [];

  for (var i = 0; i < parseInt(matrix.length); i++) {

    for (var j = 0; j < parseInt(matrix[i].length); j++) {

      if (matrix[i][j] == matrix[j][i]) {
        matrix[j][i] = 0;
      }

      if (parseInt(matrix[i][j]) != 0) {

        Grafo1.push({ x: i, y: j, ponderacion: matrix[i][j] });


      }

    }

  }



  var aristas = new vis.DataSet(points);



  for (var j = 0; j < parseInt(Grafo1.length); j++) {

    aristas.add([{ from: Grafo1[j].x + 1, to: Grafo1[j].y + 1, label: String(Grafo1[j].ponderacion), font: { size: 20, strokeColor: '#000000', color: '#ffffff' } }]);


  }




  var contenedor = document.getElementById("grafo1");

  var datos = {
    nodes: nodos,
    edges: aristas
  };
  var options = {
    nodes: {

      size: 30,
      color: '#4AD63A',

      font: {
        size: 20,
        color: '#ffffff'
      },
      borderWidth: 4
    },

    edges: {

      width: 2,

    }
  };

  var grafo = new vis.Network(contenedor, datos, options);

  document.getElementById('boton2').disabled = false;

}


class UnionFind {
  constructor(elements) {
    // Number of disconnected components
    this.count = elements.length;

    // Keep Track of connected components
    this.parent = {};

    // Initialize the data structure such that all
    // elements have themselves as parents
    elements.forEach(e => (this.parent[e] = e));
  }

  union(a, b) {
    let rootA = this.find(a);
    let rootB = this.find(b);

    // Roots are same so these are already connected.
    if (rootA === rootB) return;

    // Always make the element with smaller root the parent.
    if (rootA < rootB) {
      if (this.parent[b] != b) this.union(this.parent[b], a);
      this.parent[b] = this.parent[a];
    } else {
      if (this.parent[a] != a) this.union(this.parent[a], b);
      this.parent[a] = this.parent[b];
    }
  }

  // Returns final parent of a node
  find(a) {
    while (this.parent[a] !== a) {
      a = this.parent[a];
    }
    return a;
  }

  // Checks connectivity of the 2 nodes
  connected(a, b) {
    return this.find(a) === this.find(b);
  }
}





function Kruskal() {


  var arista = [];

  for (var i = 0; i < parseInt(matrix.length); i++) {

    for (var j = 0; j < parseInt(matrix[i].length); j++) {

      if (parseInt(matrix[i][j]) != 0) {
        if (i != j) {
          arista.push({ x: i, y: j, ponderacion: matrix[i][j] });
        }
      }

    }

  }

  arista.sort(function (a, b) {
    if (parseInt(a.ponderacion) > parseInt(b.ponderacion)) {
      return 1;
    }
    if (parseInt(a.ponderacion) < parseInt(b.ponderacion)) {
      return -1;
    }

    return 0;
  });

  for (var u = 0; u < arista.length; u++) {

    for (var t = 1; t < arista.length; t++) {
      if (arista[u].x == arista[t].y) {
        if (arista[u].y == arista[t].x) {

          arista.splice(t, 1);

        }
      }

    }

  }








  var dele = [];
  let uf = new UnionFind(vertices);

  uf.union(arista[0].x, arista[0].y);

  for (var u = 1; u < arista.length; u++) {

    if (uf.connected(parseInt(arista[u].x), parseInt(arista[u].y)) == true) {

      dele.push(arista[u]);


    }

    else {
      uf.union(arista[u].x, arista[u].y);

    }



  }

  for (var g = 0; g < dele.length; g++) {

    for (var u = 0; u < arista.length; u++) {
      if (dele[g] == arista[u]) { arista.splice(u, 1); }
    }


  }


  if ((parseInt(vertices.length) - 1) != parseInt(arista.length)) {

    alert("El grafo no es conexo");
  }


  else {
    var aristas = new vis.DataSet(points);
    // var Respuesta="=";
    for (var i = 0; i < parseInt(arista.length); i++) {

      aristas.add([{ from: (arista[i].x + 1), to: (arista[i].y + 1), label: String(arista[i].ponderacion), font: { size: 20, strokeColor: '#000000', color: '#ffffff' } }]);
      // Respuesta+=String("["+arista[i].x+","+arista[i].y+"]");
    }


    var contenedor = document.getElementById("arbol");

    var datos = {
      nodes: nodos,
      edges: aristas
    };

    var options = {
      nodes: {

        size: 30,
        color: '#00FFFF',



        font: {
          size: 20,
          color: '#000000'
        },
        borderWidth: 4
      },

      edges: {

        width: 2,

      }
    };

    var grafo = new vis.Network(contenedor, datos, options);
    
    document.getElementById('boton2').disabled = false;
  
  }
  // document.getElementById('Respuesta').innerHTML='<h1 class="text-dark">'+Respuesta+' </h1>';
}
