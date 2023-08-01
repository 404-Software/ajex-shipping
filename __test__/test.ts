import ajex from '../src/index'
// ENVIRONMENT VARIABLES ARE SET FOR THE TESTS
require('dotenv').config()

describe('createSession', () => {
	it('should create a fake test', async () => {
		const shipment = await ajex.createOrder({
			customerAccount: process.env.AJEX_CUSTOMER_ACCOUNT!,
			declaredCurrency: 'BHD',
			expressType: 'DOMESTIC E-COMMERCE EXPRESS',
			productCode: 'SE0123',
			orderId: Math.random().toString(),
			orderTime: new Date().toISOString(),
			parcels: [
				{
					quantity: 1,
					weight: 1,
					cargoInfo: [
						{
							count: 1,
							name: 'test',
						},
					],
				},
			],
			parcelTotalWeight: 1,
			paymentMethod: 'SENDER_INSTALLMENT',
			pickupMethod: 'PICKUP',
			receiverInfo: {
        name: 'John Doe',
				phone: '12345678',
				contactType: 'INDIVIDUAL',
				addressType: 'FREE_TEXT',
				country: 'Bahrain',
        countryCode: 'BH',
				city: 'Manama',
				detailedAddress: 'Manama',
			},
			senderInfo: {
				name: 'John Doe',
				phone: '12345678',
				contactType: 'INDIVIDUAL',
				addressType: 'FREE_TEXT',
				country: 'Bahrain',
        countryCode: 'BH',
				city: 'Manama',
				detailedAddress: 'Manama',
			},
			totalDeclaredValue: 100,
		})

		console.log(shipment)

		expect(typeof shipment).toBe('string')
	})
})


// AJS000000011853
