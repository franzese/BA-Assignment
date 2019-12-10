/***
 *  FUNCTION isNegative(n)
 *  Takes input integer n and returns NEGATIVE keyword string if the integer is below 0
 */
const isNegative = (n) => {
    if (n < 0) {
        return NEGATIVE;
    } else {
        return '';
    }
}
/***
 *  Special strings
 */
const NEGATIVE = 'negative';
const COMMA = ',';
const SPACE = ' ';
const AND = 'and';
const HYPHEN = '-';

if (process.argv.length <= 2 ) {
    console.log('You didn\'t give me a number!');
} else {
    const number = parseInt(process.argv[2]);
    const output = `${isNegative(number)} ${number}`;
    console.log(output);
    debugger;
}


// having serious debates about this
// asked all my friends 
// the number "1271" comes out in multiple ways:
// > "one thousand seventy one"
// > "one thousand'n seventy one"
// > "one thousand and seventy one"
// > "twelve seventy one"

