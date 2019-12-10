/***
 *  FUNCTION isNegative(n)
 *  Takes input integer n and returns NEGATIVE keyword string if the integer is below 0
 */
const isNegative = n => {
    if (n < 0) {
        return NEGATIVE
    } else {
        return ''
    }
}

/***
 * FUNCTION numberToReadableString(n)
 * Takes input integer n and breaks it up into groups of human readable strings
 */
const numberToReadableString = n => {
    return n.toString()
}

/***
 *  Special strings
 */
const NEGATIVE = 'negative'
const COMMA = ','
const SPACE = ' '
const AND = 'and'
const HYPHEN = '-'
const GROUPSIZE = 3
const GROUPTOTAL = 100

if (process.argv.length <= 2) {
    console.log("You didn't give me a number!")
} else {
    const number = parseInt(process.argv[2])
    const output = `[${number}]-> ${isNegative(number)} ${numberToReadableString(number)}`
    console.log(output)
}
