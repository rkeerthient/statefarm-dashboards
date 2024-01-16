import * as React from "react";
import { Image } from "@yext/sites-components";
import Hours from "../hours";
import { useMyContext } from "../Context/MyContext";
import StaticMap from "../static-map";
import { LexicalRichText } from "@yext/pages-components";
import PhotoCarousel from "../PhotoCarousel";
import PageLayout from "../page-layout";
import ServiceAreaMap from "../ServiceAreaMap";
import Banner from "../banner";
import { C_insuranceProducts } from "../../types/financial_professionals";
import TeamCarousel from "../TeamCarousel";
import InsuranceProductsCarousel from "../InsuranceProductsCarousel";
import "./index.css";
const Preview = ({ data }: any) => {
  const { data: _data } = useMyContext();
  const {
    name,
    mainPhone,
    headshot,
    photoGallery,
    address,
    c_preferredFirstName,
    c_fullBiography,
    c_heroBanner,
    c_agencyName,
    c_shortBio,
    c_languagesSpoken,
    geocodedCoordinate,
    c_fonts,
    _site,
    c_teamName,
    c_teamDescription,
    c_educationDetails,
    c_licensedStates,
    c_professionalsInsuranceProducts,
    c_teamMembers,
    c_professionalSecondaryAddress,
    c_officeHours,
    c_template,
    c_insuranceProducts,
    c_hobbiesAndInterests,
    certifications,
  } = data;

  const getType = (item: any) => {
    return item.isClosed
      ? `Closed`
      : item.openIntervals[0].start === "00:00" &&
        item.openIntervals[0].end === "23:59"
      ? `24 Hours`
      : item.openIntervals.length >= 2
      ? `Split`
      : `Open`;
  };
  return (
    <PageLayout _site={_site}>
      <div
        className="previewPage bg-white"
        style={{
          fontFamily: c_fonts && c_fonts.toLowerCase().replaceAll(" ", ""),
        }}
      >
        <div className=" w-full mb-4">
          <div>
            <Banner
              headshot={headshot}
              img={c_heroBanner.url}
              name={name}
              mainPhone={mainPhone}
              title="STATE FARM® INSURANCE AGENT"
            ></Banner>
            {c_template !== "TEMPLATE_A" ? (
              <div className="centered-container my-4">
                <div className="flex w-full gap-8 items-center">
                  <div className="w-1/3">
                    <div className="flex flex-col gap-2 ">
                      <div className="gap-y-8">
                        <div className="text-xl font-semibold mb-4">
                          Address
                        </div>
                        <div className=" gap-y-3">
                          <div>{address.line1}</div>
                          {address.line2 && <div>{address.line2}</div>}
                          <div>
                            {address.city}, {address.region}{" "}
                            {address.postalCode}
                          </div>
                        </div>
                        <div className="w-fit mt-4 text-sm hover:border-b bg-[#d62211] text-white py-2 px-4 rounded-full font-bold border hover:cursor-pointer hover:border-[#d62211] hover:bg-white hover:text-[#d62211]">
                          Get Directions
                        </div>
                      </div>
                      <div></div>
                    </div>
                  </div>
                  <div className="w-1/3">
                    {geocodedCoordinate && (
                      <StaticMap
                        latitude={geocodedCoordinate.latitude}
                        longitude={geocodedCoordinate.longitude}
                      ></StaticMap>
                    )}
                  </div>
                  <div className="w-1/3">
                    {c_officeHours && (
                      <div className="mt-2 !text-sm">
                        {JSON.stringify(c_officeHours) !== "{}" && (
                          <Hours
                            customclass="text-sm !mb-2"
                            title={"I'm available on"}
                            hours={c_officeHours}
                          />
                        )}
                        {c_officeHours.holidayHours &&
                          c_officeHours.holidayHours.length >= 1 && (
                            <div className="mt-2 text-sm text-[#d62211]">
                              <div className=" font-semibold mb-2">
                                Upcoming Holidays
                              </div>
                              <div className="flex flex-col ">
                                {c_officeHours.holidayHours.map(
                                  (item: any, index: any) => {
                                    let type = getType(item);

                                    return (
                                      <div
                                        key={index}
                                        className="flex gap-4 pr-8"
                                      >
                                        <div className="w-1/4">
                                          {new Date(
                                            Date.parse(item.date)
                                          ).toLocaleDateString("en-US")}
                                        </div>
                                        {type === "Closed" ||
                                          (type === "24 Hours" && (
                                            <div>{type}</div>
                                          ))}

                                        {type !== "Closed" &&
                                          type !== "24 Hours" && (
                                            <div className="flex-1">
                                              {item.openIntervals[0].start} -{" "}
                                              {item.openIntervals[0].end}
                                            </div>
                                          )}
                                      </div>
                                    );
                                  }
                                )}
                              </div>
                            </div>
                          )}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-2 my-4 mb-8">
                  <div className="text-xl font-semibold ">About me</div>
                  <div>
                    {c_shortBio ? (
                      <LexicalRichText
                        serializedAST={JSON.stringify(c_shortBio.json)}
                      />
                    ) : (
                      `Enter a short bio in the entity`
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full flex flex-col md:flex-row  mt-4 centered-container">
                <div className="w-full md:w-2/3 ">
                  <div className="text-xl font-semibold ">About me</div>
                  {c_shortBio ? (
                    <LexicalRichText
                      serializedAST={JSON.stringify(c_shortBio.json)}
                    />
                  ) : (
                    `Enter a short bio in the entity`
                  )}

                  <div className="py-4 px-16 mx-auto my-auto hidden md:block">
                    {geocodedCoordinate && (
                      <StaticMap
                        latitude={geocodedCoordinate.latitude}
                        longitude={geocodedCoordinate.longitude}
                      ></StaticMap>
                    )}
                  </div>
                </div>
                <div className="w-full md:w-1/3">
                  <span className=" hidden md:block">
                    <div className="gap-y-5">
                      <div className="text-xl font-semibold mb-4">Address</div>
                      <div className="  gap-y-3">
                        <div>{address.line1}</div>
                        {address.line2 && <div>{address.line2}</div>}
                        <div>
                          {address.city}, {address.region} {address.postalCode}
                        </div>
                      </div>
                    </div>
                  </span>
                  {c_officeHours && (
                    <div className="mt-8">
                      {JSON.stringify(c_officeHours) !== "{}" && (
                        <Hours
                          title={"I'm available on"}
                          hours={c_officeHours}
                        />
                      )}
                      {c_officeHours.holidayHours &&
                        c_officeHours.holidayHours.length >= 1 && (
                          <div className="mt-4 text-sm text-[#d62211]">
                            <div className="text-xl font-semibold mb-4">
                              Upcoming Holidays
                            </div>
                            <div className="flex flex-col ">
                              {c_officeHours.holidayHours.map(
                                (item: any, index: any) => {
                                  let type = getType(item);

                                  return (
                                    <div
                                      key={index}
                                      className="flex gap-4 pr-8"
                                    >
                                      <div className="w-1/4">
                                        {new Date(
                                          Date.parse(item.date)
                                        ).toLocaleDateString("en-US")}
                                      </div>
                                      {type === "Closed" ||
                                        (type === "24 Hours" && (
                                          <div>{type}</div>
                                        ))}

                                      {type !== "Closed" &&
                                        type !== "24 Hours" && (
                                          <div className="flex-1">
                                            {item.openIntervals[0].start} -{" "}
                                            {item.openIntervals[0].end}
                                          </div>
                                        )}
                                    </div>
                                  );
                                }
                              )}
                            </div>
                          </div>
                        )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        {c_professionalSecondaryAddress && (
          <div className="flex-col flex gap-2 centered-container mb-8">
            <div className="font-medium">My Offices</div>
            <div className="grid grid-cols-4 gap-4">
              {c_professionalSecondaryAddress.map((item: any, index: any) => (
                <div
                  className="flex flex-col gap-2 shadow-md text-sm"
                  key={index}
                >
                  <Image
                    image={item.primaryPhoto}
                    className="!aspect-square"
                  ></Image>
                  <div className="mt-2 flex flex-col gap-2 p-2">
                    <div className="font-medium">{item.name}</div>
                    <div>
                      <div>{item.address.line1}</div>
                      {item.address.line2 && <div>{item.address.line2}</div>}
                      <div>
                        {item.address.city}, {item.address.region}{" "}
                        {item.address.postalCode}
                      </div>
                    </div>
                  </div>
                  <div className="border text-center flex justify-center py-2 px-4 mx-4 bg-[#d62211] text-white hover:cursor-pointer hover:bg-[#f7cbc7] rounded-full mb-4">
                    Get Directions
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="bg-[#f7f0e4] p-8 mb-4">
          <div className="grid grid-cols-3 centered-container w-2/3 !px-0">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <div className="text-xl font-medium">Experience</div>
                <div>34 Years</div>
              </div>

              {c_languagesSpoken && (
                <div className="flex flex-col">
                  <div className="text-xl font-medium">Languages</div>
                  {c_languagesSpoken.map((item: string, index: any) => (
                    <div key={index}>{item}</div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <div className="flex flex-col gap-2">
                {c_insuranceProducts && (
                  <div className="flex flex-col">
                    <div className="text-xl font-medium">
                      Insurance Products
                    </div>
                    {c_insuranceProducts.map((item: any, index: any) => (
                      <div key={index}>{C_insuranceProducts[item]}</div>
                    ))}
                  </div>
                )}
                {c_hobbiesAndInterests && (
                  <div className="flex flex-col">
                    <div className="text-xl font-medium">
                      Hobbies & Interests
                    </div>
                    {c_hobbiesAndInterests.map((item: any, index: any) => (
                      <div key={index}>{item}</div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-col gap-2">
                {certifications && (
                  <div className="flex flex-col">
                    <div className="text-xl font-medium">Certifications</div>
                    {certifications.map((item: any, index: any) => (
                      <div key={index}>{item}</div>
                    ))}
                  </div>
                )}
                {c_educationDetails && (
                  <div className="flex flex-col">
                    <div className="text-xl font-medium">Degree</div>
                    {c_educationDetails.map((item: any, index: any) => (
                      <div key={index}>
                        {item.degree} - {item.school}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {c_professionalsInsuranceProducts && (
          <InsuranceProductsCarousel
            data={c_professionalsInsuranceProducts}
          ></InsuranceProductsCarousel>
        )}
        <div className="mb-4 bg-[#f7f0e4]">
          {c_licensedStates && (
            <div className="centered-container ">
              <div className=" flex justify-between px-4   mt-8">
                <div className="w-1/2 flex justify-between items-center">
                  {name} is based out of {address.city},{address.region}, And is
                  licensed in the following states:{" "}
                  {c_licensedStates.map((item: any) => item).join(", ")}
                </div>
                <div className="w-1/2">
                  <ServiceAreaMap states={c_licensedStates} />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex p-8 flex-col gap-8 centered-container mb-4">
          {c_fullBiography && (
            <div className="flex flex-col gap-2">
              <div className="font-bold text-lg">More about me</div>
              <LexicalRichText
                serializedAST={JSON.stringify(c_fullBiography.json)}
              />
            </div>
          )}
          {photoGallery && (
            <div>
              <PhotoCarousel data={photoGallery}></PhotoCarousel>
            </div>
          )}
        </div>
        {c_teamName && c_teamMembers && (
          <div className="my-4 bg-[#f7f0e4] teamCarousel">
            <TeamCarousel
              teamName={c_teamName}
              teamMembersData={c_teamMembers}
              teamDescription={c_teamDescription}
            ></TeamCarousel>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default Preview;
