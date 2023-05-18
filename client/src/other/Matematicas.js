class Matematicas {

    static generateFourDigitRandomNumber() {
        const min = 1000;
        const max = 9999;
        const number = Math.floor(Math.random() * (max - min + 1) + min);
        const answer = this.generateAnwserDescomposicion(this.separateDigits(number));
        return {number, answer};
    }

    static generateFourDigitComposicionRandomNumber() {
        const min = 1000;
        const max = 9999;
        const num = Math.floor(Math.random() * (max - min + 1) + min);
        const { number, answer } = this.generateAnwserComposicion(this.separateDigits(num));
        return {number, answer};
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
            number: this.eliminarSimboloMas(question), 
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