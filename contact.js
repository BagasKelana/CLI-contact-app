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
function readContact() {
	const read = fs.readFileSync("source/file.json", "utf-8")
	const readJ = JSON.parse(read)
	return readJ
}
export function simpanContact(nama, email, noHp) {
	const readJ = readContact()
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
export function listContact() {
	const list = readContact()
	console.log(chalk.bold.bgBlue("List Contacts"))
	list.forEach((n, i) => {
		if (!n.email) {
			console.log(`${i + 1}. ${chalk.bold.red(`${n.nama}--${n.noHp}`)} `)
		}
		console.log(
			`${i + 1}. ${chalk.bold.red(`${n.nama}--${n.email}--${n.noHp}`)} `
		)
	})
}
export function getContact(nama) {
	const list = readContact()
	const [newList] = list.filter((n) => n.nama === nama)

	if (!newList) {
		console.log(chalk.bold.bgRed(`${nama} tidak terdaftar`))
		return false
	}
	console.log(chalk.bgGreenBright(`${newList.nama}`))
	console.log(`${newList.noHp}`)
	if (!!newList.email) {
		console.log(`${newList.email}`)
	}
}
export function deleteContact(nama) {
	const list = readContact()
	const newList = list.filter((n) => n.nama !== nama)
	if (newList.length === list.length) {
		console.log(chalk.bold.bgRed(`delete gagal, ${nama} tidak terdaftar`))
		return false
	}
	writeData(newList)
	console.log(`${chalk.bold.green.inverse(`Sukses delete ${nama} kontak`)}`)
}
