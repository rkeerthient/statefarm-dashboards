import {
  GetHeadConfig,
  GetPath,
  HeadConfig,
  Template,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
} from "@yext/pages";
import * as React from "react";
import "../index.css";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import BarChart from "../components/BarChart";
import TasksSection from "../components/DashboardComps/TasksSection";
import DonutChart from "../components/DonutChart";
import SampleChart from "../components/SampleChart";
import DBBanner from "../components/DashboardComps/dbBanner";
import PageLayout from "../components/page-layout";
import { Image } from "@yext/sites-components";
import { Main } from "../layout/main";
import Suggestions from "../components/DashboardComps/Suggestions";
import ReviewsBarChart from "../components/DashboardComps/ReviewsBarChart";
import StarRating from "../components/StarRating";
import { LexicalRichText } from "@yext/pages-components";
import AddressSection from "../components/AddressSection";

export const config: TemplateConfig = {
  stream: {
    $id: "my-stream-prof-dashboard",
    fields: [
      "slug",
      "id",
      "name",
      "uid",
      "meta",
      "c_preferredName",
      "c_jobTitle",
      "c_fullBiography",
      "c_languagesSpoken",
      "photoGallery",
      "emails",
      "hours",
      "mainPhone",
      "address.line1",
      "address.line2",
      "address.line3",
      "address.postalCode",
      "headshot",
      "address.region",
      "address.sublocality",
      "addressHidden",
      "address.city",
      "address.countryCode",
      "address.extraDescription",
      "c_educationDetails.degree",
      "c_educationDetails.school",
      "c_hobbiesAndInterests",
      "c_photoGallery.alternateText",
      "c_photoGallery.height",
      "c_photoGallery.url",
      "c_photoGallery.width",
      "c_taskGroups",
      "c_officeHours",
      "c_teamMembers.name",
      "c_teamMembers.c_jobTitle",
      "c_teamMembers.slug",
      "c_teamMembers.headshot",
      "c_professionalsInsuranceProducts.id",
      "c_professionalsInsuranceProducts.landingPageUrl",
      "c_professionalsInsuranceProducts.bodyV2",
      "c_professionalsInsuranceProducts.c_blogShortDescription",
      "c_professionalsInsuranceProducts.name",
      "c_professionalsInsuranceProducts.c_category",
      "c_professionalsInsuranceProducts.datePosted",
      "c_professionalsInsuranceProducts.photoGallery",
      "c_color",
      "c_fonts",
      "c_heroBanner",
      "c_template",
      "geocodedCoordinate",
      "c_teamDescription",
      "c_teamName",
      "c_licensedStates",
      "c_professionalSecondaryAddress.id",
      "c_professionalSecondaryAddress.name",
      "c_professionalSecondaryAddress.primaryPhoto",
      "c_professionalSecondaryAddress.address",
      "c_insuranceProducts",
      "c_agencyName",
      "c_shortBio",
      "certifications",
    ],
    filter: {
      entityTypes: ["financialProfessional"],
    },
    localization: {
      locales: ["en"],
    },
  },
};

export const getPath: GetPath<TemplateProps> = ({ document }) => {
  return document.slug;
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  document,
}): HeadConfig => {
  return {
    title: document.name,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          name: "description",
          content: document.description,
        },
      },
    ],
  };
};
declare global {
  interface Window {
    YEXT_AUTH: { visitor: { externalId: string } };
  }
}

const analyticsData = [
  {
    SearchTerm: "State Farm insurance",
    Impressions: 56000,
    Clicks: 1500,
    CTR: 2.68,
    Position: 4.7,
  },
  {
    SearchTerm: "Devon Smith insurance",
    Impressions: 31000,
    Clicks: 1200,
    CTR: 3.87,
    Position: 6.2,
  },
  {
    SearchTerm: "Statefarm",
    Impressions: 42000,
    Clicks: 1800,
    CTR: 4.29,
    Position: 2.4,
  },
  {
    SearchTerm: "State Farm Devon",
    Impressions: 69000,
    Clicks: 2500,
    CTR: 3.62,
    Position: 8.1,
  },
  {
    SearchTerm: "Devon smith homeowners insurance",
    Impressions: 48000,
    Clicks: 900,
    CTR: 1.88,
    Position: 3.5,
  },
  {
    SearchTerm: "Insurance near me",
    Impressions: 36000,
    Clicks: 2000,
    CTR: 5.56,
    Position: 7.8,
  },
  {
    SearchTerm: "Renters insurance",
    Impressions: 55000,
    Clicks: 2800,
    CTR: 5.09,
    Position: 5.3,
  },
  {
    SearchTerm: "State farm RV insurance",
    Impressions: 4200,
    Clicks: 800,
    CTR: 19.05,
    Position: 1.9,
  },
  {
    SearchTerm: "house insurance state farm",
    Impressions: 27000,
    Clicks: 1500,
    CTR: 5.56,
    Position: 9.0,
  },
  {
    SearchTerm: "Smith agency new york",
    Impressions: 61000,
    Clicks: 1200,
    CTR: 1.97,
    Position: 4.1,
  },
];
const dummyRating = [
  {
    entityId: "fp-0385",
    responseUrl:
      "https://www.yext.com/s/4132897/reviews#p0=status&p1=1%7C3&p2=includes&p3=&yextReviewId=1376620700",
    authorName: "David Johnson",
    authorEmail: "david.johnson@example.com",
    review: "My agent stopped responding to me",
    date: "1/13/2024",
    rating: 1,
  },
  {
    entityId: "fp-0274",
    responseUrl:
      "https://www.yext.com/s/4132897/reviews#p0=status&p1=1%7C3&p2=includes&p3=&yextReviewId=1376620696",
    authorName: "James",
    authorEmail: "james@example.com",
    review:
      "Agent withheld important information about discontinuing and reinstating coverage after my vehicle was totaled back in May. The whole process felt intentionally misleading and like I was being gouged.",
    date: "1/13/2024",
    rating: 1,
  },
  {
    entityId: "fp-0274",
    responseUrl:
      "https://www.yext.com/s/4132897/reviews#p0=status&p1=1%7C3&p2=includes&p3=&yextReviewId=1376620683",
    authorName: "Rebecca P",
    authorEmail: "rebecca.p@example.com",
    review:
      "Devon gave me a great rate for both automobile and homeowners insurance. He made the process easy and quick for me. He provided excellent customer service and was very pleasant, kind and professional. I highly recommend Devon State Farm Insurance.",
    date: "1/13/2024",
    rating: 5,
  },
  {
    entityId: "fp-0424",
    responseUrl:
      "https://www.yext.com/s/4132897/reviews#p0=status&p1=1%7C3&p2=includes&p3=&yextReviewId=1376620688",
    authorName: "Rachel Thompson",
    authorEmail: "rachel.thompson@example.com",
    review:
      "I had a great experience with my State Farm agent. They were prompt in responding to my inquiries and made the insurance process smooth and easy.",
    date: "1/13/2024",
    rating: 5,
  },
  {
    entityId: "fp-0385",
    responseUrl:
      "https://www.yext.com/s/4132897/reviews#p0=status&p1=1%7C3&p2=includes&p3=&yextReviewId=1376620713",
    authorName: "Jessica Wilson",
    authorEmail: "jessica.wilson@example.com",
    review: "Wonderful experience and great rates",
    date: "1/13/2024",
    rating: 5,
  },
  {
    entityId: "fp-0274",
    responseUrl:
      "https://www.yext.com/s/4132897/reviews#p0=status&p1=1%7C3&p2=includes&p3=&yextReviewId=1376620705",
    authorName: "Samuel S",
    authorEmail: "samuel.s@example.com",
    review:
      "Great agent. My quote was very close to my actual monthly payments. I was able to get insurance set up quickly.",
    date: "1/13/2024",
    rating: 4,
  },
  {
    entityId: "fp-0168",
    responseUrl:
      "https://www.yext.com/s/4132897/reviews#p0=status&p1=1%7C3&p2=includes&p3=&yextReviewId=1376620698",
    authorName: "Liam Davis",
    authorEmail: "liam.davis@example.com",
    review:
      "I had a disappointing experience with my State Farm agent. Communication was lacking, and I felt left in the dark during the claims process. It took longer than expected to resolve my issue, and I didn't feel the level of support I was hoping for. I'm considering exploring other options for my insurance needs.",
    date: "1/13/2024",
    rating: 2,
  },
  {
    entityId: "fp-0288",
    responseUrl:
      "https://www.yext.com/s/4132897/reviews#p0=status&p1=1%7C3&p2=includes&p3=&yextReviewId=1376620707",
    authorName: "Olivia Brown",
    authorEmail: "olivia.brown@example.com",
    review:
      "Smooth renewal process every year. My State Farm agent is always available to discuss any adjustments or updates to my policy, making it hassle-free.",
    date: "1/13/2024",
    rating: 4,
  },
  {
    entityId: "fp-0288",
    responseUrl:
      "https://www.yext.com/s/4132897/reviews#p0=status&p1=1%7C3&p2=includes&p3=&yextReviewId=1376620687",
    authorName: "Matthew White",
    authorEmail: "matthew.white@example.com",
    review:
      "The insurance rates I got through State Farm were competitive, and my agent regularly reviews my policy to ensure I'm getting the best value. Appreciate the proactive approach.",
    date: "1/13/2024",
    rating: 4,
  },
  {
    entityId: "fp-0288",
    responseUrl:
      "https://www.yext.com/s/4132897/reviews#p0=status&p1=1%7C3&p2=includes&p3=&yextReviewId=1376620711",
    authorName: "Chris Anderson",
    authorEmail: "chris.anderson@example.com",
    review:
      "My premiums went up, which I am not happy about, but I like working with my agent",
    date: "1/13/2024",
    rating: 3,
  },
  {
    entityId: "fp-0424",
    responseUrl:
      "https://www.yext.com/s/4132897/reviews#p0=status&p1=1%7C3&p2=includes&p3=&yextReviewId=1376620701",
    authorName: "Jennifer Martin",
    authorEmail: "jennifer.martin@example.com",
    review:
      "I had to file a claim recently, and my State Farm agent was proactive in guiding me through the process. Quick and efficient service when I needed it the most.",
    date: "1/13/2024",
    rating: 5,
  },
  {
    entityId: "fp-0385",
    responseUrl:
      "https://www.yext.com/s/4132897/reviews#p0=status&p1=1%7C3&p2=includes&p3=&yextReviewId=1376620716",
    authorName: "William Taylor",
    authorEmail: "william.taylor@example.com",
    review:
      "The claims process with State Farm was straightforward and efficient. My agent guided me through every step and ensured a quick resolution.",
    date: "1/13/2024",
    rating: 5,
  },
  {
    entityId: "fp-0288",
    responseUrl:
      "https://www.yext.com/s/4132897/reviews#p0=status&p1=1%7C3&p2=includes&p3=&yextReviewId=1376620703",
    authorName: "Emily Johnson",
    authorEmail: "emily.johnson@example.com",
    review: "Great service!",
    date: "1/13/2024",
    rating: 5,
  },
  {
    entityId: "fp-0168",
    responseUrl:
      "https://www.yext.com/s/4132897/reviews#p0=status&p1=1%7C3&p2=includes&p3=&yextReviewId=1376620694",
    authorName: "Brandon Harris",
    authorEmail: "brandon.harris@example.com",
    review:
      "My State Farm agent provided excellent advice when I was unsure about the coverage I needed. Their expertise and guidance were invaluable in making the right decisions.",
    date: "1/13/2024",
    rating: 5,
  },
  {
    entityId: "fp-0424",
    responseUrl:
      "https://www.yext.com/s/4132897/reviews#p0=status&p1=1%7C3&p2=includes&p3=&yextReviewId=1376620715",
    authorName: "Daniel Miller",
    authorEmail: "daniel.miller@example.com",
    review:
      "I appreciate the personalized approach of my State Farm agent. They took the time to understand my needs and provided tailored insurance solutions.",
    date: "1/13/2024",
    rating: 5,
  },
  {
    entityId: "fp-0274",
    responseUrl:
      "https://www.yext.com/s/4132897/reviews#p0=status&p1=1%7C3&p2=includes&p3=&yextReviewId=1376620692",
    authorName: "John M",
    authorEmail: "john.m@example.com",
    review:
      "I have been working with this agency for years now and the customer service has been at the best that someone can find. I have also suggested a few of my best friends and they are now clients of this office!",
    date: "1/13/2024",
    rating: 5,
  },
  {
    entityId: "fp-0168",
    responseUrl:
      "https://www.yext.com/s/4132897/reviews#p0=status&p1=1%7C3&p2=includes&p3=&yextReviewId=1376620689",
    authorName: "Ella Martin",
    authorEmail: "ella.martin@example.com",
    review:
      "I had an emergency claim, and my State Farm agent was a lifesaver. They expedited the process, and I felt supported throughout. Grateful for their responsiveness.",
    date: "1/13/2024",
    rating: 5,
  },
  {
    entityId: "fp-0274",
    responseUrl:
      "https://www.yext.com/s/4132897/reviews#p0=status&p1=1%7C3&p2=includes&p3=&yextReviewId=1376620690",
    authorName: "Paula Donnel",
    authorEmail: "paula.donnel@example.com",
    review:
      "I have worked with Devon Smith and his staff for several years now. They are consistently quick to respond to my questions and very friendly. They have made insurance easy to understand a stress-free process.",
    date: "1/13/2024",
    rating: 4,
  },
  {
    entityId: "fp-0385",
    responseUrl:
      "https://www.yext.com/s/4132897/reviews#p0=status&p1=1%7C3&p2=includes&p3=&yextReviewId=1376620679",
    authorName: "Sophia Carter",
    authorEmail: "sophia.carter@example.com",
    review:
      "I've been with State Farm for several years, and my agent consistently delivers top-notch service. I feel confident knowing I have a reliable insurance partner.",
    date: "1/13/2024",
    rating: 5,
  },
  {
    entityId: "fp-0168",
    responseUrl:
      "https://www.yext.com/s/4132897/reviews#p0=status&p1=1%7C3&p2=includes&p3=&yextReviewId=1376620712",
    authorName: "Daniel Thompson",
    authorEmail: "daniel.thompson@example.com",
    review:
      "Kudos to my State Farm agent for being proactive about keeping me informed on potential discounts. It's refreshing to have an agent looking out for my wallet!",
    date: "1/13/2024",
    rating: 5,
  },
  {
    entityId: "fp-0424",
    responseUrl:
      "https://www.yext.com/s/4132897/reviews#p0=status&p1=1%7C3&p2=includes&p3=&yextReviewId=1376620697",
    authorName: "Emma Harris",
    authorEmail: "emma.harris@example.com",
    review:
      "Exceptional customer service! My State Farm agent goes above and beyond to address any concerns or changes to my policy promptly.",
    date: "1/13/2024",
    rating: 5,
  },
  {
    entityId: "fp-0168",
    responseUrl:
      "https://www.yext.com/s/4132897/reviews#p0=status&p1=1%7C3&p2=includes&p3=&yextReviewId=1376620708",
    authorName: "Ava White",
    authorEmail: "ava.white@example.com",
    review:
      "I recently moved, and my State Farm agent made the transition of updating my policy and address seamless. Great attention to detail and customer care.",
    date: "1/13/2024",
    rating: 4,
  },
  {
    entityId: "fp-0424",
    responseUrl:
      "https://www.yext.com/s/4132897/reviews#p0=status&p1=1%7C3&p2=includes&p3=&yextReviewId=1376620710",
    authorName: "Michael Davis",
    authorEmail: "michael.davis@example.com",
    review:
      "The insurance agent at State Farm was very patient and took the time to explain the details of my policy. I felt confident in my coverage choices.",
    date: "1/13/2024",
    rating: 5,
  },
  {
    entityId: "fp-0274",
    responseUrl:
      "https://www.yext.com/s/4132897/reviews#p0=status&p1=1%7C3&p2=includes&p3=&yextReviewId=1376620548",
    authorName: "Art Conway",
    authorEmail: "art.conway@example.com",
    review:
      "I have dealt with Devon Smith for insurance for quite a few years. He has taken care of my insurance needs promptly and accurately. When I have questions, he delivers answers quickly.",
    date: "1/13/2024",
    rating: 5,
  },
];
const tabs = [
  "About me",
  "My Team",
  "My Offices",
  "Analytics",
  "Suggestions",
  "Reviews Summary",
  "Learning & Support",
];
const Dashboards: Template<TemplateRenderProps> = ({ document }) => {
  const [currentTab, setCurrentTab] = useState<string>(tabs[0]);
  const [reviewData, setReviewData] = useState(dummyRating);
  const [reviewType, setReviewType] = useState<string>("ALL_REVIEWS");
  const [styleSheetRef, setStyleSheetRef] = useState<string>("");
  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

  useEffect(() => {
    const element = window.parent.document
      .querySelector(`head>link`)
      ?.getAttribute("href");
    element && setStyleSheetRef(element);
  }, []);

  useEffect(() => {
    reviewType !== "ALL_REVIEWS"
      ? setReviewData(dummyRating.filter((item) => item.entityId === `fp-0274`))
      : setReviewData(dummyRating);
  }, [reviewType]);

  const [selectedOption, setSelectedOption] = useState("");
  const handleDropdownChange = (event: any) => {
    setSelectedOption(event.target.value);

    switch (event.target.value) {
      case "rating_h_l":
        setReviewData(reviewData.sort((a, b) => b.rating - a.rating));
        break;
      case "rating_l_h":
        setReviewData(reviewData.sort((a, b) => a.rating - b.rating));
        break;
      // case "date_h_l":
      //   setReviewData(
      //     reviewData.sort((a, b) => new Date(a.date) - new Date(b.date))
      //   );
      //   break;
      // case "date_l_h":
      //   setReviewData(
      //     reviewData.sort((a, b) => new Date(b.date) - new Date(a.date))
      //   );
      //   break;
      default:
        // Handle default case if needed
        break;
    }
  };

  return (
    <Main>
      <PageLayout _site={document._site} document={document}>
        <div className="space-y-4 bg-slate-200 ">
          <DBBanner
            name={document.name}
            _site={document._site}
            headshot={document.headshot}
            color={document.c_color}
            styleSheetRef={styleSheetRef}
          ></DBBanner>
          <div className="px-6">
            <div className="sm:hidden">
              <label htmlFor="tabs" className="sr-only">
                Select a tab
              </label>
              <select
                id="tabs"
                value={currentTab}
                onChange={(e) => setCurrentTab(e.target.value)}
                className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10  focus:border-black focus:outline-none focus:ring-[#4492d3]  "
              >
                {tabs.map((tab) => (
                  <option key={tab} value={tab}>
                    {tab}
                  </option>
                ))}
              </select>
            </div>
            <div className="hidden sm:block">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                  {tabs.map((tab) => (
                    <a
                      key={tab}
                      className={classNames(
                        tab === currentTab
                          ? "border-[#4492d3] border-b-4 text-black font-bold"
                          : "border-transparent border-b-4 text-[#4492d3] hover:border-gray-300 hover:text-gray-700 font-medium",
                        "  border-b-2 py-4 px-1 hover:cursor-pointer"
                      )}
                      onClick={() => setCurrentTab(tab)}
                    >
                      {tab}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </div>
          {currentTab === "About me" ? (
            <div className="px-4 flex flex-row w-full gap-2">
              <div className="w-3/5">
                <TasksSection
                  tasks={document._site.c_taskGroups}
                  document={document}
                ></TasksSection>
              </div>
              <div className="w-2/5 flex flex-col gap-4">
                <div className="flex flex-col gap-4 p-5  bg-white">
                  <div className="font-bold text-gray-900">
                    {document._site.c_dashboardCompletionLabel}
                  </div>
                  <div className="text-gray-900">
                    {document._site.c_dashboardCompletionDescription}
                  </div>
                  <SampleChart></SampleChart>
                </div>
                <div className="flex flex-col gap-4 border p-5  bg-white">
                  <div className="font-bold text-gray-900">
                    Remaining Incomplete Fields
                  </div>
                  <div className="text-gray-900">
                    Fill out the required fields listed below to complete your
                    profile
                  </div>
                </div>
              </div>
            </div>
          ) : currentTab === "Analytics" ? (
            <div>
              <div className="flex flex-row gap-4">
                <div className="p-4 bg-4 w-1/2 bg-white flex flex-col gap-4">
                  <div className="text-3xl">Agent site impressions</div>
                  <BarChart />
                </div>
                <div className="p-4 bg-4 w-1/2 bg-white flex flex-col gap-4">
                  <div className="text-3xl capitalize">
                    Agent listings search terms/click insights
                  </div>

                  <div className="flex flex-col gap-2">
                    <DonutChart />
                    <div className="flex justify-center items-center text-xs">
                      <table className="w-4/5 border-collapse">
                        <thead>
                          <tr className="bg-gray-200">
                            <th className="border p-2">Search Term</th>
                            <th className="border p-2">Impressions</th>
                            <th className="border p-2">Clicks</th>
                            <th className="border p-2">CTR</th>
                            <th className="border p-2">Position</th>
                          </tr>
                        </thead>
                        <tbody>
                          {analyticsData.map((row, index) => (
                            <tr key={index} className="border">
                              <td className="border p-2">{row.SearchTerm}</td>
                              <td className="border p-2">{row.Impressions}</td>
                              <td className="border p-2">{row.Clicks}</td>
                              <td className="border p-2">{row.CTR}</td>
                              <td className="border p-2">{row.Position}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="bg-white text-center border-t text-gray-800 m-auto flex justify-center items-center w-full py-8 mx-auto">
                    <div className="flex flex-col gap-4 w-full px-4">
                      <div className="text-xl font-semibold">
                        Email, Contact Me, and Phone Call Clicks
                      </div>
                      <div>Last 60 Days</div>
                      <div className="w-full grid grid-cols-3 justify-between">
                        <div className="flex flex-col gap-2 items-center justify-center">
                          <div className="text-xl">18</div>
                          <div className="text-sm">Total Email Clicks</div>
                        </div>
                        <div className="flex flex-col gap-2 items-center justify-center">
                          <div className="text-xl">4</div>
                          <div className="text-sm">Form Fills</div>
                        </div>
                        <div className="flex flex-col gap-2 items-center justify-center">
                          <div className="text-xl">4</div>
                          <div className="text-sm">Total Phone Call Clicks</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col p-8 bg-white">
                <div className="text-3xl capitalize">Verifier Title</div>
                <div>
                  The Verifier automatically scans the web to determine the
                  accuracy of your listings. This system will continuously sweep
                  your listings over time and flag any discrepancies between the
                  listings publishers are displaying to your customers, and your
                  data
                </div>
                <img
                  src="https://i.imgur.com/isf3t9n.png"
                  alt=""
                  className="mt-4"
                />
              </div>
            </div>
          ) : currentTab === "Suggestions" ? (
            <Suggestions />
          ) : currentTab === "Reviews Summary" ? (
            <div className="border min-h-[800px] h-[90vh] overflow-scroll m-4 p-4 bg-white space-y-4">
              <div className="text-2xl font-bold">Reviews Summary</div>
              <hr className="py-2" />
              <div className="text-sm">
                Reviews are an important part of your digital presence and
                online reputation. Through Yext you can manage both first party
                and third party reviews. First party reviews display directly on
                your agency website.
              </div>
              <div className="flex justify-between p-4 my-4 border-y items-center px-32">
                <div className="flex flex-col gap-2  text-center">
                  <div className="text-xl">96</div>
                  <div>Total Reviews</div>
                </div>
                <div className="flex flex-col gap-2 text-center">
                  <div className="text-xl">4.9</div>
                  <div>Average Rating</div>
                </div>
                <div>
                  <ReviewsBarChart />
                </div>
              </div>
              <div className="my-4 py-4 border-b">
                <div className="my-4 flex justify-between px-4">
                  <div className="font-bold text-lg ">
                    Reviews Awaiting Response(62)
                  </div>
                  <div className="flex gap-4">
                    <div>
                      <input
                        className="mr-2"
                        type="radio"
                        value="ALL_REVIEWS"
                        name="gender"
                        onChange={(e) => setReviewType(e.target.value)}
                        defaultChecked={reviewType === "ALL_REVIEWS"}
                      />
                      All Reviews
                    </div>
                    <div>
                      <input
                        className="mr-2"
                        type="radio"
                        value="MY_REVIEWS"
                        name="gender"
                        onChange={(e) => setReviewType(e.target.value)}
                        defaultChecked={reviewType === "MY_REVIEWS"}
                      />
                      My Reviews
                    </div>
                  </div>
                  <div className="border p-2">
                    <select
                      id="dropdown"
                      value={selectedOption}
                      onChange={handleDropdownChange}
                    >
                      <option value="">Sort Reviews</option>
                      <option value="rating_h_l">Rating (High - Low)</option>
                      <option value="rating_l_h">Rating (Low - High)</option>
                      {/* <option value="date_h_l">Date (High - Low)</option>
                      <option value="date_l_h">Date (Low - High)</option> */}
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-2 text-sm">
                  {reviewData.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col gap-1 border-t py-4"
                    >
                      <div className="flex justify-between gap-2">
                        <div className="flex flex-start gap-2 items-center">
                          <div>
                            <StarRating selectedStars={item.rating} />
                          </div>
                          <div className="flex flex-col">
                            <div>{item.authorName}</div>
                            <div>{item.date}</div>
                          </div>
                        </div>
                        <div className="font-bold">Third party</div>
                      </div>
                      <div>{item.review}</div>
                      <a
                        href={item.responseUrl}
                        target="_blank"
                        className="  text-blue-700 hover:cursor-pointer"
                      >
                        Respond
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : currentTab === "Learning & Support" ? (
            <div className="flex flex-col p-4 pb-12  m-4 gap-16  bg-white w-2/3">
              <div className="text-2xl font-bold text-[#003168]">
                Learning Center
              </div>
              <div className="flex justify-center gap-8  ">
                <div className="flex flex-col gap-2 text-center">
                  <img
                    className="w-60 mx-auto"
                    src="https://www.pngplay.com/wp-content/uploads/5/Live-Webinar-Gray-Logo-PNG.png"
                    alt=""
                  />
                  <div className="font-bold text-sm">Webinars</div>
                  <div className="text-sm hover:cursor-pointer text-blue-700">
                    Register for Yext 101: New Agent Website Set-Up
                  </div>
                  <div className="text-sm hover:cursor-pointer text-blue-700">
                    Register for Yext 201: SEO & Reviews
                  </div>
                  <div className="text-sm hover:cursor-pointer text-blue-700">
                    Register for Yext 201: Google Business Profile & Community
                    Engagement
                  </div>
                  <div className="text-sm hover:cursor-pointer text-blue-700">
                    Register for Yext 301: Analytics & Website Performance
                  </div>
                  <div className="text-sm hover:cursor-pointer text-blue-700">
                    Register for Yext Monthly Special Feature Webinar
                  </div>
                  <div className="text-sm hover:cursor-pointer text-blue-700">
                    Sign Up for White Glove Office Hours
                  </div>
                </div>
                <div className="flex flex-col gap-2  text-center">
                  <img
                    className="w-32 mx-auto"
                    src="https://www.seekpng.com/png/full/242-2425880_one-click-support-customer-service-icon-png.png"
                    alt=""
                  />
                  <div className="font-bold text-sm mt-12 ">
                    One-on-one Call with an Advisor
                  </div>
                  <div className="text-left">
                    As part of the Agency Program, you receive assistance with
                    optimizing your website from a Yext advisor.
                  </div>
                  <div></div>
                  <div className="text-sm hover:cursor-pointer text-blue-700">
                    Schedule a call
                  </div>
                </div>
              </div>
            </div>
          ) : currentTab === "My Offices" ? (
            <div className="border m-4 p-4 bg-white space-y-4">
              <AddressSection></AddressSection>
            </div>
          ) : (
            <div className="border m-4 p-4 bg-white space-y-4">
              <div className="text-2xl font-bold text-[#003168]">
                {document.c_teamName ? document.c_teamName : `Team name`}
              </div>
              <div className=" font-medium text-[#003168]">
                <LexicalRichText
                  serializedAST={JSON.stringify(
                    document.c_teamDescription.json
                  )}
                ></LexicalRichText>
              </div>
              {document.c_teamMembers && (
                <div className="grid grid-cols-4 gap-4 border  p-8">
                  {document.c_teamMembers.map((item: any, index: any) => (
                    <div className=" border  !w-[250px] flex flex-col gap-2">
                      <div className="max-h-[280px] h-full flex">
                        {item.headshot ? (
                          <Image
                            image={item.headshot}
                            className="m-auto"
                          ></Image>
                        ) : (
                          <img
                            src="https://www.shutterstock.com/image-vector/vector-design-avatar-dummy-sign-600nw-1290556063.jpg"
                            alt=""
                            className="h-[250px] w-[250px]"
                          />
                        )}
                      </div>
                      <div className="text-[#003168] font-bold text-lg px-2">
                        {item.name.split(" - ")[0]}
                      </div>
                      <a
                        href={`/{item.slug}`}
                        className="w-auto flex justify-between items-center text-center border bg-[#e2e8f0] text-black px-8 py-1 rounded-md mx-auto"
                      >
                        View Profile
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </PageLayout>
    </Main>
  );
};

export default Dashboards;
export const identifyDataType = (data: any) => {
  try {
    JSON.parse(data);
    return "object";
  } catch (error) {
    return "string";
  }
};
