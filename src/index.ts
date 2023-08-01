import axios from 'axios'
import 'dotenv/config'

const ORDER_MANAGEMENT_BASE_URL = 'https://apps-sit.aj-ex.com/order-management/api'
const AUTH_BASE_URL = 'https://apps-sit.aj-ex.com/authentication-service/api'
const USERNAME = process.env.AJEX_USERNAME
const PASSWORD = process.env.AJEX_PASSWORD

if (!USERNAME || !PASSWORD) throw new Error('Missing environment variables: USERNAME, PASSWORD')

const client = axios.create({ baseURL: ORDER_MANAGEMENT_BASE_URL })

export interface LoginResponse {
	accessToken: string
	tokenType: 'Bearer'
}

const login = async (): Promise<LoginResponse> => {
	const { data } = await client.post(
		'/auth/login',
		{
			username: USERNAME,
			password: PASSWORD,
		},
		{
			baseURL: AUTH_BASE_URL,
		},
	)

	return data
}

export interface CreateOrderInput {
	orderId: string
	orderTime: string
	productCode: string
	expressType: string
	totalDeclaredValue: number
	declaredCurrency: string
	parcelTotalWeight: number
	parcelTotalVolume?: number
	pickupMethod: string
	paymentMethod: string
	customerAccount: string
	buyerName?: string
	incoterms?: string
	senderInfo: ContactInfo
	receiverInfo: ContactInfo
	parcels: Parcel[]
	addedServices?: AddedService[]
	additionalInfo?: AdditionalInfo
	fulfillmentInfo?: FulfillmentInfo
}

interface ContactInfo {
	name: string
	phone: string
	email?: string
	contactType: 'INDIVIDUAL' | 'ENTERPRISE'
	addressType: 'COORDINATES' | 'LOOKUP' | 'FREE_TEXT' | 'NATIONAL_ADDRESS'
	country?: string
	countryCode?: string
	province?: string
	city?: string
	cityCode?: string
	district?: string
	detailedAddress?: string
	postalCode?: string
	longitude?: number
	latitude?: number
	nationalShortAddress?: string
}

interface Parcel {
	weight: number
	volume?: number
	length?: number
	width?: number
	height?: number
	quantity: number
	cargoInfo: CargoInfo[]
}

interface CargoInfo {
	name: string
	count: number
	totalValue?: number
	countryOfOrigin?: string
	sku?: string
	cpc?: string
	originalDescription?: string
	hsCode?: string
	itemCode?: string
}

interface AddedService {
	serviceName: string
	val1?: string
	val2?: string
	val3?: string
}

interface FulfillmentInfo {
	fulfillmentTimeOption: 'SAMEDAY' | 'NEXTDAY' | 'SCHEDULED'
	fulfillmentTime?: string
}

interface CreateOrderResponse {
	responseCode: string
	responseMessage: string
	orderId: string
	waybillNumber?: string
	waybillFileKey?: string
}

interface AdditionalInfo {}

const createOrder = async (input: CreateOrderInput): Promise<CreateOrderResponse> => {
	const { accessToken } = await login()

	const { data } = await client.post('/v2/order', input, {
		headers: { authorization: `Bearer ${accessToken}` },
	})

	return data
}

interface TrackOrderResponse {
	responseCode: string
	responseMessage: string
	waybillNumber?: string
	orderDetails: OrderTrackingDetails
	orderTrackingHistory: OrderTrackingHistory[]
}

interface OrderTrackingDetails {
	finalStatusCode: number
	finalStatus: string
	productName: string
	weight: number
	actualAmount: number
	shipmentDate: string
	deliveryDate: string
	senderDetails: OrderTrackingContactInfo
	receiverDetails: OrderTrackingContactInfo
}

interface OrderTrackingContactInfo {
	postalCode: string
	city: string
	name: string
	fullAddress: string
}

interface OrderTrackingHistory {
	actionTime: string
	status: string
	statusCode: number
	note: string
	cityName?: string
}

const trackOrder = async (waybillNumber: string): Promise<TrackOrderResponse> => {
	const { accessToken } = await login()

	const { data } = await client.get(`/v1/order-tracking/${waybillNumber}`, {
		headers: { authorization: `Bearer ${accessToken}` },
	})

	return data
}

export interface CancelOrderResponse {
	responseCode: string
	responseMessage: string
}

const cancelOrder = async (waybillNumber: string): Promise<CancelOrderResponse> => {
	const { accessToken } = await login()

	const { data } = await client.post(
		`/v1/cancel-order`,
		{ waybillNumber },
		{ headers: { authorization: `Bearer ${accessToken}` } },
	)

	return data
}

const ajex = {
	login,
	createOrder,
	trackOrder,
	cancelOrder,
}

export default ajex
