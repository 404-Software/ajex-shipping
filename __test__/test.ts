import ajex from '../src/index'
// ENVIRONMENT VARIABLES ARE SET FOR THE TESTS
require('dotenv').config()

describe('createSession', () => {
	it('should create a fake test', async () => {
		const shipment = await ajex.createOrder({
			customerAccount: process.env.AJEX_CUSTOMER_ACCOUNT!,
			declaredCurrency: 'BHD',
			expressType: 'AJEX IRX for BUH -> KSA',
			productCode: 'AJEX IRX for BUH -> KSA',
			orderId: '82',
			orderTime: new Date().toISOString(),
			parcels: [
				{
					quantity: 1,
					weight: 1,
					cargoInfo: [
						{
              hsCode: 'M-03',
              countryOfOrigin: 'Bahrain',
							count: 1,
							name: 'M-03',
							totalValue: 75,
						},
					],
				},
			],
			parcelTotalWeight: 1,
			paymentMethod: 'SENDER_INSTALLMENT',
			pickupMethod: 'PICKUP',
			senderInfo: {
				name: 'Mavi',
				phone: '97332226101',
				contactType: 'INDIVIDUAL',
				addressType: 'FREE_TEXT',
				country: 'Bahrain',
				countryCode: 'BH',
				province: 'Capital',
				city: 'Abu Asheera',
				cityCode: 'BH',
				detailedAddress: 'Building 923 Road 3219 Block 332 Floor 2 Apartment 22',
			},
			receiverInfo: {
				name: 'غاده علي',
				phone: '966542846138',
				email: 'placehoder@placehoder.com',
				contactType: 'INDIVIDUAL',
				addressType: 'FREE_TEXT',
				country: 'SAUDI ARABIA',
				countryCode: 'SA',
				detailedAddress: 'Riyadh ظهرة لبن فله 3852 الدور الارضي',
			},
			totalDeclaredValue: 75,
		}).then((res) => console.log(res)).catch((err) => console.log(err))

		console.log(shipment)


		expect(typeof shipment).toBe('string')
	})
})