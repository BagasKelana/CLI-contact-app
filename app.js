// import * as data from "./contact.js"

// data.writeData(data.readData(data.nama, data.email, data.noHp))
import yargs from "yargs"
import {hideBin} from "yargs/helpers"
import {
	simpanContact,
	listContact,
	getContact,
	deleteContact,
} from "./contact.js"

const tambah = yargs(hideBin(process.argv))
tambah.command({
	command: "add",
	describe: "mendapatkan data",
	builder: {
		nama: {
			describe: "Nama Lengkap",
			demandOption: true,
			type: "string",
		},
		email: {
			describe: "email",
			demandOption: false,
			type: "string",
		},
		noHp: {
			describe: "noHp",
			demandOption: true,
			type: "string",
		},
	},
	handler(argv) {
		simpanContact(argv.nama, argv.email, argv.noHp)
	},
})
tambah.command({
	command: "show",
	describe: "menampilkan list contact",
	handler() {
		listContact()
	},
})
tambah.command({
	command: "get",
	describe: "mendapatkan contact berdasarkan nama",
	builder: {
		nama: {
			describe: "Nama Lengkap",
			demandOption: true,
			type: "string",
		},
	},
	handler(argv) {
		getContact(argv.nama)
	},
})
tambah
	.command({
		command: "delete",
		describe: "menghapus contact berdasarkan nama",
		builder: {
			nama: {
				describe: "Nama Lengkap",
				demandOption: true,
				type: "string",
			},
		},
		handler(argv) {
			deleteContact(argv.nama)
		},
	})
	.demandCommand()

tambah.parse()
