const SpecialStrings = require('./SpecialStrings')

class ReadableString {
    constructor(input) {
        console.log(input)
        this.input = { string: input.toString(), integer: parseInt(input) }
        if (this.input.integer < 0) {
            this.isNegative = true
            this.input.integer *= -1
            this.input.string = this.input.string.slice(1)
        } else {
            this.isNegative = false
        }
        Object.freeze(this.input)
        this.groups = this.getGroups()
    }
    getGroups() {
        let groups = []
        let inputString = this.input.string
        while (inputString.length > 0) {
            let group = inputString.slice(-3)
            inputString = inputString.split(group)[0]
            groups.unshift(new ReadableGroup(group))
        }
        return groups
    }
    toString() {
        // add 'negative'
        let readable = this.isNegative ? SpecialStrings.NEGATIVE + SpecialStrings.SPACE : ''
        // turn each group into readable strings
        this.groups.forEach(group => {
            readable += group.toString()
        })
        return readable
    }
}

class ReadableGroup {
    constructor(input) {
        this.input = { string: input.toString(), integers: [] }
        while (input.length > 0) {
            let integer = input.slice(-1)
            input = input.split(integer)[0]
            this.input.integers.unshift(parseInt(integer))
        }
    }
    toString() {
        let readable = ''
        debugger
        if (this.input.integers[0] != 0) {
            readable +=
                SpecialStrings.PRIMARYGROUP[this.input.string[0]] +
                SpecialStrings.SPACE +
                SpecialStrings.PARENTGROUP[0] +
                SpecialStrings.SPACE
        }
        if (this.input.integers[1] >= 2) {
            readable +=
                SpecialStrings.AND +
                SpecialStrings.SPACE +
                SpecialStrings.SECONDARYGROUP[this.input.integers[1]] +
                SpecialStrings.HYPHEN +
                SpecialStrings.PRIMARYGROUP[this.input.integers[2]]
        } else {
            readable +=
                SpecialStrings.AND +
                SpecialStrings.SPACE +
                SpecialStrings.PRIMARYGROUP[parseInt(this.input.string[1] + this.input.string[2])]
        }
        return readable
    }
}

module.exports = ReadableString
