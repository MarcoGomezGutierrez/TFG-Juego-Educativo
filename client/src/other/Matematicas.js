import data from '../data/math.json';

/**
 * Problem
 */
class Matematicas {

    /* Generar numeros entre 1000 y 9999 y genera resultados divididos entre unidades de millar, centena, decenas y unidades
    Pregunta: 1111
    Respuestas: 1UM + 1C + 1D + 1U
    Respuestas: más resultados falsos
    */
    /**
     * Generar numeros entre 1000 y 9999 y genera resultados divididos entre unidades de millar, centena, decenas y unidades
     * Pregunta: Descomponer el número: 1111
     * Respuestas: 1UM + 1C + 1D + 1U
     * Respuestas: más resultados falsos
     * @returns ({ question: 1111, answer: [1UM + 1C + 1D + 1U, etc] })
     */
    static generateFourDigitRandomQuestion() {
        const min = 1000;
        const max = 9999;
        const question = this.generateRandomNumber(min, max);
        const answer = this.generateAnwserDescomposicion(this.separateDigits(question));
        return { question, answer };
    }

    /**
     * Generar numeros entre 1000 y 9999 y genera una pregunta dividido el numero entre unidades de millar, centena, decenas y unidades y los resultados son los números
     * Pregunta: Escribe el número: 1UM + 1C + 1D + 1U
     * Respuestas: 1111
     * Respuestas: más numeros falsos
     * @returns  ({ question:1UM + 1C + 1D + 1U, answer:[1111, etc] })
     */
    static generateFourDigitComposicionRandomQuestion() {
        const min = 1000;
        const max = 9999;
        const num = this.generateRandomNumber(min, max);
        const { question, answer } = this.generateAnwserComposicion(this.separateDigits(num));
        return { question, answer };
    }

    /**
     * Genera números ordinales, generados en el JSON del 1 al 29 [Primero, Segundo,..., Vigésimo Octavo, Vigésimo Noveno]
     * Pregunta: Número ordinal: Primero
     * Respuesta: 1
     * Respuesta: más falsas
     * @returns ({ question: Primero, answer:[1, etc] })
     */
    static generateOrdinalRandomQuestion() {
        const threeDigits = this.generateThreeDigits();
        let question = "";
        let answer = [];
        threeDigits.forEach((index) => {
            const respuesta = data.numerosOrdinales[index];
            question = respuesta.numero;
            answer = [respuesta.respuestas[1].res, respuesta.respuestas[0].res, respuesta.respuestas[2].res, respuesta.respuestas[3].res];
        });

        return { question, answer };
    }

    /* Generar números aleatorios entre 1000 y 9999 y siempre poner el mayor por delante de la resta para que no sea negativo, 
    luego siempre genero números aleatorios entre los valores de la centena más cercana y la más lejana */
    /**
     * Generar números aleatorios entre 1000 y 9999 y siempre poner el mayor por delante de la resta para que no sea negativo, 
     * luego siempre genero números aleatorios entre los valores de la centena más cercana y la más lejana
     * Pregunta: Resta: 3000-2000
     * Respuesta: 1000
     * @returns ({ question: 3000-2000, answer:[1000, etc] })
     */
    static generateRestaRandomQuestion() {
        const num1 = this.generateRandomNumber(1000, 9999);
        const num2 = this.generateRandomNumber(1000, 9999);
        let question = "";
        let answer1 = 0;
        if (num1 >= num2) {
            question = `${num1} - ${num2}`;
            answer1 = num1 - num2;
        } else {
            question = `${num2} - ${num1}`;
            answer1 = num2 - num1;
        }
        const centena = this.calculateNearestCentena(answer1);
        let result = 0;
        let answer = [];
        answer.push(answer1.toString());
        for (let i = 0; i < 3; i++) { //Generar tres respuestas falsas
            while (answer1 === (result = this.generateRandomNumber(centena[1], centena[2])));// Asegurarse de que el valor no sea el mismo que la respuesta
            answer.push(result.toString());
        }
        return { question, answer };
    }

    /**
     * Sí el valor es 134 aproximar a la más cercana, es decir, 100. Pero si es 156, 200
     * Pregunta: Aproxima centena: 134
     * Respuesta: 100
     * Respuesta Falsa: 200
     * @returns ({ question: 134, answer:[100, 200] })
     */
    static generateNearestCentenaRandomQuestion() {
        const num = this.generateRandomNumber(100, 900);
        const centena = this.calculateNearestCentena(num);
        const answer1 = centena[0];

        const answer2 = centena[0] === centena[1] ? centena[2] : centena[1];
        return {
            question: num,
            answer: [answer1.toString(), answer2.toString()]
        }
    }

    /**
     * ¿Cuánto costará un libro de 34€ y una escoba de 29€?
     * Pregunta: ¿Cuánto costará un libro de 34€ y una escoba de 29€?
     * Respuesta: 34->30, 29->30: 30 + 30
     * Respuesta Falsa: etc
     * @returns ({ question: ¿Cuánto costará un libro de 34€ y una escoba de 29€?, answer:[30 + 30, etc] })
     */
    static generateEstimationProblemRandomQuestion() {
        const num1 = this.generateRandomNumber(10, 100);
        const num2 = this.generateRandomNumber(10, 100);

        const json = data.estimacionProblema;
        const result = data.estimacionProblema[this.generateRandomNumber(0, json.length - 1)];
        const question = `${result.first} ${num1}€ ${result.second} ${num2}€ ${result.third}`;

        //Estimaciones de los números
        const num1Est = this.approximateToNearestTen(num1);
        const num2Est = this.approximateToNearestTen(num2);

        const answer1 = `${num1Est} + ${num2Est} = ${num1Est + num2Est}`;

        const answer2 = `${num1Est + 10} + ${num2Est} = ${num1Est + 10 + num2Est}`;

        const answer3 = `${num1Est + 10} + ${num2Est + 10} = ${num1Est + 10 + num2Est + 10}`;

        const answer4 = `${num1Est} + ${num2Est - 10} = ${num1Est + num2Est - 10}`;

        return {
            question: question,
            answer: [answer1, answer2, answer3, answer4]
        }
    }

    /**
     * Hay 50kg de manzanas. Se venden 21kg. Añaden 12kg. ¿Cuántos kilos de manzanas tienen ahora?
     * Pregunta: Hay 50kg de manzanas. Se venden 21kg. Añaden 12kg. ¿Cuántos kilos de manzanas tienen ahora?
     * Respuesta: 41kg de manzanas
     * Respuesta Falsa: 71kg de manzanas, etc
     * Formula: (num1-num2)+num3
     * @returns ({ question: Hay 50kg de manzanas. Se venden 21kg. Añaden 12kg. ¿Cuántos kilos de manzanas tienen ahora?, answer:[41kg de manzanas, etc] })
     */
    static generateKgProblemRandomQuestion() {
        const num1 = this.generateRandomNumber(50, 80);
        const num2 = this.generateRandomNumber(20, 40);
        const num3 = this.generateRandomNumber(10, 30);

        const json = data.problemaQuitarKg;
        const result = data.problemaQuitarKg[this.generateRandomNumber(0, json.length - 1)];
        const question = `${result.first} ${num1}Kg ${result.second} ${num2}Kg. ${result.third} ${num3}${result.fourth}`;

        const answer1 = `${(num1 - num2) + num3} ${result.word}`;

        const answer2 = `${(num1 + num2) - num3} ${result.word}`;

        const answer3 = `${(num1 + num2) + num3} ${result.word}`;

        const answer4 = `${num1 - num2 + num3 + 10} ${result.word}`;

        return {
            question: question,
            answer: [answer1, answer2, answer3, answer4]
        }
    }

    /**
     * Preguntas de multiplicar alterando los resultados 
     * @returns 
     */
    static generateMultiplicationRandomQuestion(min1, max1, min2, max2) {
        const num1 = this.generateRandomNumber(min1, max1);
        const num2 = this.generateRandomNumber(min2, max2);
        const result = num1 * num2;
        const question = `${num1} x ${num2}`;

        return {
            question: question,
            answer: this.generarOpcionesDistorsion(result, 5)
        }

    }

    /**
     * Preguntas de multiplicar alterando los resultados 
     * @returns 
     */
    static generateDobleTripleRandomQuestion() {
        const num = this.generateRandomNumber(8, 30);
        const dobleTriple = this.generateRandomNumber(2, 3);
        const result = num * dobleTriple;
        const question = `${dobleTriple === 2 ? "doble" : "triple"} de ${num}?`;

        return {
            question: question,
            answer: this.generarOpcionesDistorsion(result, 5)
        }

    }

    /**
     * Preguntas de multiplicar alterando los resultados 
     * @returns 
     */
    static generateKgComidaAproximadaRandomQuestion() {
        const num1 = this.generateRandomNumber(100, 250);
        const num2 = this.generateRandomNumber(250, 500);
        const result = this.calculateNearestCentena(parseInt(((num1 + num2) / 2) * 7));

        const json = data.kgComidaAproximada;
        const resultJson = data.kgComidaAproximada[this.generateRandomNumber(0, json.length - 1)];
        const question = `${resultJson.first} ${num1} y ${num2}kg ${resultJson.second}`;

        return {
            question: question,
            answer: [result[0], result[0] - 100, result[0] + 100, result[0] + 200]
        }

    }

    /**
     * Generación de los problemas de billetes
     * Problemas de varias operaciones. 3 billetes de 50 y 4 billetes de 20 ¿Cuánto dinero hay en total? (Valores[nºbilletes] 1 al 10)
     * @returns 
     */
    static generateBilletesRandomQuestion() {
        const num1 = this.generateRandomNumber(1, 10);
        const num2 = this.generateRandomNumber(1, 10);

        const json = data.billetes;
        const index1 = this.generateRandomNumber(0, json.length - 1);
        let index2 = this.generateRandomNumber(0, json.length - 1);
        while (index2 === index1) { //Asegurarse que no salgan billetes repetidos
            index2 = this.generateRandomNumber(0, json.length - 1);
        }
        const resultJson1 = data.billetes[index1];
        const resultJson2 = data.billetes[index2];

        const question = ` ${num1} billetes de ${resultJson1.billete} y ${num2} billetes de ${resultJson2.billete}`;
        const result = (num1 * resultJson1.billete) + (num2 * resultJson2.billete);

        const answer = this.updateValuesAnswer(result, [result], 4, 1);

        return {
            question: question,
            answer: answer
        }
    }

    /**
     * Método que se encarga de generar todas las preguntas de división, mediante una palabra clave, puedo generar
     * un resultado de resto, si es exacta, etc.
     * @param {*} min1 
     * @param {*} max1 
     * @param {*} min2 
     * @param {*} max2 
     * @param {*} tipo 
     * @returns 
     */
    static generateDivisionesRandomQuestion(min1, max1, min2, max2, tipo) {
        const num1 = this.generateRandomNumber(min1, max1);
        const num2 = this.generateRandomNumber(min2, max2);


        const question = `${num1}:${num2}`;

        if (tipo === "division") {
            const result = parseInt(num1 / num2);
            return {
                question: question,
                answer: this.generarOpcionesDistorsion(result, 5)
            }
        } else if (tipo === "exacta") {
            const exacta = this.isDivisionExacta(num1, num2);
            return {
                question: question,
                answer: [exacta ? "Es exacta" : "Es entera", !exacta ? "Es exacta" : "Es entera"]
            }
        } else if (tipo === "resto") {
            const result = this.getResto(num1, num2);
            return {
                question: question,
                answer: this.generarOpcionesDistorsion(result, 5)
            }
        }
    }

    /**
     * Generación de preguntas para las fracciones de: Calcuala la mitad de x número, 
     * el tercio de x o el cuarto de x
     * @returns 
     */
    static generateFraccionRandomQuestion() {
        const num1 = this.generateRandomNumber(10, 100);
        const num2 = this.generateRandomNumber(2, 4);

        let fraccion = "";

        if (num2 === 2) {
            fraccion = "la mitad de";
        } else if (num2 === 3) {
            fraccion = "un tercio de";
        } else if (num2 === 4) {
            fraccion = "un cuarto de";
        }

        const question = `${fraccion} ${num1}`;

        const result = parseInt(num1 / num2);

        return {
            question: question,
            answer: this.generarOpcionesDistorsion(result, 5)
        }
    }

    /**
     * Conversión de unidades, pasar de m a cm, de cm a m y cm, etc.
     * @param {*} min 
     * @param {*} max 
     * @param {*} tipo 
     * @returns 
     */
    static generateConversionUnionRandomQuestion(min, max, tipo) {
        var num1 = 0;
        var num2 = 0;
        var question = "";
        var answer = [];
        switch (tipo) {
            case "conversionUnion":
                num1 = 1;
                num2 = this.generateRandomNumber(min, max);
                question = `${num1} m y ${num2} cm`;
                answer = this.convertirUnidadesMedidasGrandesAPequeñas(num1, num2, "cm", 100);
                return {
                    question: question,
                    answer: answer
                }
            case "conversionSeparacionCm":
                num1 = this.generateRandomNumber(min, max);
                question = `${num1} cm`;
                answer = this.convertirUnidadesMedidasPequeñasAGrandes(num1, 100, "m", "cm");
                return {
                    question: question,
                    answer: answer
                }
            case "conversionSeparacionMmm":
                num1 = this.generateRandomNumber(min, max);
                question = `${num1} mm`;
                answer = this.convertirUnidadesMedidasPequeñasAGrandes(num1, 10, "cm", "mm");
                return {
                    question: question,
                    answer: answer
                }
            case "conversionUnionProblema":
                num1 = 1; //m
                num2 = this.generateRandomNumber(min, max); //cm
                var num3 = this.generateRandomNumber(min, max); //cm
                question = ` ${num3} cm y la cuerda verde ${num1} m y ${num2} cm.`;
                answer = this.convertirUnidadesMedidasGrandesAPequeñas(num1, num2 + num3, "cm", 100);
                return {
                    question: question,
                    answer: answer
                }
            default:
                break;
        }
    }

    /**
     * 
     * @param {*} tipo 
     * @returns 
     */
    static generateKgLitrosProblemasRandomQuestion(tipo) {
        const kg = this.generateRandomNumber(1, 5);
        const mediosKg = this.generateRandomNumber(1, 5);
        const cuartosKg = this.generateRandomNumber(1, 5);

        const question = `${kg} ${tipo} + ${mediosKg} medios ${tipo} + ${cuartosKg} cuartos de ${tipo}`;
        const result = kg + (mediosKg * 1 / 2) + (cuartosKg * 1 / 4);
        const respuestaFalsa1 = kg + ((mediosKg + this.generateRandomNumber(1, 2)) * 1 / 2) + ((cuartosKg + this.generateRandomNumber(1, 2)) * 1 / 4);
        const respuestaFalsa2 = kg + ((mediosKg - this.generateRandomNumber(1, 2)) * 1 / 2) + ((cuartosKg + this.generateRandomNumber(1, 2)) * 1 / 4);
        const respuestaFalsa3 = kg + ((mediosKg + this.generateRandomNumber(1, 2)) * 1 / 2) + ((cuartosKg - this.generateRandomNumber(1, 2)) * 1 / 4);

        const answer = [
            this.convertirKilosLitrosAFracciones(result, tipo),
            this.convertirKilosLitrosAFracciones(respuestaFalsa1, tipo),
            this.convertirKilosLitrosAFracciones(respuestaFalsa2, tipo),
            this.convertirKilosLitrosAFracciones(respuestaFalsa3, tipo)
        ]

        return {
            question: question,
            answer: answer
        }
    }

    /**
     * 
     * @returns 
     */
    static generateLitroPrecioProblemasRandomQuestion() {
        const precio = this.generateRandomNumber(1, 10, true);
        const fraccion = this.generateRandomNumber(2, 4);
        var fraccionText = "";

        if (fraccion === 2) {
            fraccionText = "medio litro";
        } else if (fraccion === 3) {
            fraccionText = "un tercio de litro";
        } else {
            fraccionText = "un cuarto de litro";
        }

        const question = `${precio}€ ¿Cuánto cuesta ${fraccionText}`;
        const result = precio * (1 / fraccion);
        const respuestaFalsa1 = precio * (1 / fraccion) + 1;
        const respuestaFalsa2 = precio * (1 / (fraccion - 1));
        const respuestaFalsa3 = precio * (1 / (fraccion + 1));

        const answer = [
            parseFloat(result.toFixed(2)),
            parseFloat(respuestaFalsa1.toFixed(2)),
            parseFloat(respuestaFalsa2.toFixed(2)),
            parseFloat(respuestaFalsa3.toFixed(2)),
        ]

        return {
            question: question,
            answer: answer
        }
    }

    static generarHoraProblema(tipo) {
        if (tipo === "calcularTiempo") {
            var { hora1, hora2 } = this.generarHoraAleatoria();
            const question = `${hora1} y las ${hora2}`;
            const result = this.calcularTiempoMinutos(hora1, hora2);
            const answer = [
                this.convertirMinutosAHoras(result),
                this.convertirMinutosAHoras(result + this.generateRandomNumber(5, 20)),
                this.convertirMinutosAHoras(Math.abs(result - this.generateRandomNumber(5, 20))),
                this.convertirMinutosAHoras(result + this.generateRandomNumber(1, 4))
            ]
            return {
                question: question,
                answer: answer
            }
        } else if (tipo === "cuantoTiempoMañanaTarde") {
            var horaMañana = this.generateRandomNumber(6, 11);
            var horaNoche = this.generateRandomNumber(19, 23);
            const question = `${horaMañana} de la mañana y las ${horaNoche} de la noche`;
            const result = horaNoche - horaMañana;
            const answer = [
                result + " h",
                result + this.generateRandomNumber(2, 3) + " h",
                result - this.generateRandomNumber(2, 3) + " h",
                result + (this.generateRandomNumber(0, 1) ? +1:-1) + " h"
            ]
            return {
                question: question,
                answer: answer
            }
        } else if (tipo === "convertirTiempo") {
            const hora = this.generateRandomNumber(1, 23);
            const minuto = this.generateRandomNumber(1, 59);
            const question = `${hora} h y ${minuto} min`;
            const result = this.convertirTiempo(hora, minuto);
            const answer = [
                result + " min",
                result + this.generateRandomNumber(5, 20) + " min",
                result - this.generateRandomNumber(5, 20) + " min",
                result + this.generateRandomNumber(1, 4) + " min",
            ]
            return {
                question: question,
                answer: answer
            }
        }
    }

    /**
     * Generar problemas de pago x dinero por algo y me devuelven x dinero, en billetes y monedas. 
     * Y se trata de saber cuanto costaba el producto. Almacenado en math.json los billetes y 
     * monedas que hay. En este caso, se genera un valor aleatorio para que no siempre me traiga 
     * el mismo billete o moneda.
     */
    static generarCambioBilletesRandomQuestion() {
        const pago = this.generateRandomNumber(150, 300);
        const billetes = data.billetes;
        const monedas = data.monedas;
        const index1 = this.generateRandomNumber(0, billetes.length - 1);
        let index2 = this.generateRandomNumber(0, billetes.length - 1);
        while (index2 === index1) { //Asegurarse que no salgan billetes repetidos
            index2 = this.generateRandomNumber(0, billetes.length - 1);
        }
        const index3 = this.generateRandomNumber(0, monedas.length - 1);
        const numBillete1 = this.generateRandomNumber(1, 2);
        const numBillete2 = this.generateRandomNumber(1, 2);
        const numMonedas = this.generateRandomNumber(1, 2);
        const billete1 = billetes[index1].billete;
        const billete2 = billetes[index2].billete;
        const moneda = monedas[index3].moneda;

        const question = `${pago}€ por un televisor y me dan de cambio ${numBillete1} ${numBillete1 === 1 ? "billete" : "billetes"} de ${billete1}, ${numBillete2} ${numBillete2 === 1 ? "billete" : "billetes"} de ${billete2} y ${numMonedas} ${numMonedas === 1 ? "moneda": "monedas"} de ${moneda}€. `;
        const result = pago - ((numBillete1 * billete1) + (numBillete2 * billete2) + (numMonedas * moneda));
        const answer = [
            result + " €",
            result + this.generateRandomNumber(10, 20) + " €",
            result - this.generateRandomNumber(10,20) + " €",
            result + (this.generateRandomNumber(0, 1) ? + this.generateRandomNumber(21, 50) : - this.generateRandomNumber(21, 50)) + " €"
        ]

        return {
            question: question,
            answer: answer
        }
    }

    static generarAlquilerRandomQuestion() {
        const alquilerPorHora = this.generateRandomNumber(5, 20); //€ la hora
        let duracionAlquiler = this.generateRandomNumber(2, 5);
        const half = this.generateRandomNumber(0, 1);
        const question = `${alquilerPorHora} € la hora. ¿Cuánto cuesta alquilar una bicicleta ${duracionAlquiler} horas${half === 1 ? " y media": ""} ?`;

        if (half === 1) {
            duracionAlquiler = duracionAlquiler + 0.5;
        }

        const costeTotalAlquiler = alquilerPorHora * duracionAlquiler;

        const answer = [
            costeTotalAlquiler + " €",
            costeTotalAlquiler + this.generateRandomNumber(1, 3) + " €",
            costeTotalAlquiler - this.generateRandomNumber(1, 3) + " €",
            costeTotalAlquiler + (this.generateRandomNumber(0, 1) ? + this.generateRandomNumber(4, 5) : - this.generateRandomNumber(4, 5)) + " €",
        ]

        return {
            question: question,
            answer: answer
        }

    }

    static calcularTiempoMinutos(inicio, fin) {
        var inicioHoras = parseInt(inicio.split(':')[0]);
        var inicioMinutos = parseInt(inicio.split(':')[1]);

        var finHoras = parseInt(fin.split(':')[0]);
        var finMinutos = parseInt(fin.split(':')[1]);

        var tiempoTotalMinutos = (finHoras * 60 + finMinutos) - (inicioHoras * 60 + inicioMinutos);

        return tiempoTotalMinutos;
    }

    static convertirMinutosAHoras(minutos) {
        var horas = Math.floor(minutos / 60);
        var minutosRestantes = minutos % 60;
        var result = "";
        if (horas !== 0) {
            result = horas + " h ";
        }
        if (minutos !== 0) {
            result = result + minutosRestantes + " min";
        }

        return result;
    }

    static convertirTiempo(horas, minutos) {
        var tiempoTotalMinutos = (horas * 60) + minutos;
        return tiempoTotalMinutos;
    }

    static generarHoraAleatoria() {
        var hora1 = Math.floor(Math.random() * 24); // Genera un número aleatorio entre 0 y 23 para la primera hora
        var minuto1 = Math.floor(Math.random() * 60); // Genera un número aleatorio entre 0 y 59 para los minutos de la primera hora

        var hora2 = Math.floor(Math.random() * 24); // Genera un número aleatorio entre 0 y 23 para la segunda hora
        var minuto2 = Math.floor(Math.random() * 60); // Genera un número aleatorio entre 0 y 59 para los minutos de la segunda hora

        // Compara las horas generadas y las reordena si es necesario
        if (hora1 > hora2 || (hora1 === hora2 && minuto1 > minuto2)) {
            var tempHora = hora1;
            var tempMinuto = minuto1;
            hora1 = hora2;
            minuto1 = minuto2;
            hora2 = tempHora;
            minuto2 = tempMinuto;
        }

        // Formatea las horas y los minutos para que tengan siempre dos dígitos
        var horaFormateada1 = hora1.toString().padStart(2, '0');
        var minutoFormateado1 = minuto1.toString().padStart(2, '0');
        var horaFormateada2 = hora2.toString().padStart(2, '0');
        var minutoFormateado2 = minuto2.toString().padStart(2, '0');

        return {
            hora1: horaFormateada1 + ':' + minutoFormateado1,
            hora2: horaFormateada2 + ':' + minutoFormateado2
        };
    }

    static convertirKilosLitrosAFracciones(value, tipo) {
        var entero = Math.floor(value); // Obtiene la parte entera de los kilos
        var fraccion = value - entero; // Obtiene la parte decimal de los kilos

        if (fraccion === 0.5) {
            return `${entero} ${tipo} y medio`;
        } else if (fraccion === 0.25) {
            return `${entero} ${tipo} y un cuarto`;
        } else if (fraccion === 0.75) {
            return `${entero} ${tipo} y tres cuartos`;
        } else {
            return `${entero} ${tipo}`; // Si no hay una fracción específica, solo muestra los kilos o litros
        }
    }

    static convertirUnidadesMedidasGrandesAPequeñas(unidad1, unidad2, conversion, trasnform) {
        var totalUnidad = unidad1 * trasnform + unidad2;

        var respuestas = [totalUnidad + " " + conversion];
        var respuestaFalsa1 = (unidad1 + unidad2) + " " + conversion;
        var respuestaFalsa2 = (unidad1) + "" + (unidad2 * 10) + " " + conversion;
        var respuestaFalsa3 = (unidad1) + "" + (unidad2 * 100) + " " + conversion;

        respuestas.push(respuestaFalsa1, respuestaFalsa2, respuestaFalsa3);

        return respuestas;
    }

    static convertirUnidadesMedidasPequeñasAGrandes(num, trasnform, unidad1, unidad2) {
        var metros = Math.floor(num / trasnform); // Obtiene la parte entera de la división
        var centimetros = num % trasnform; // Obtiene el resto de la división

        var respuestas = [metros + " " + unidad1 + " y " + centimetros + " " + unidad2];

        // Generar respuestas falsas
        var respuestaFalsa1 = (metros * 10 + Math.floor(centimetros / 10)) + " " + unidad1 + " y " + (centimetros % 10) + " " + unidad2;
        var respuestaFalsa2 = (metros * 10 + Math.floor(centimetros / 10)) + " " + unidad1 + " y " + (centimetros * 10) + " " + unidad2;
        var respuestaFalsa3 = metros + " " + unidad1 + " y " + (centimetros * 100) + " " + unidad2;

        respuestas.push(respuestaFalsa1, respuestaFalsa2, respuestaFalsa3);

        return respuestas;
    }


    static isDivisionExacta(dividendo, divisor) {
        return dividendo % divisor === 0;
    }

    static getResto(dividendo, divisor) {
        return dividendo % divisor;
    }

    /**
     * Función recursiva que devuelve una distorsión del resultado y lo hace dependiendo del número de length
     * @param {*} result valor a distorsionar
     * @param {*} array [result]
     * @param {*} length numeroDistorsiones
     * @param {*} index 1 -> Elemento que hay dentro del array, el propio resultado
     * @returns [valorDistorsion, distorsion1, distorsion2, ...]
     */
    static updateValuesAnswer(result, array, length, index) {
        if (index === length) {
            return array;
        } else {
            const shouldIncrement = Math.random() < 0.5;
            const updatedValues = this.updateValues(result, array, shouldIncrement);
            return this.updateValuesAnswer(result, updatedValues, length, index + 1);
        }
    }



    static updateValues(number, values, shouldIncrement) {
        let newValue;

        if (shouldIncrement) {
            if (number < 200) {
                newValue = Math.min(number + 10, 200);
            } else {
                newValue = Math.max(number - 10, 50);
            }
        } else {
            if (number > 50) {
                newValue = Math.max(number - 10, 50);
            } else {
                newValue = Math.min(number + 10, 200);
            }
        }

        while (values.includes(newValue)) {
            if (shouldIncrement) {
                if (newValue < 200) {
                    newValue += 10;
                } else {
                    newValue -= 10;
                }
            } else {
                if (newValue > 50) {
                    newValue -= 10;
                } else {
                    newValue += 10;
                }
            }
        }

        values.push(newValue);
        return values;
    }

    //Distorsion de los valores
    static generarOpcionesDistorsion(valorVerdadero, rangoDistorsion) {
        const opciones = [valorVerdadero.toString()];

        while (opciones.length < 4) {
            const distorsion = Math.floor(Math.random() * (rangoDistorsion * 2 + 1)) - rangoDistorsion; // Generamos un número aleatorio dentro del rango de distorsión
            const opcionFalsa = valorVerdadero + distorsion; // Aplicamos la distorsión al valor verdadero

            if (opcionFalsa !== valorVerdadero && opcionFalsa > 0 && !opciones.includes(opcionFalsa.toString())) {
                opciones.push(opcionFalsa.toString()); // Agregamos la opción falsa a la lista de opciones si cumple con los requisitos
            }
        }

        return opciones;
    }

    static approximateToNearestTen(value) {
        const nearestTen = Math.round(value / 10) * 10;
        return nearestTen;
    }

    static calculateNearestCentena(value) {
        const lowerCentena = Math.floor(value / 100) * 100;
        const higherCentena = lowerCentena + 100;
        const nearestCentena = value - lowerCentena < higherCentena - value ? lowerCentena : higherCentena;

        return [nearestCentena, lowerCentena, higherCentena];
    }

    // Generar un número aleatorio entre los dos valores
    static generateRandomNumber(min, max, decimal = false) {
        if (decimal) {
            var numeroAleatorio = Math.random();
            var diferencia = max - min; // Calcula la diferencia entre el máximo y el mínimo
            var numeroDecimal = (numeroAleatorio * diferencia) + min;
            var numeroDecimalRedondeado = numeroDecimal.toFixed(2); // Dos decimales
            return parseFloat(numeroDecimalRedondeado); // Decimal
        } else {
            min = Math.ceil(min); //Redondear hacia arriba, para asegurar que los valores esten en el rango si son decimales
            max = Math.floor(max); // Redondear hacia abajo, para asegurar que los valores esten en el rango si son decimales
            return Math.floor(Math.random() * (max - min + 1)) + min; // Generar un número aleatorio en el rango
        }

    }

    static generateThreeDigits() {
        const numbers = [];
        const allNumbers = Array.from({ length: 29 }, (_, index) => index); // Crea un array con los números del 0 al 28

        for (let i = 0; i < 3; i++) {
            const randomIndex = Math.floor(Math.random() * allNumbers.length); // Genera un índice aleatorio dentro del rango actual de números disponibles
            const randomNumber = allNumbers[randomIndex]; // Obtiene el número correspondiente al índice generado

            numbers.push(randomNumber);
            allNumbers.splice(randomIndex, 1); // Elimina el número del array de números disponibles
        }

        return numbers;
    }

    static separateDigits(number) {
        const digits = [];
        let temp = number;

        while (temp > 0) {
            const digit = temp % 10;
            digits.unshift(digit);
            temp = Math.floor(temp / 10);
        }

        return digits;
    };

    static generateAnwserComposicion(digits) {
        const first = digits[0];
        const second = digits[1];
        const third = digits[2];
        const fourth = digits[3];
        const min = 0;
        const max = 9;


        const question = `${first !== 0 ? `${first}UM + ` : ""}${second !== 0 ? `${second}C + ` : ""}${third !== 0 ? `${third}D + ` : ""}${fourth !== 0 ? `${fourth}U` : ""}`;

        const answerFalse0 = `${first}${second}${third}${fourth}`;
        let num1 = Math.floor(Math.random() * (max - min + 1) + min);
        while (num1 === third) {
            num1 = Math.floor(Math.random() * (max - min + 1) + min);
        }
        const answerFalse1 = `${first}${second}${num1}${first}`;


        const answerFalse2 = `${first}${second}${third}${third}${fourth}`;

        let num2 = Math.floor(Math.random() * (max - min + 1) + min);
        while (num2 === fourth) {
            num2 = Math.floor(Math.random() * (max - min + 1) + min);
        }
        const answerFalse3 = `${first}${second}${third}${num2}`;

        return {
            question: this.eliminarSimboloMas(question),
            answer: [
                this.eliminarSimboloMas(answerFalse0),
                this.eliminarSimboloMas(answerFalse1),
                this.eliminarSimboloMas(answerFalse2),
                this.eliminarSimboloMas(answerFalse3)
            ]
        };
    }

    static generateAnwserDescomposicion(digits) {
        const first = digits[0];
        const second = digits[1];
        const third = digits[2];
        const fourth = digits[3];

        const answerTrue = `${first !== 0 ? `${first}UM + ` : ""}${second !== 0 ? `${second}C + ` : ""}${third !== 0 ? `${third}D + ` : ""}${fourth !== 0 ? `${fourth}U` : ""}`;

        const answerFalse1 = `${first !== 0 ? `${first}C + ` : ""}${second !== 0 ? `${second}UM + ` : ""}${third !== 0 ? `${third}U + ` : ""}${fourth !== 0 ? `${fourth}D` : ""}`;

        const answerFalse2 = `${first !== 0 ? `${first}D + ` : ""}${second !== 0 ? `${second}U + ` : ""}${third !== 0 ? `${third}UM + ` : ""}${fourth !== 0 ? `${fourth}C` : ""}`;

        const answerFalse3 = `${first !== 0 ? `${first}U + ` : ""}${second !== 0 ? `${second}D + ` : ""}${third !== 0 ? `${third}C + ` : ""}${fourth !== 0 ? `${fourth}UM` : ""}`;

        return [
            this.eliminarSimboloMas(answerTrue),
            this.eliminarSimboloMas(answerFalse1),
            this.eliminarSimboloMas(answerFalse2),
            this.eliminarSimboloMas(answerFalse3)
        ];
    }

    static eliminarSimboloMas(cadena) {
        while (cadena.endsWith(" ")) { //Eliminar todos los espacios en blanco que haya al final de la cadena
            cadena = cadena.slice(0, -1);
        }
        if (cadena.endsWith("+")) { //Eliminar el simbolo + si hay al final de la cadena
            cadena = cadena.slice(0, -1);
        }
        return cadena;
    }
}

export default Matematicas;