

//Funcion auxiliar para contar cuantos ratones tiene una solucion
const cantidadDeRatonesEnSolucion = (arr) => {
    let cantidadRatones = 0;
    if (arr !== undefined) {
        for(element of arr){
            if(element == 'R'){
                cantidadRatones +=1
            }
        }
    }
    return cantidadRatones
}


//ESTRATEGIA FUERZA BRUTA:
//Devuelve las soluciones optimas por fuerza bruta
const gatosFuerzaBruta = (n, arr) =>{
    //Por fuerza bruta, probando todas las posibilidades
    const gatosBruteAux = (n,arr) => {
        // console.log('me llamo recursivamente sobre: ')
        // console.log(arr)
        if(!arr.includes('G') || !arr.includes('R') ) return [arr] //caso base: no quedan gatos (ya comieron o ayunaron) o se acabaron los ratones
    
        const result = [];
        
        for(let i=0; i<arr.length;i++){ //para cada elemento
            // console.log('itero busco gato:'+ i)
            if(arr[i]==='G'){ //si es gato
                let comi=false;
                for(let j=Math.max(i-n,0); j<=Math.min(i+n,arr.length-1);j++){ //itero dentro de su zona de influencia sin irme del array
                    if(arr[j] === 'R'){ //si encuentro un raton, puede comer
                        // console.log('GATO' + i + '- Exploro comer R' + j)
                        
                        //Decide comer y vuelve a llamarse sobre el array resultante de comer
                        const como = [...arr];
                        como[i] = 'G' + i;
                        como[j] = 'R' + i;
                        const solComo =  gatosBruteAux(n,como)
                        // console.log('pusheo solucion')
                        // console.log(solComo)
                        result.push(...solComo) 
                        comi=true;
                        
                    }
                }
                if(!comi){
                    const ayuno = [...arr];
                    ayuno[i] = 'GA'; //indico que l gato ayuna
                    const solAyuno =  gatosBruteAux(n,ayuno)
                    result.push(...solAyuno)
                }
                
            }
        }
        
        return result;
    }


    const ret = gatosBruteAux(n, arr)
    //Ordenamos las soluciones por fuerza bruta, (menor cantidad de ratones sin comer primero), esas serán las optimas
    ret.sort((a,b) => {
    
        let ratonesEnA = cantidadDeRatonesEnSolucion(a)

        let ratonesEnB =cantidadDeRatonesEnSolucion(b)    

        if (ratonesEnA < ratonesEnB) {
            return -1;
        }else if (ratonesEnA > ratonesEnB) {
            return 1;
        }else {
            return 0;
        }
    
    })
    

    const cantidadRatonesEnOptima = cantidadDeRatonesEnSolucion(ret[0])
    const optimas = ret.filter((a)=> {
        return cantidadDeRatonesEnSolucion(a) <= cantidadRatonesEnOptima;
    });
    
    return optimas;
    
    
}

//ESTRATEGIA GREEDY: Para cada gato, como el raton mas lejano a la izquierda, si no hay el mas cercano a la derecha
//Retorna una solucion optima
const gatosGreedy = (n, arr) =>{
    for(let i = 0; i < arr.length; i++) { //para cada elemento
        if(arr[i] === 'G') { //si es gato
            let ratonCandidato = i; //el gato comienza sin candidato (parado en si mismo)
            // console.log('GATO:' + i)            
            for(let j = Math.max(i - n, 0); j < i ; j++){ //itero dentro de su zona de influencia izquierda sin irme del array hasta el gato 
                //busco el raton mas lejano desde la izquierda a la derecha
                // console.log('Evaluo raton:' + j)
                if(arr[j] === 'R') { //si encuentro un raton
                   ratonCandidato = j; //Actualizo el candidato
                //    console.log('Elijo raton:' + j)
                   break;
                }
            }
            if(ratonCandidato === i) { //Si no encontre ratones a la izquierda, debo buscar el mas cercano a la derecha
                // console.log('No encontre raton a la izquierda')
                for(let j = i; j <= Math.min(i+n,arr.length-1); j++) {
                    // console.log('Evaluo raton derecha:' +j)
                    if(arr[j] === 'R') { //si encuentro un raton
                        ratonCandidato = j; //Actualizo el candidato
                        // console.log('Elijo raton:' + j)
                        break;
                    }
                }

            }

            if(ratonCandidato !== i) { //Si encontré raton que comer
                arr[ratonCandidato] = 'R' + i //Marco como comido
                arr[i]= 'G' + i //Marco como comido
            }else{ 
                arr[i] = 'GA'//El gato ayuna
            }
        }
    }
    return arr;

}



//TEST CASES
console.log()
console.log('EXPLICACION NOTACION:')
console.log('GX RX, significa que el G en pos X, se come al raton marcado como RX')
console.log('GA significa que el gato ayuna')
console.log()

const casosDePrueba = [
                        
                        {distance : 3, array : ['R','G','R','R','G','G']},
                        {distance : 3, array : ['R','R','R','G','G','G']},
                        {distance : 3, array : ['R','G']},
                        {distance : 3, array : ['R','G','R','G','R','G']},
                        {distance : 3, array : ['R','R','R','R','G','R']},
                        {distance : 3, array : ['G','G','G','R','R','R']},
                        {distance : 3, array : ['R','G','R','G']},
                        {distance : 3, array : ['G']},
                        {distance : 3, array : ['R']},
                        {distance : 3, array : []},
                        
                        {distance : 2, array : ['R','G','R','R','G','G']},
                        {distance : 2, array : ['R','R','R','G','G','G']},
                        {distance : 2, array : ['R','G']},
                        {distance : 2, array : ['R','G','R','G','R','G']},
                        {distance : 2, array : ['R','R','R','R','G','R']},
                        {distance : 2, array : ['G','G','G','R','R','R']},
                        {distance : 2, array : ['R','G','R','G']},
                        {distance : 2, array : ['G']},
                        {distance : 2, array : ['R']},
                        {distance : 2, array : []},
                        
                        {distance : 1, array : ['R','G','R','R','G','G']},
                        {distance : 1, array : ['R','R','R','G','G','G']},
                        {distance : 1, array : ['R','G']},
                        {distance : 1, array : ['R','G','R','G','R','G']},
                        {distance : 1, array : ['R','R','R','R','G','R']},
                        {distance : 1, array : ['G','G','G','R','R','R']},
                        {distance : 1, array : ['R','G','R','G']},
                        {distance : 1, array : ['G']},
                        {distance : 1, array : ['R']},
                        {distance : 1, array : []},
                        
                        
                      ]

casosDePrueba.forEach((e, idx) => {
    console.log('Caso de prueba actual => ',idx+1);
    console.log('Distancia prueba        :', e.distance)
    console.log('Array prueba            :', e.array)
    const optimas = gatosFuerzaBruta(e.distance, e.array);
   
    const solGreedy = gatosGreedy(e.distance, e.array);
    
    console.log('Sol optima Greedy       :',solGreedy )
    console.log('Sol optima Fuerza Bruta :',optimas[0])
   

    if (cantidadDeRatonesEnSolucion(solGreedy) == cantidadDeRatonesEnSolucion(optimas[0])) {
        console.log('Greedy es Optima        : ✔');

    } else {
        console.log('ERROR: Greedy no es Optima ❌');
    }
    
    console.log()
    
    
});







