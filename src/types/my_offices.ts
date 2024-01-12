export interface ImageThumbnail {
	url: string,
	width: number,
	height: number,
}

export interface Image {
	url: string,
	width: number,
	height: number,
	thumbnails?: ImageThumbnail[],
	alternateText?: string,
}

export interface ComplexImage {
	image: Image,
	details?: string,
	description?: string,
	clickthroughUrl?: string,
}

export interface Address {
	line1?: string,
	line2?: string,
	line3?: string,
	sublocality?: string,
	city?: string,
	region?: string,
	postalCode?: string,
	extraDescription?: string,
	countryCode?: string,
}

export interface Coordinate {
	latitude?: number,
	longitude?: number,
}

export interface EntityReference {
	entityId: string,
	name: string,
}

export default interface Ce_myOffices {
	primaryPhoto?: ComplexImage,
	address?: Address,
	name: string,
	cityCoordinate?: Coordinate,
	c_professionalSecondaryAddress?: EntityReference[],
	displayCoordinate?: Coordinate,
	dropoffCoordinate?: Coordinate,
	geocodedCoordinate?: Coordinate,
	pickupCoordinate?: Coordinate,
	routableCoordinate?: Coordinate,
	id: string,
	walkableCoordinate?: Coordinate,
	yextDisplayCoordinate?: Coordinate,
	yextDropoffCoordinate?: Coordinate,
	yextPickupCoordinate?: Coordinate,
	yextRoutableCoordinate?: Coordinate,
	yextWalkableCoordinate?: Coordinate,
}
