export interface WeightObject {
	birth_date: string // 生年月日
	height: string // 身長
	sex: string // 性別
	data: {
		date: string
		keydata: string // 体重データ(70.00 -> 70.00kg)
		model: string // 測定機器名
		tag: string // 体重 タグ(6021)
	}[]
}
