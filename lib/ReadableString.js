const SpecialStrings = require('./SpecialStrings')

class ReadableString {
    constructor(input) {
        this.input = { string: input.toString(), integer: parseInt(input) }
        if (this.input.integer < 0) {
            this.isNegative = true
            this.input.integer *= -1
            this.input.string = this.input.string.slice(1)
        } else if (this.input.integer == 0) {
            this.isZero = true
        } else {
            this.isNegative = false
        }
        Object.freeze(this.input)
        this.groupSize = 3
        this.groups = this.getGroups()
    }

    getGroups() {
        let groups = []
        let inputString = this.input.string
        while (inputString.length > 0) {
            // remove a group from the right until inputString is empty
            let group = inputString.slice(-Math.abs(this.groupSize))
            inputString = inputString.substring(0, inputString.length - this.groupSize)
            groups.unshift(new ReadableGroup(group))
        }
        return groups
    }

    toString() {
        // add 'negative'
        let readable = this.isNegative ? SpecialStrings.NEGATIVE + SpecialStrings.SPACE : ''
        if (this.isZero) {
            // zero is a special case to simplify main digit logic
            // otherwise the string 'zero' would appear in numbers like 100, 1020, etc
            readable += SpecialStrings.ZERO
        } else {
            // turn each group into readable strings
            let i = this.groups.length
            for (i; i > 0; i--) {
                let j = this.groups.length - i
                let newReadable = this.groups[j].toString()
                if (newReadable.trim().length) {
                    readable += newReadable
                    readable += SpecialStrings.MAGNITUDE[i - 1] + SpecialStrings.SPACE
                }
            }
        }
        return readable.trim()
    }
}

class ReadableGroup {
    constructor(input) {
        this.input = { string: input.toString(), integers: [] }
        while (input.length > 0) {
            let integer = input.slice(-1)
            input = input.substring(0, input.length - 1)
            this.input.integers.unshift(parseInt(integer))
        }
    }

    /***
     * a - First digit
     * Returns string
     */
    singleDigitToString(a) {
        return SpecialStrings.NUMBER[a]
    }

    /***
     * a - First digit
     * b - Second digit
     * Returns string
     */
    doubleDigitToString(a, b) {
        let readable = ''
        if (a >= 2) {
            readable += SpecialStrings.SECONDARYGROUP[a]
            if (b > 0) {
                readable += SpecialStrings.HYPHEN
                readable += SpecialStrings.NUMBER[b]
            }
        } else {
            // teen-number
            let dd = a * 10 + b
            readable += SpecialStrings.NUMBER[dd]
        }
        return readable
    }

    toString() {
        let readable = []
        if (this.input.string.length == 3) {
            if (this.input.integers[0] != 0) {
                readable.push(this.singleDigitToString(this.input.integers[0]))
                readable.push(SpecialStrings.HUNDRED)
            }
            readable.push(this.doubleDigitToString(this.input.integers[1], this.input.integers[2]))
        } else if (this.input.string.length == 2) {
            readable.push(this.doubleDigitToString(this.input.integers[0], this.input.integers[1]))
        } else if (this.input.string.length == 1) {
            readable.push(this.singleDigitToString(this.input.integers[0]))
        }

        let readableString = ''
        readable.forEach(r => {
            readableString += r.toString() + SpecialStrings.SPACE
        })
        return readableString
    }
}

module.exports = ReadableString
