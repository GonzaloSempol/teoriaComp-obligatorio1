
//recibe un id de nodo inicial, final, un grafo NxN (Matriz de adyacencia), y una funcion de optimizacion definida sobre un elemento
const caminoOptimo = (inicio, final, grafo, funcionOptimiza ) => {

    //Funcion auxiliar para calcular camino optimo
    //Precondicion: grafo Matriz de adyacencia de dimension NxN de al menos 1 elemento.
    const floydWarshall = (grafo, funcionOptimiza) => {
    //creamos un grafo con distancias infinitas.
    let cantNodos = grafo[0].length;

    let grafoSolucion =[];
    for(let i = 0; i < cantNodos; i++){
        let fila = [];
        for(let j=0; j < cantNodos;j++){
            if(i===j){
                fila[j]={ costoAOptimizar: (funcionOptimiza(grafo[i][j])), antecesor: i }
            }else{
                fila[j]={ costoAOptimizar: (funcionOptimiza(grafo[i][j])) , antecesor: -1 }
            }

        }
        grafoSolucion.push(fila)
    }

    // i=Montevideo
    // j=Madrid

    // Antesesor de madrid es el K
    // Madrid.x = la dire de k.x
    // Madrid.y = la dire de k.y

    // if el costo de ir de Montevideo a K + costo de ir de K a Madrid < costo de ir de Montevideo a Madrid
    // costo de ir de Montevideo a Madrid = el costo de ir de Montevideo a K + costo de ir de K a Madrid

    for (let k = 0; k < cantNodos; k++) {
        
        for (let i = 0; i < cantNodos; i++) {
          
            for (let j = 0; j < cantNodos; j++) {
                if (grafoSolucion[i][k].costoAOptimizar + grafoSolucion[k][j].costoAOptimizar < grafoSolucion[i][j].costoAOptimizar) {
                    grafoSolucion[i][j].costoAOptimizar = grafoSolucion[i][k].costoAOptimizar + grafoSolucion[k][j].costoAOptimizar;
                    grafoSolucion[i][j].antecesor = k   
                }   
            }
        }
    }
   
    return grafoSolucion
    }
    
    const matrizAntecesores = floydWarshall(grafo, funcionOptimiza);
    let camino = []
    camino.push(nodos[final]); 
    let actual = final;
    
    while(matrizAntecesores[inicio][actual].antecesor !== -1 && matrizAntecesores[inicio][actual].antecesor !== inicio  ) {
        camino.push(nodos[matrizAntecesores[inicio][actual].antecesor]);
        actual=matrizAntecesores[inicio][actual].antecesor;
    }
    
    camino.push(nodos[inicio]);
    return camino.reverse();
}







//DEFINICION DEL GRAFO PLANTEADO

//                | 0 Montevideo  |  1 Buenos Aires |  2 San Pablo |  3 Lima   | 4 Madrid | 5 FrankFurt | 6 Roma  | 7 Bandar Abbas | 8 Abu Dabi  | 9 Dubai  | 10 Doha  | 11 Manama
//0 Montevideo    |       0                    
//1 Buenos Aires  |                         0     
//2 San Pablo     |                                         0
//3 Lima          |                                                     0           
//4 Madrid        |                                                                 0
//5 FrankFurt     |                                                                             0
//6 Roma          |                                                                                           0  
//7 Bandar Abbas  |                                                                                                         0
//8 Abu Dabi      |                                                                                                                         0
//9 Dubai         |                                                                                                                                    0
//10 Doha         |                                                                                                                                                 0
//11 Manama       |                                                                                                                                                            0

//Nombre de los nodos
const nodos =['Montevideo', 'Buenos Aires', 'San Pablo', 'Lima', 'Madrid', 'FrankFurt ', 'Roma', 'Bandar Abbas', 'Abu Dabi', 'Dubai', 'Doha' , 'Manama']

//Creo una matriz de adyacencia (nodos.length X nodos.length), con objetos que representan costo infinito y tiempo infinito
let grafo = Array(nodos.length).fill().map(()=>Array(nodos.length).fill({ c: Infinity, t: Infinity })) 

//Lleno la diagonal de ceros, ya que dist hacia si mismo siempre es 0
const fillDiagonal = (grafo) => {
    for(let i = 0; i < grafo[0].length; i++)
        grafo[i][i] = { c:0, t:0 };
}
fillDiagonal(grafo);

//Represento el problema en la matriz de adyacencia

//Desde Montevideo, tenemos 3 opciones
//Aristas desde 0 - Montevideo
grafo[0][1] = { c:300, t:1 }
grafo[0][2] = { c:600, t:3 }
grafo[0][3] = { c:700, t:6 }

//Luego, desde cada ciudad Sudamericana se abren las siguientes conexiones hacia Europa:
//Aristas desde 1 - Buenos Aires
grafo[1][4] = { c:2300, t:12 }
grafo[1][5] = { c:2200, t:13 }
grafo[1][6] = { c:1950, t:13 }
//Aristas desde 2- San Pablo
grafo[2][4] = { c:2200, t:10 }
grafo[2][5] = { c:2100, t:13 } 
grafo[2][6] = { c:2500, t:12 }
//Aristas desde 3- Lima
grafo[3][4] = { c:2100, t:11 }
grafo[3][5] = { c:1900, t:15 }
grafo[3][6] = { c:1800, t:16 }

//Desde Europa, las conexiones al Medio Oriente son las siguientes:
//Aristas desde 4- Madrid
grafo[4][7] = { c:3100, t:19 }
grafo[4][8] = { c:5200, t:7 }
grafo[4][9] = { c:3950, t:8 }
//Aristas desde 5- FrankFurt
grafo[5][7] = { c:3200, t:18 }
grafo[5][8] = { c:2100, t:6 }
grafo[5][9] = { c:2500, t:7 }
//Aristas desde 6- Roma
grafo[6][7] = { c:2100, t:19 }
grafo[6][8] = { c:1900, t:6 }
grafo[6][9] = { c:1800, t:5 }

//Y finalmente... para llegar a Qatar:
//Aristas desde 7- Bandar Abbas
grafo[7][10] = { c:5000, t:10 }
grafo[7][11] = { c:3500, t:6 }
//Aristas desde 8- Abu Dabi
grafo[8][10] = { c:9300, t:1 }
grafo[8][11] = { c:7500, t:1 }
//Aristas desde 9- Dubai
grafo[9][10] = { c:9600, t:1 }
grafo[9][11] = { c:8800, t:1 }

//Finalmente, si el destino es Manama, se deberá tomar un Ferry hasta Doha.
//Aristas desde 10- Manama
grafo[11][10] = { c:3400, t:1 }




//Funciones de optimizacion elegidas:

const funcionMinimoTiempo = (e) => {
    return e.t
 }
 const funcionMinimoCosto = (e) => {
     return e.c
  }
 const funcionMinimoCostoSobreTiempo = (e) => {
     return isNaN(e.c / e.t) ? Infinity : e.c / e.t;
 }

/*
La funcion caminoOptimo() recibe:
    - Ciudad origen
    - Ciudad destino
    - Matriz de adyacencia
    - Funcion de optimizacion que puede ser:
        - Optimizar por tiempo
        - Optimizar por costo
        - Optimizar por costo / tiempo

*/
//TEST CASES
//Montevide - Doha
console.log('Montevideo - Doha por costo: ')
console.log(caminoOptimo(0, 10, grafo, funcionMinimoCosto))
console.log('Montevideo - Doha por tiempo: ')
console.log(caminoOptimo(0, 10, grafo, funcionMinimoTiempo))
console.log('Montevideo - Doha por costo / tiempo: ')
console.log(caminoOptimo(0, 10, grafo, funcionMinimoCostoSobreTiempo), '\n')

//Montevide - Manama
console.log('Montevideo - Manama por costo: ')
console.log(caminoOptimo(0, 11, grafo, funcionMinimoCosto))
console.log('Montevideo - Manama por tiempo: ')
console.log(caminoOptimo(0, 11, grafo, funcionMinimoTiempo))
console.log('Montevideo - Manama por costo / tiempo: ')
console.log(caminoOptimo(0, 11, grafo, funcionMinimoCostoSobreTiempo), '\n')

//Montevideo - Dubai
console.log('Montevideo - Dubai por costo: ')
console.log(caminoOptimo(0, 9, grafo, funcionMinimoCosto))
console.log('Montevideo - Dubai por tiempo: ')
console.log(caminoOptimo(0, 9, grafo, funcionMinimoTiempo))
console.log('Montevideo - Dubai por costo / tiempo: ')
console.log(caminoOptimo(0, 9, grafo, funcionMinimoCostoSobreTiempo), '\n')




