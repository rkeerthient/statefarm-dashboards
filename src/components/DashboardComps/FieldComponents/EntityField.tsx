import { Transition, Dialog, Listbox } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import LexicalMarkdownEditor from "../LexicalRichText/LexicalMarkdownEditor";
import PhotoGalleryField from "./PhotoGalleryField";
import * as React from "react";
import Ce_insuranceProducts from "../../../types/insurance_products";

interface EntityFieldProps {
  initialValue?: Ce_insuranceProducts[];
  fieldId: string;
}
const options = [
  { label: "Auto", value: "AUTO" },
  { label: "Home", value: "HOME" },
  { label: "Boat", value: "BOAT" },
  { label: "RV", value: "RV" },
  { label: "Renters", value: "RENTERS" },
];

const EntityField = ({ initialValue }: EntityFieldProps) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [insuranceProductPost, setInsuranceProductPost] = useState<
    Ce_insuranceProducts[]
  >(initialValue || []);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEditable, setIsEditable] = useState(false);
  const [open, setOpen] = useState<boolean>(false);
  const [newInsuranceProduct, setNewInsuranceProduct] =
    useState<Ce_insuranceProducts>({});

  const handleClick = () => {
    setIsEditable(true);
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const requestBody = encodeURIComponent(
        JSON.stringify({
          ...newInsuranceProduct,
          c_professionalsInsuranceProducts: ["fp-0274"],
        })
      );

      const response = await fetch(`/api/createEntity?body=${requestBody}`);
      const resp = await response.json();
      const buildRespJson = {
        c_category: await resp.response.c_category,
        name: await resp.response.name,
        id: await resp.response.meta.id,
      };
      resp &&
        buildRespJson &&
        setInsuranceProductPost((prevPosts: any) => {
          return [...prevPosts, buildRespJson];
        });
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
  const handleCancel = () => {
    setOpen(false);
    setIsEditable(false);
  };
  return (
    <>
      <div
        className={`w-full px-4 py-3 ${
          isEditable ? `bg-containerBG` : `bg-transparent`
        }`}
      >
        {isLoading && <div>isLoading...</div>}
        {isEditable ? (
          <>
            <div className="space-y-2">
              {insuranceProductPost.map((item, index) => (
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
              + Add blog
            </div>
          </>
        ) : (
          <div onClick={handleClick} className="hover:cursor-pointer">
            {insuranceProductPost && insuranceProductPost.length >= 1 ? (
              <div className="space-y-2">
                {insuranceProductPost.map((item, index) => (
                  <div className="flex flex-col" key={index}>
                    <div className="font-bold">{item.name}</div>
                    <div className="text-sm">{item.id}</div>
                  </div>
                ))}
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

          <div className="fixed inset-0 z-10 w-full overflow-y-auto">
            <div className="flex min-h-full items-end justify-center text-center sm:items-center ">
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="w-2/4 relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all ">
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
                  <div className="p-8 text-sm">
                    <div className="flex flex-col gap-6">
                      <div className="text-xl font-bold">New Blog</div>

                      <div className="flex flex-row justify-between items-center">
                        <div className="font-semibold text-[#5a6370] w-1/5">
                          <div className="flex flex-col gap-1">
                            <div className="flex  gap-2 items-center relative">
                              <div>Name</div>
                            </div>
                          </div>
                        </div>
                        <div className="w-4/5 flex justify-between">
                          <input
                            type="text"
                            className="border w-full p-1"
                            onChange={(e) =>
                              setNewInsuranceProduct({
                                ...newInsuranceProduct,
                                name: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="flex flex-row justify-between items-center">
                        <div className="font-semibold text-[#5a6370] w-1/5">
                          <div className="flex flex-col gap-1">
                            <div className="flex  gap-2 items-center relative">
                              <div>Landing page Url</div>
                            </div>
                          </div>
                        </div>
                        <div className="w-4/5 flex justify-between">
                          <input
                            type="text"
                            className="border w-full p-1"
                            onChange={(e) =>
                              setNewInsuranceProduct({
                                ...newInsuranceProduct,
                                landingPageUrl: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="flex flex-row justify-between items-center">
                        <div className="font-semibold text-[#5a6370] w-1/5">
                          <div className="flex flex-col gap-1">
                            <div className="flex  gap-2 items-center relative">
                              <div>Category</div>
                            </div>
                          </div>
                        </div>
                        <div className="w-4/5 flex justify-between">
                          <Listbox
                            value={selectedOption}
                            onChange={(e) =>
                              setNewInsuranceProduct({
                                ...newInsuranceProduct,
                                c_category: selectedOption.label,
                              })
                            }
                          >
                            <Listbox.Button className="py-2 pl-3 pr-10 text-left bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                              {selectedOption.label}
                            </Listbox.Button>
                            <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                              {options.map((option) => (
                                <Listbox.Option
                                  key={option.value}
                                  value={option}
                                  className={({ active, selected }) =>
                                    `cursor-pointer select-none relative py-2 pl-10 pr-4 ${
                                      active
                                        ? "text-white bg-blue-600"
                                        : selected
                                        ? "text-white bg-blue-500"
                                        : "text-gray-900"
                                    }`
                                  }
                                >
                                  {({ selected }) => (
                                    <>
                                      <span
                                        className={`block truncate ${
                                          selected
                                            ? "font-semibold"
                                            : "font-normal"
                                        }`}
                                      >
                                        {option.label}
                                      </span>
                                      {selected && (
                                        <span
                                          className={`${
                                            selected
                                              ? "text-white"
                                              : "text-gray-600"
                                          } absolute inset-y-0 left-0 flex items-center pl-3`}
                                        >
                                          <svg
                                            className="w-5 h-5"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            aria-hidden="true"
                                          >
                                            <path
                                              fillRule="evenodd"
                                              d="M0 11l2-2 5 5L18 3l2 2L7 18z"
                                            />
                                          </svg>
                                        </span>
                                      )}
                                    </>
                                  )}
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </Listbox>
                        </div>
                      </div>
                      <div className="flex flex-row justify-between items-center">
                        <div className="font-semibold text-[#5a6370] w-1/5">
                          <div className="flex flex-col gap-1">
                            <div className="flex  gap-2 items-center relative">
                              <div>PhotoGallery</div>
                            </div>
                          </div>
                        </div>
                        <div className="w-4/5 flex justify-between">
                          <PhotoGalleryField
                            passDataToParent={true}
                            setUrlData={(urlData: string[]) => {
                              console.log(urlData);

                              return setNewInsuranceProduct(
                                (prevNewBlog: any) => ({
                                  ...prevNewBlog,
                                  photoGallery: urlData.map((url) => ({
                                    image: {
                                      url: url,
                                    },
                                  })),
                                })
                              );
                            }}
                            editMode={true}
                            fieldId={""}
                            initialValue={undefined}
                          ></PhotoGalleryField>
                        </div>
                      </div>

                      <div className="flex flex-row justify-between items-center">
                        <div className="font-semibold text-[#5a6370] w-1/5">
                          <div className="flex flex-col gap-1">
                            <div className="flex  gap-2 items-center relative">
                              <div>Date posted</div>
                            </div>
                          </div>
                        </div>
                        <div className="w-4/5 flex justify-between">
                          <input
                            type="date"
                            className="border w-full p-1"
                            onChange={(e) =>
                              setNewInsuranceProduct({
                                ...newInsuranceProduct,
                                datePosted: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>

                      <div className="flex flex-row justify-between items-center">
                        <div className="font-semibold text-[#5a6370] w-1/5">
                          <div className="flex flex-col gap-1">
                            <div className="flex  gap-2 items-center relative">
                              <div>Short Description</div>
                            </div>
                          </div>
                        </div>
                        <div className="w-4/5 flex justify-between">
                          <LexicalMarkdownEditor
                            serializedAST={""}
                            editable={true}
                            setChangedData={(richText: string) => {
                              setNewInsuranceProduct({
                                ...newInsuranceProduct,
                                c_blogShortDescription: richText,
                              });
                            }}
                          ></LexicalMarkdownEditor>
                        </div>
                      </div>

                      <div className="flex flex-row justify-between items-center">
                        <div className="font-semibold text-[#5a6370] w-1/5">
                          <div className="flex flex-col gap-1">
                            <div className="flex  gap-2 items-center relative">
                              <div>Body</div>
                            </div>
                          </div>
                        </div>
                        <div className="w-4/5 flex justify-between">
                          <LexicalMarkdownEditor
                            serializedAST={""}
                            editable={true}
                            setChangedData={(richText: string) => {
                              setNewInsuranceProduct({
                                ...newInsuranceProduct,
                                bodyV2: richText,
                              });
                            }}
                          ></LexicalMarkdownEditor>
                        </div>
                      </div>
                    </div>
                    <div className="flex mt-6 gap-3">
                      <button onClick={handleSave}>Continue</button>
                      <button
                        onClick={handleCancel}
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

export default EntityField;
