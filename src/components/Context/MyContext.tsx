import {
  createContext,
  useContext,
  useState,
  Dispatch,
  ReactNode,
  SetStateAction,
} from "react";
import * as React from "react";
import {
  Address,
  C_designations,
  C_educationDetails,
  ComplexImage,
  Coordinate,
  Hours,
} from "../../types/financial_professionals";
import { UserProfile } from "../../types/user_profile";

interface MyContextData {
  name: string;
  mainPhone: string;
  emails: string;
  c_template: string;
  c_color: string;
  c_fonts: string;
  photoGallery: ComplexImage[];
  c_preferredFirstName: string;
  c_jobTitle: string;
  c_clientFocuses: string[];
  c_aboutAdvisorShortDescription: string;
  c_expertiseCommentsRTv2: string;
  c_hobbiesAndInterests: string[];
  c_teamDescription: any;
  c_languagesV2: string[];
  C_educationDetails: C_educationDetails[];
  c_heroBanner: string;
  c_associatedBlogs: any[];
  hours: Hours;
  address: Address;
  geocodedCoordinate: Coordinate;
  _site: any;
  c_designations: C_designations[];
  c_organizationsDisplay: string[];
  c_teamName: string;
  c_teamMembers: any[];
  c_licensedStates: any[];
}

interface MyContext {
  userRole: UserProfile;
  setUserRole: Dispatch<SetStateAction<UserProfile>>;
  data: MyContextData;
  setData: Dispatch<SetStateAction<MyContextData>>;
}

const MyContext = createContext<MyContext | undefined>(undefined);

export const useMyContext = (): MyContext => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("useMyContext must be used within a MyContextProvider");
  }
  return context;
};

interface MyContextProviderProps {
  children: ReactNode;
}

export const MyContextProvider = ({ children }: MyContextProviderProps) => {
  const [userRole, setUserRole] = useState<UserProfile>();
  const [data, setData] = useState<MyContextData>({
    name: "",
    mainPhone: "",
    emails: "",
    c_template: "",
    c_color: "",
    c_fonts: "",
    c_preferredFirstName: "",
    c_jobTitle: "",
    c_clientFocuses: [],
    c_aboutAdvisorShortDescription: "",
    c_expertiseCommentsRTv2: "",
    c_hobbiesAndInterests: [],
    c_teamDescription: undefined,
    c_languagesV2: [],
    C_educationDetails: [],
    c_heroBanner: "",
    c_associatedBlogs: [],
    photoGallery: [],
    hours: {},
    address: {},
    geocodedCoordinate: {},
    _site: {},
    c_organizationsDisplay: [],
    c_designations: [],
    c_teamName: "",
    c_teamMembers: [],
    c_licensedStates: [],
  });

  return (
    <MyContext.Provider
      value={{
        userRole,
        setUserRole,
        data,
        setData,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
