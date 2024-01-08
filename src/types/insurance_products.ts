export enum C_category {
	AUTO = "Auto",
	HOME = "Home",
	BOAT = "Boat",
	RV = "RV",
	RENTERS = "Renters",
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

export interface EntityReference {
	entityId: string,
	name: string,
}

export default interface Ce_insuranceProducts {
	landingPageUrl?: string,
	name: string,
	c_blogShortDescription?: string,
	c_body?: any,
	c_category?: C_category,
	c_datePublished?: string,
	c_photoGallery?: Image[],
	c_professionalsInsuranceProducts?: EntityReference[],
	id: string,
}
