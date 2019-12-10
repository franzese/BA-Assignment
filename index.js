const ReadableString = require('./lib/ReadableString')

if (process.argv.length <= 2) {
    console.log('FAIL: Missing input')
} else {
    try {
        const number = parseInt(process.argv[2])
        const rs = new ReadableString(number)
        console.log(rs.toString())
    } catch (e) {
        debugger
        console.log(e)
        console.log('FAIL: Malformed input')
    }
}
