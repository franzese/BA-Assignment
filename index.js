const SpecialStrings = require('./lib/SpecialStrings')
const GROUPSIZE = 3
/***
 *  FUNCTION isNegative(n)
 *  Takes input integer n and returns NEGATIVE keyword string if the integer is below 0
 */
const isNegative = n => {
    if (n < 0) {
        return SpecialStrings.NEGATIVE
    } else {
        return ''
    }
}

/***
 * FUNCTION numberToReadableString(n)
 * Takes input integer n and breaks it up into groups of human readable strings
 */
const numberToReadableString = n => {
    let readable = ''
    const negative = isNegative(n)
    if (negative) {
        readable += negative + SpecialStrings.SPACE
        n *= -1
    }
    const groups = getGroupsFromInt(n, getIntLength(n))

    groups.forEach(group => {
        readable += groupToReadableString(group)
        debugger
    })
    return readable
}

const getIntLength = n => {
    return n.toString().length
}

const getGroupsFromInt = (n, len) => {
    const numAsString = n.toString(),
        groups = []

    for (let i = len; i > 0; i -= GROUPSIZE) {
        let min = i - GROUPSIZE || 0
        let g = numAsString.slice(i - GROUPSIZE, i)
        groups.unshift(parseInt(g)) // TODO make this an object with strings and INTs
    }
    return groups
}

const groupToReadableString = g => {
    const numAsString = g.toString()
    let readable = ''

    // N__
    if (parseInt(numAsString[0]) != 0) {
        readable +=
            SpecialStrings.PRIMARYGROUP[parseInt(numAsString[0])] +
            SpecialStrings.SPACE +
            SpecialStrings.PARENTGROUP[0] +
            SpecialStrings.SPACE
    }

    //  _N_
    if (parseInt(numAsString[1]) >= 2) {
        readable +=
            SpecialStrings.AND +
            SpecialStrings.SPACE +
            SpecialStrings.SECONDARYGROUP[parseInt(numAsString[1])] +
            SpecialStrings.HYPHEN +
            SpecialStrings.PRIMARYGROUP[parseInt(numAsString[2])]
    } else {
        readable +=
            SpecialStrings.AND +
            SpecialStrings.SPACE +
            SpecialStrings.PRIMARYGROUP[parseInt(numAsString[1] + numAsString[2])]
    }
    return readable
}

if (process.argv.length <= 2) {
    console.log("You didn't give me a number!")
} else {
    const number = parseInt(process.argv[2])
    const output = `[${number}]-> ${numberToReadableString(number)}`
    console.log(output)
}
