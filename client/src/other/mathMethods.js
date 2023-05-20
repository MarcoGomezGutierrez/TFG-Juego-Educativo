export const methodMap = {
    "descomposicion": {
      method: "generateFourDigitRandomQuestion",
      args: []
    },
    "composicion": {
      method: "generateFourDigitComposicionRandomQuestion",
      args: []
    },
    "numeroOrdinal": {
      method: "generateOrdinalRandomQuestion",
      args: []
    },
    "resta": {
      method: "generateRestaRandomQuestion",
      args: []
    },
    "proximaCentena": {
      method: "generateNearestCentenaRandomQuestion",
      args: []
    },
    "estimacionProblema": {
      method: "generateEstimationProblemRandomQuestion",
      args: []
    },
    "problemaQuitarKg": {
      method: "generateKgProblemRandomQuestion",
      args: []
    },
    "multiplicacion": {
      method: "generateMultiplicationRandomQuestion",
      args: [1, 10, 1, 10]
    },
    "dobleTriple": {
      method: "generateDobleTripleRandomQuestion",
      args: []
    },
    "multiplicacionUpgrade": {
      method: "generateMultiplicationRandomQuestion",
      args: [10, 90, 2, 9]
    },
    "kgComidaAproximada": {
      method: "generateKgComidaAproximadaRandomQuestion",
      args: []
    },
    "billetes": {
      method: "generateBilletesRandomQuestion",
      args: []
    },
    "division": {
      method: "generateDivisionesRandomQuestion",
      args: [10, 100, 1, 10, "division"]
    },
    "divisionExacta": {
      method: "generateDivisionesRandomQuestion",
      args: [10, 100, 1, 10, "exacta"]
    },
    "divisionResto": {
      method: "generateDivisionesRandomQuestion",
      args: [10, 100, 1, 10, "resto"]
    },
    "divisionFraccion": {
      method: "generateFraccionRandomQuestion",
      args: []
    },
    "divisionGrande": {
      method: "generateDivisionesRandomQuestion",
      args: [1000, 10000, 1, 10, "division"]
    },
    "conversionUnion": {
      method: "generateConversionUnionRandomQuestion",
      args: [1, 19, "conversionUnion"]
    },
    "conversionSeparacionCm": {
      method: "generateConversionUnionRandomQuestion",
      args: [100, 999, "conversionSeparacionCm"]
    },
    "conversionSeparacionMmm": {
      method: "generateConversionUnionRandomQuestion",
      args: [10, 999, "conversionSeparacionMmm"]
    },
    "conversionUnionProblema": {
      method: "generateConversionUnionRandomQuestion",
      args: [10, 99, "conversionUnionProblema"]
    },
    "fraccionesKg": {
      method: "generateKgLitrosProblemasRandomQuestion",
      args: ["kilos"]
    },
    "fraccionesLitros": {
      method: "generateKgLitrosProblemasRandomQuestion",
      args: ["litros"]
    },
    "litroPrecio": {
      method: "generateLitroPrecioProblemasRandomQuestion",
      args: []
    },
    "calcularTiempo": {
      method: "generarHoraProblema",
      args: ["calcularTiempo"]
    },
    "cuantoTiempoMañanaTarde": {
      method: "generarHoraProblema",
      args: ["cuantoTiempoMañanaTarde"]
    },
    "convertirTiempo": {
      method: "generarHoraProblema",
      args: ["convertirTiempo"]
    },
    "cambioBilletes": {
      method: "generarCambioBilletesRandomQuestion",
      args: []
    },
    "alquilerHora": {
      method: "generarAlquilerRandomQuestion",
      args: []
    }
  };