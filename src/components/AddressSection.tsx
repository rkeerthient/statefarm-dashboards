import * as React from "react";
import { Image } from "@yext/pages-components";
import { useMyContext } from "./Context/MyContext";
const AddressSection = () => {
  const { data } = useMyContext();
  const { address, c_professionalSecondaryAddress, photoGallery } = data;
  return (
    <>
      <div className="text-2xl font-bold text-[#003168]">My Offices</div>
      <div className=" font-medium text-[#003168]">
        I operate from select locations carefully chosen for productivity and
        convenience. These strategic hubs serve as dynamic workspaces, allowing
        me to seamlessly transition between environments, adapt to diverse
        scenarios, and stay agile in my professional pursuits.
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex py-6 border-b flex-col gap-2">
          <div className="text-lg font-bold">Primary Location</div>
          <div className=" !w-[250px] flex flex-col gap-2">
            <div className="max-h-[280px] h-full flex">
              {photoGallery ? (
                <Image image={photoGallery[0]} className="m-auto"></Image>
              ) : (
                <img
                  src="https://www.shutterstock.com/image-vector/vector-design-avatar-dummy-sign-600nw-1290556063.jpg"
                  alt=""
                  className="h-[250px] w-[250px]"
                />
              )}
            </div>

            <div className="text-[#003168] font-light text-sm px-2 flex flex-col gap-2">
              <div>{address.line1}</div>
              {address.line2 && <div>{address.line2}</div>}
              <div>
                {address.city}, {address.region} {address.postalCode}
              </div>
            </div>
            <a
              href={`#`}
              className="w-auto flex justify-between items-center text-center border bg-[#e2e8f0] text-black px-8 py-1 rounded-md mx-auto"
            >
              Get Directions
            </a>
          </div>
        </div>
        {c_professionalSecondaryAddress && (
          <div className="flex py-6  flex-col gap-2">
            <div className="text-lg font-bold">Secondary Location(s)</div>
            <div className="grid grid-cols-4 gap-4    p-8">
              {c_professionalSecondaryAddress.map((item: any, index: any) => (
                <div
                  key={index}
                  className=" border  !w-[250px] flex flex-col gap-2"
                >
                  <div className="max-h-[280px] h-full flex">
                    {item.primaryPhoto ? (
                      <Image
                        image={item.primaryPhoto}
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
                  <div className="text-[#003168] font-light text-sm px-2 flex flex-col gap-2">
                    <div>{item.address.line1}</div>
                    {item.address.line2 && <div>{item.address.line2}</div>}
                    <div>
                      {item.address.city}, {item.address.region}{" "}
                      {item.address.postalCode}
                    </div>
                  </div>
                  <a
                    href={`#`}
                    className="w-auto flex justify-between items-center text-center border bg-[#e2e8f0] text-black px-8 py-1 rounded-md mx-auto"
                  >
                    Get Directions
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AddressSection;
