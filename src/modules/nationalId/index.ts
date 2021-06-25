/**
 * Check National-id validation
 * @category National id
 * @method verifyIranianNationalId
 * @param  {String?}          nationalId [String of national id - like this: 1111111111]
 * @return {Boolean}                    [valid or no]
 */
function verifyIranianNationalId(
	nationalId?: string | number,
): boolean | null | undefined {
	if (!nationalId) return;
	else {
		let code = nationalId.toString();

		if (!code.match(/^\d{10}$/)) return false;
		code = ("0000" + code).substr(code.length + 4 - 10);

		if (parseInt(code.substr(3, 6), 10) === 0) return false;

		const lastNumber = parseInt(code.substr(9, 1), 10);
		let sum = 0;

		for (let i = 0; i < 9; i++) {
			sum += parseInt(code.substr(i, 1), 10) * (10 - i);
		}

		sum = sum % 11;

		return (
			(sum < 2 && lastNumber === sum) ||
			(sum >= 2 && lastNumber === 11 - sum)
		);
	}
}

export default verifyIranianNationalId;
