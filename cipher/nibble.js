/**
 *
 * Nibbles.js
 *
 * @author Ellaira Torio | 18021275
 */

const { exit } = require("process")

function toBin(str, base, length) {
    return str
        .split("")
        .map((ch) => {
            return formatBin(ch, base, length)
        })
        .join(" ")
}

function decrypt(str, key) {
    console.log("DECRYPTING... 🔓✅")
    let output = ""
    const bin = toBin(str, key, 4).split(" ")
    // console.log(bin)
    try {
        pairNibbles(bin, (curr, next) => (output += nibblesToString(curr, next)))
        return output + "\n"
    } catch (error) {
        console.log("Something went wrong 🔐❌")
    }
}

function encrypt(str, key) {
    const data = toBin(str, 2, 8)
    console.log("ENCRYPTING... 🔐")
    try {
        return (
            data
                .split(" ")
                .map((ch) => {
                    return [
                        String.fromCharCode(parseInt(ch.slice(0, 4), key)) +
                            String.fromCharCode(parseInt(ch.slice(4, 8), key)),
                    ]
                })
                .join("") + "\n"
        )
    } catch {
        console.log("Something went wrong 🔐❌")
    }
}

function pairNibbles(arr, func) {
    for (var i = 0; i < arr.length; i += 2) {
        func(arr[i], arr[i + 1])
    }
}

function nibblesToString(n1, n2) {
    const byte = (n1 + n2).trim()
    return String.fromCharCode(parseInt(byte, 2))
}

function formatBin(bin, base, length) {
    try {
        return bin.charCodeAt(0).toString(base).padStart(length, "0")
    } catch (error) {
        console.error("something went wrong ❌: \n" + error.message)
        exit()
    }
}

const key = "16"

const msg = "The highest bidding price is 406714 NZ$"

console.log("Original: " + msg + "\n")

const en = encrypt(msg, key)
console.log(en)

const dec = decrypt(en, key)
console.log(dec)