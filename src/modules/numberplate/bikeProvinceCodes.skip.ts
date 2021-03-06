import { createProvinceHashTable } from "./helpers";
import { ProvinceDataset } from "./types.skip";

export const bikeProvinceDataset: ProvinceDataset = [
	{
		province: "آذربایجان شرقی",
		codes: [397, 396, 395, 394, 393, 392, 391],
	},
	{
		province: "آذربایجان غربی",
		codes: [377, 376, 375, 374, 373, 372, 371],
	},
	{
		province: "اردبیل",
		codes: [443, 442],
	},
	{
		province: "البرز و شهرستان های تهران",
		codes: [324, 323, 322, 321, 319],
	},
	{
		province: "ایلام",
		codes: [547],
	},
	{
		province: "بوشهر",
		codes: [831, 829, 828, 827],
	},
	{
		province: "مرکز تهران",
		codes: [
			111,
			112,
			113,
			114,
			115,
			116,
			117,
			118,
			119,
			120,
			121,
			122,
			123,
			124,
			125,
			126,
			127,
			128,
			129,
			130,
			131,
			132,
			133,
			134,
			135,
			136,
			137,
			138,
		],
	},
	{
		province: "چهارمحال و بختیاری",
		codes: [555],
	},
	{
		province: "خراسان جنوبی",
		codes: [792, 791],
	},
	{
		province: "خراسان رضوی",
		codes: [761, 762, 763, 764, 765, 766, 767, 768, 769, 771, 772, 773, 774, 775, 776, 777],
	},
	{
		province: "خراسان شمالی",
		codes: [781, 779],
	},
	{
		province: "خوزستان",
		codes: [561, 562, 563, 564, 565, 566, 567, 568, 569],
	},
	{
		province: "زنجان",
		codes: [482, 481, 479],
	},
	{
		province: "سمنان",
		codes: [753, 752, 751],
	},
	{
		province: "سیستان و بلوچستان",
		codes: [823, 822, 821, 819],
	},
	{
		province: "فارس",
		codes: [687, 688, 689, 691, 692, 693, 694, 695, 696, 697],
	},
	{
		province: "قزوین",
		codes: [525, 524, 523],
	},
	{
		province: "قم",
		codes: [611, 612, 613, 614],
	},
	{
		province: "کردستان",
		codes: [461, 462],
	},
	{
		province: "کرمان",
		codes: [812, 813, 814, 815, 816, 817],
	},
	{
		province: "کرمانشاه",
		codes: [514, 515, 516, 517],
	},
	{
		province: "کهگیلویه و بویراحمد",
		codes: [571],
	},
	{
		province: "گلستان",
		codes: [597, 596],
	},
	{
		province: "گیلان",
		codes: [582, 581, 579, 578],
	},
	{
		province: "لرستان",
		codes: [543, 542, 541, 540, 539, 538],
	},
	{
		province: "مازندران",
		codes: [586, 587, 588, 589],
	},
	{
		province: "مرکزی",
		codes: [531, 532, 533, 534, 535],
	},
	{
		province: "هرمزگان",
		codes: [839, 838, 837, 836, 835],
	},
	{
		province: "همدان",
		codes: [511, 499, 498],
	},
	{
		province: "یزد",
		codes: [637, 638, 639, 641, 642, 643],
	},
];

const bikeHashTable = createProvinceHashTable(bikeProvinceDataset);

export { bikeHashTable };