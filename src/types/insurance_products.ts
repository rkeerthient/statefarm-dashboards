export enum C_category {
	AUTO = "Auto",
	HOME = "Home",
	BOAT = "Boat",
	RV = "RV",
	RENTERS = "Renters",
}

export interface EntityReference {
	entityId: string,
	name: string,
}

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

export default interface Ce_insuranceProducts {
	bodyV2?: any,
	datePosted?: string,
	landingPageUrl?: string,
	name: string,
	c_blogShortDescription?: string,
	c_category?: C_category,
	c_professionalsInsuranceProducts?: EntityReference[],
	photoGallery?: ComplexImage[],
	id: string,
}
