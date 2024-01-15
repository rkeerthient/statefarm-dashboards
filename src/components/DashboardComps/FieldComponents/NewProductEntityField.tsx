import { Transition, Dialog, Listbox } from "@headlessui/react";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import LexicalMarkdownEditor from "../LexicalRichText/LexicalMarkdownEditor";
import PhotoGalleryField from "./PhotoGalleryField";
import * as React from "react";
import Ce_insuranceProducts from "../../../types/insurance_products";
import { useMyContext } from "../../Context/MyContext";

interface NewProductEntityFieldProps {
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

const NewProductEntityField = ({
  initialValue,
}: NewProductEntityFieldProps) => {
  const { userRole, setData } = useMyContext();
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

      const response = await fetch(
        `/api/createEntity?body=${requestBody}&entityType=ce_insuranceProducts`
      );
      const resp = await response.json();
      const buildRespJson = {
        c_category: await resp.response.c_category,
        name: await resp.response.name,
        id: await resp.response.meta.id,
        c_blogShortDescription: await resp.response.c_blogShortDescription,
      };
      if (resp && buildRespJson) {
        setInsuranceProductPost((prevPosts: any) => {
          return [...prevPosts, buildRespJson];
        });
        setData((prevData) => ({
          ...prevData,
          c_professionalsInsuranceProducts: [
            ...prevData.c_professionalsInsuranceProducts,
            buildRespJson,
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
              + Add Product
            </div>
          </>
        ) : (
          <div onClick={handleClick} className="hover:cursor-pointer">
            {insuranceProductPost && insuranceProductPost.length >= 1 ? (
              <div className="space-y-2">
                {insuranceProductPost.map((item, index) => {
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
                <Dialog.Panel className="w-2/4 relative transform overflow-scroll rounded-lg bg-white text-left shadow-xl transition-all h-[95vh] ">
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
                      <div className="text-xl font-bold">New Product</div>

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
                            onChange={(selected) => {
                              setSelectedOption(selected);
                              setNewInsuranceProduct({
                                ...newInsuranceProduct,
                                c_category: selected.label,
                              });
                            }}
                          >
                            <div className=" flex gap-4 relative mt-1 h-fit">
                              <Listbox.Button className="flex gap-4 relative w-full cursor-default bg-fieldBlurBorder rounded-s py-2 pl-3 pr-10 text-left hover:cursor-pointer">
                                <span className="block text-xs">
                                  {selectedOption.label}
                                </span>
                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                  <ChevronDownIcon
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                  />
                                </span>
                              </Listbox.Button>
                              <Listbox.Options className="absolute w-fit py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {options.map((option) => (
                                  <Listbox.Option
                                    key={option.value}
                                    value={option}
                                    className={({ active }) =>
                                      `w-full  select-none hover:cursor-pointer  ${
                                        active
                                          ? "bg-amber-100 text-amber-900"
                                          : ""
                                      }`
                                    }
                                  >
                                    {({ selected }) => (
                                      <>
                                        <span
                                          className={`block text-xs py-2 p-4 hover:bg-containerBG  ${
                                            selected
                                              ? "bg-dropdownActiveBG"
                                              : "bg-white"
                                          }`}
                                        >
                                          {option.label}
                                        </span>
                                      </>
                                    )}
                                  </Listbox.Option>
                                ))}
                              </Listbox.Options>
                            </div>
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
                            textSize="text-sm"
                            passDataToParent={true}
                            setUrlData={(urlData: string[]) => {
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
                            className="border w-fit p-1"
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

export default NewProductEntityField;
