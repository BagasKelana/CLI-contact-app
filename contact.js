import validator from "validator"
import chalk from "chalk"
import * as fs from "fs"
// import * as rl from "readline"
// import {stdin as input, stdout as output} from "process"

// const read = rl.createInterface({input, output})
if (!fs.existsSync("./source")) {
	fs.mkdirSync("./source")
}

if (!fs.existsSync("./source/file.json")) {
	fs.writeFileSync("./source/file.json", "[]")
}

// function pertanyaan(tanya) {
// 	return new Promise((resolve) => {
// 		read.question(tanya, (hasil) => resolve(hasil))
// 	})
// }
// async function contact() {
// 	try {
// 		const nama = await pertanyaan("siapa namamu? ")
// 		const email = await pertanyaan("Masukan email : ")
// 		const noHp = await pertanyaan("Masukan no Hp : ")
// 		console.log(`Input nama, email dan nohp Berhasil!`)
// 		read.close()
// 		return {nama, email, noHp}
// 	} catch (err) {
// 		throw (err = "input nama, email dan noHp tidak valid")
// 	}
// }
// export const {nama, email, noHp} = await contact()

export function simpanContact(nama, email, noHp) {
	const read = fs.readFileSync("source/file.json", "utf-8")
	const readJ = JSON.parse(read)
	const duplicat = readJ.find((n) => {
		return n.nama === nama
	})
	if (duplicat) {
		console.log(
			`${chalk.bold.blue.inverse("Maaf, Nama yang anda masukan sudah ada!!")}`
		)
		return false
	}
	if (!validator.isEmail(email)) {
		console.log(`${chalk.bold.red.inverse("Maaf, Email anda tidak Valid!!")}`)
		return false
	}
	if (!validator.isMobilePhone(noHp, "id-ID")) {
		console.log(`${chalk.bold.yellow.inverse("Maaf, noHp anda tidak valid")}`)
		return false
	}
	readJ.push({
		nama,
		email,
		noHp,
	})
	writeData(readJ)
	console.log(`${chalk.bold.green.inverse(`Sukses memasukan data kontak`)}`)
}
function writeData(data) {
	fs.writeFile("source/file.json", JSON.stringify(data), "utf-8", (err) => {
		if (err) throw (err = "write file tidak berhasil")
	})
}
