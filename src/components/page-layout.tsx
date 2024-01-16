import * as React from "react";
import Header from "./header";
import Footer from "./footer";
import { isLocal } from "../utils/isLocal";
import { getRuntime } from "@yext/pages/util";
import { useEffect, useState } from "react";
import { useMyContext } from "./Context/MyContext";
import { UserProfile } from "../types/user_profile";

type Props = {
  _site?: any;
  children?: React.ReactNode;
  document?: any;
};

const PageLayout = ({ _site, children, document }: Props) => {
  const runtime = getRuntime();
  const { setUserRole, setData, userRole } = useMyContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  //2676513
  const userId = isLocal()
    ? "4776022055146608821"
    : runtime.name === "browser" && window?.YEXT_AUTH?.visitor?.externalId
    ? window.YEXT_AUTH.visitor.externalId
    : "";

  useEffect(() => {
    setIsLoading(true);
    if (document) {
      const {
        name,
        mainPhone,
        emails,
        c_template,
        c_color,
        c_fonts,
        c_preferredFirstName,
        c_jobTitle,
        c_shortBio,
        c_hobbiesAndInterests,
        c_teamDescription,
        c_languagesSpoken,
        c_educationDetails,
        c_heroBanner,
        photoGallery,
        hours,
        address,
        headshot,
        c_insuranceProducts,
        geocodedCoordinate,
        c_designations,
        _site,
        c_organizationsDisplay,
        c_awardsDashboard,
        c_teamName,
        c_teamMembers,
        c_licensedStates,
        c_professionalSecondaryAddress,
        c_professionalsInsuranceProducts,
        c_fullBiography,
        c_officeHours,
        certifications,
      } = document;

      setData((prevData) => ({
        ...prevData,
        ...(name && { name }),
        ...(mainPhone && { mainPhone }),
        ...(emails && { emails }),
        ...(c_template && { c_template }),
        ...(c_color && { c_color }),
        ...(c_fonts && { c_fonts }),
        ...(c_preferredFirstName && { c_preferredFirstName }),
        ...(c_jobTitle && { c_jobTitle }),
        ...(c_officeHours && { c_officeHours }),
        ...(c_shortBio && {
          c_shortBio,
        }),
        ...(photoGallery && { photoGallery }),
        ...(c_hobbiesAndInterests && { c_hobbiesAndInterests }),
        ...(c_teamDescription && { c_teamDescription }),
        ...(c_teamName && { c_teamName }),
        ...(c_languagesSpoken && { c_languagesSpoken }),
        ...(c_educationDetails && { c_educationDetails }),
        ...(certifications && { certifications }),
        ...(c_heroBanner && { c_heroBanner }),
        ...(hours && { hours }),
        ...(address && { address }),
        ...(geocodedCoordinate && { geocodedCoordinate }),
        ...(c_designations && { c_designations }),
        ...(c_organizationsDisplay && { c_organizationsDisplay }),
        ...(_site && { _site }),
        ...(c_insuranceProducts && { c_insuranceProducts }),
        ...(c_awardsDashboard && { c_awardsDashboard }),
        ...(c_teamMembers && { c_teamMembers }),
        ...(c_licensedStates && { c_licensedStates }),
        ...(headshot && { headshot }),
        ...(c_fullBiography && { c_fullBiography }),
        ...(c_professionalSecondaryAddress && {
          c_professionalSecondaryAddress,
        }),
        ...(c_professionalsInsuranceProducts && {
          c_professionalsInsuranceProducts,
        }),
      }));
    }
    setIsLoading(false);
  }, [document]);

  useEffect(() => {
    setIsLoading(true);
    const getUserRole = async () => {
      try {
        if (userId) {
          const response = await fetch(`/api/users/${userId}`);
          const userResp = await response.json();
          const userString: UserProfile = await userResp.response;

          setUserRole(userString);
        }
      } catch (error: any) {
        console.error(`Error fetching user data: ${JSON.stringify(error)}`);
      } finally {
        setIsLoading(false);
      }
    };

    getUserRole();
  }, [userId]);

  return (
    <div className="min-h-screen">
      <Header _site={_site} />

      {isLoading ? (
        <div
          className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        ></div>
      ) : (
        children
      )}
      <Footer _site={_site}></Footer>
    </div>
  );
};

export default PageLayout;
