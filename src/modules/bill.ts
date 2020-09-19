type BillFaType =
	| "آب"
	| "برق"
	| "گاز"
	| "تلفن ثابت"
	| "تلفن همراه"
	| "عوارض شهرداری"
	| "سازمان مالیات"
	| "جرایم راهنمایی و رانندگی"
	| "unknown";
type Currency = "toman" | "rial";

interface IBillTypes {
	[key: number]: BillFaType;
}

interface FindByBarcode {
	billId: string;
	payId: string;
}

interface IBillData {
	// bill amount
	amount: number;

	// bill type
	type: string;

	// bill barcode
	barcode: string;

	// bill validation
	isValid: boolean;

	// is valid bill id that should be true if bill id and true
	isValidBillId: boolean;

	// id valid bill payment code
	isValidBillPayment: boolean;

	// find billId and billPayment by barcode
	findByBarcode: FindByBarcode;
}

interface Params {
	billId?: number | string;
	paymentId?: number | string;
	currency?: Currency;
	barcode?: string;
}

class Bill {
	barcode: string | null;
	currency: Currency;
	billTypes: IBillTypes;
	billId: string;
	billPayment: string;

	constructor({ billId, paymentId, currency, barcode }: Params) {
		this.barcode = barcode || null;
		this.currency = currency || "toman";
		this.billId = "";
		this.billPayment = "";
		this.billTypes = {
			1: "آب",
			2: "برق",
			3: "گاز",
			4: "تلفن ثابت",
			5: "تلفن همراه",
			6: "عوارض شهرداری",
			8: "سازمان مالیات",
			9: "جرایم راهنمایی و رانندگی",
		};

		if (billId && paymentId) {
			this.setId(String(billId));
			this.setPeymentId(String(paymentId));
		}
	}

	private setId(billId: string): void {
		this.billId = billId;
	}

	private setPeymentId(billPayment: string): void {
		this.billPayment = billPayment;
	}

	public setBarcode(barcode: string): void {
		this.barcode = barcode;
	}

	public getBillAmount(): number {
		const currency = this.currency == "rial" ? 1000 : 100;
		const amount = parseInt(String(this.billPayment).slice(0, -5)) * currency;

		return amount;
	}

	public getBillType(): BillFaType {
		return this.billTypes[Number(String(this.billId)?.slice(-2, -1))] ?? "unknown";
	}

	public getBarcode(): string {
		return this.billId + "000" + this.billPayment;
	}
	public findByBarcode(): FindByBarcode {
		if (this.barcode) {
			return {
				billId: this.barcode.substr(0, 13),
				payId: this.barcode.substr(16, 10),
			};
		} else {
			return {
				billId: "",
				payId: "",
			};
		}
	}

	private verificationBillPayment(): boolean {
		let payId = parseInt(this.billPayment, 10).toString();
		const billId = parseInt(this.billId, 10).toString();
		let result = false;
		if (!payId || payId.length < 6) {
			return result;
		}
		const firstControllBit = payId.charAt(payId.length - 2) + "";
		const secondControlBit = payId.charAt(payId.length - 1) + "";
		payId = payId.substr(0, payId.length - 2);
		result =
			this.CalTheBit(payId) === Number(firstControllBit) &&
			this.CalTheBit(billId + payId + firstControllBit) === Number(secondControlBit);
		return result;
	}

	private verificationBillId(): boolean {
		let newBillId = parseInt(this.billId, 10).toString();

		let result = false;
		if (!newBillId || newBillId.length < 6) {
			return false;
		}
		const controlBit = newBillId.substr(newBillId.length - 1);
		newBillId = newBillId.substr(0, newBillId.length - 1);
		const tempResult = this.CalTheBit(newBillId);
		result = tempResult === Number(controlBit);
		const billType = this.getBillType();
		return result && billType !== "unknown";
	}

	private CalTheBit(num: string): number {
		let sum = 0;
		let Base = 2;
		for (let i = 0; i < num.length; i++) {
			if (Base === 8) {
				Base = 2;
			}
			const subString = num.substring(num.length - 1 - i, num.length - i);
			sum += Number(subString) * Base;
			Base++;
		}
		sum %= 11;
		if (sum < 2) sum = 0;
		else sum = 11 - sum;
		return sum;
	}

	private verificationBill(): boolean {
		return this.verificationBillPayment() && this.verificationBillId();
	}

	public getData(): IBillData {
		return {
			// bill amount
			amount: this.getBillAmount(),

			// bill type
			type: this.getBillType(),

			// bill barcode
			barcode: this.getBarcode(),

			// bill validation
			isValid: this.verificationBill(),

			// is valid bill id that should be true if bill id and true
			isValidBillId: this.verificationBillId(),

			// id valid bill payment code
			isValidBillPayment: this.verificationBillPayment(),

			// find billId and billPayment by barcode
			findByBarcode: this.findByBarcode(),
		};
	}
}

export default Bill;
