import { useState } from "react";
import * as React from "react";
import { AddressType } from "@yext/sites-components";
import { Transition, Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import PhotoField from "./PhotoField";
import Ce_myOffices from "../../../types/my_offices";
import { useMyContext } from "../../Context/MyContext";

interface OtherAddessesEntityFieldProps {
  initialValue?: any[];
  fieldId?: string;
}
const stateAbbrs = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DC",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
];
type ValueTypes = {
  address?: AddressType;
  primaryPhoto?: Image;
  name?: string;
};
type Image = {
  image: {
    url: string;
  };
};

const OtherAddessesEntityField = ({
  initialValue,
}: OtherAddessesEntityFieldProps) => {
  const { userRole, setData } = useMyContext();

  const [value, setValue] = useState<ValueTypes>();
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEditable, setIsEditable] = useState(false);
  const [myOffices, setMyOffices] = useState<Ce_myOffices[]>(
    initialValue || []
  );
  const [address, setAddress] = useState<AddressType>(
    value?.address ?? {
      line1: "",
      line2: "",
      city: "",
      region: "",
      postalCode: "",
      countryCode: "",
    }
  );
  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    addressField?: keyof AddressType
  ) => {
    if (addressField) {
      setAddress({
        ...address,
        [addressField]: e.target.value,
      });
      setValue({
        ...value,
        address: {
          ...address,
          [addressField]: e.target.value,
        },
      });
    }
  };
  const handleSave = async () => {
    setIsLoading(true);
    try {
      const requestBody = encodeURIComponent(
        JSON.stringify({
          ...value,
          c_professionalSecondaryAddress: ["fp-0274"],
        })
      );
      const response = await fetch(
        `/api/createEntity?body=${requestBody}&entityType=ce_myOffices`
      );
      const resp = await response.json();
      const buildRespJson = {
        name: await resp.response.name,
        id: await resp.response.meta.id,
      };
      const setDataValue = {
        name: await resp.response.name,
        id: await resp.response.meta.id,
        primaryPhoto: await resp.response.primaryPhoto,
        address: await resp.response.address,
      };
      if (resp && buildRespJson) {
        setMyOffices((prevPosts: any) => {
          return [...prevPosts, buildRespJson];
        });
        setData((prevData) => ({
          ...prevData,
          c_professionalSecondaryAddress: [
            ...prevData.c_professionalSecondaryAddress,
            setDataValue,
          ],
        }));
      }
    } catch (error) {
      console.error(
        `Failed to fetch field configuration for ${JSON.stringify(error)}:`,
        error
      );
    } finally {
      setIsEditable(false);
      setOpen(false);
      setIsLoading(false);
    }
  };
  return (
    <>
      <div
        className={`w-full px-4 py-3 ${
          isEditable ? `bg-containerBG` : `bg-transparent`
        }`}
      >
        {isEditable ? (
          <>
            <div className="space-y-2">
              {myOffices.map((item, index) => (
                <div className="flex flex-col" key={index}>
                  <div className="font-bold">{item.name}</div>
                  <div className="text-sm">{item.id}</div>
                </div>
              ))}
            </div>
            <div
              className={`text-sm text-linkColor mt-2 hover:cursor-pointer`}
              onClick={() => setOpen(true)}
            >
              + Add New Office
            </div>
          </>
        ) : (
          <div
            onClick={() => setIsEditable(true)}
            className="hover:cursor-pointer"
          >
            {myOffices && myOffices.length >= 1 ? (
              <div className="space-y-2">
                {myOffices.map((item, index) => {
                  return (
                    <div className="flex flex-col" key={index}>
                      <div className="font-bold">{item.name}</div>
                      <div className="text-sm">{item.id}</div>
                    </div>
                  );
                })}
              </div>
            ) : (
              "Click to add"
            )}
          </div>
        )}
      </div>
      <Transition.Root show={open} as={React.Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-full overflow-y-auto px-8">
            <div className="flex min-h-full justify-center text-center items-center ">
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="w-2/5 relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all ">
                  <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                    <button
                      type="button"
                      className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={() => {
                        setOpen(false);
                      }}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="flex flex-col p-8 text-xs text-[#5d6572]">
                    <div className="text-xl font-bold pb-4">New Office</div>
                    <div className="flex border-y py-4 flex-row justify-start items-center">
                      <div className="font-semibold w-1/5">
                        <div className="flex flex-col gap-1">
                          <div className="flex  gap-2 items-center relative">
                            <div>Name</div>
                          </div>
                        </div>
                      </div>
                      <div className="w-2/5 flex justify-between">
                        <input
                          onChange={(e) =>
                            setValue({
                              ...value,
                              name: e.target.value,
                            })
                          }
                          type="text"
                          className="border w-full p-1 "
                        />
                      </div>
                    </div>
                    <div className="flex border-b py-4 flex-row justify-between items-center">
                      <div className="font-semibold   w-1/5">
                        <div className="flex flex-col gap-1">
                          <div className="flex  gap-2 items-center relative">
                            <div>Address</div>
                          </div>
                        </div>
                      </div>
                      <div className="w-4/5 flex justify-between">
                        <div className="flex flex-col mb-4 gap-2">
                          <label className="mb-2 gap-1 flex flex-col-reverse">
                            <input
                              className="border w-full p-1"
                              placeholder="Address Line 1"
                              value={address.line1}
                              onChange={(e) => handleInput(e, "line1")}
                              autoComplete="off"
                            />
                            <div>Address</div>
                          </label>
                          <label className="mb-2 gap-1 flex flex-col-reverse">
                            <input
                              className="border w-full p-1"
                              placeholder="Address Line 2"
                              value={address.line2}
                              onChange={(e) => handleInput(e, "line2")}
                            />
                            <div>Floor, Suite, Unit, etc.</div>
                          </label>
                          <div className="flex items-center">
                            <label className=" gap-1  flex flex-col-reverse">
                              <input
                                className=" p-1 mr-2 border border-brand-gray-100 rounded-md placeholder:text-text"
                                placeholder="City"
                                value={address.city}
                                onChange={(e) => handleInput(e, "city")}
                                autoComplete="off"
                              />
                              <div>City</div>
                            </label>
                            <div className="flex gap-1 flex-col-reverse">
                              <select
                                className="p-1 mr-2 border border-brand-gray-100 rounded-md placeholder:text-text cursor-pointer"
                                value={
                                  address.region ? address.region : "State"
                                }
                                onChange={(e) => handleInput(e, "region")}
                              >
                                {stateAbbrs.map((abbr) => (
                                  <option value={abbr} key={abbr}>
                                    {abbr}
                                  </option>
                                ))}
                              </select>
                              <span>State</span>
                            </div>
                            <label className=" gap-1  flex flex-col-reverse">
                              <input
                                className="p-1 border border-brand-gray-100 rounded-md placeholder:text-text"
                                placeholder="Zip code"
                                value={address.postalCode}
                                onChange={(e) => handleInput(e, "postalCode")}
                              />
                              <div>Postcode</div>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex border-b py-4 flex-row justify-start items-center">
                      <div className="font-semibold   w-1/5">
                        <div className="flex flex-col gap-1">
                          <div className="flex  gap-2 items-center relative">
                            <div>Photo</div>
                          </div>
                        </div>
                      </div>
                      <div className="w-2/5 ">
                        <PhotoField
                          isMulti={false}
                          fieldId={""}
                          initialValue={null}
                          setUrlData={(urlData: string) =>
                            setValue({
                              ...value,
                              primaryPhoto: {
                                image: {
                                  url: urlData,
                                },
                              },
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="flex mt-6 gap-3 justify-end">
                      <div
                        className={`h-8 flex items-center bg-active rounded-md px-4 py-0 text-white text-sm ${
                          isLoading
                            ? `bg-disabled pointer-events-none`
                            : `bg-active hover:cursor-pointer`
                        }`}
                        onClick={handleSave}
                      >
                        Continue
                      </div>
                      <button
                        // onClick={handleCancel}
                        className={`text-xs text-linkColor`}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default OtherAddessesEntityField;
