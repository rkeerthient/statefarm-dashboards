import { Listbox, Transition } from "@headlessui/react";
import { ChevronDownIcon, TrashIcon } from "@heroicons/react/24/outline";
import * as React from "react";
import { Fragment, useState } from "react";
import Actions from "../common/Actions";
interface HoursFieldProps {
  initialValue: any | undefined;
  fieldId?: string;
}
interface Interval {
  start: string;
  end: string;
}

interface SelectedDays {
  [day: string]: {
    selectedType: string;
    openIntervals: Interval[];
  };
}

const HoursField = ({ initialValue, fieldId }: HoursFieldProps) => {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const hoursType = ["Open", "Split", "24 Hours", "Closed"];
  const [isEditable, setIsEditable] = useState(false);
  const handleSplitAdd = (day: string) => {
    setValue((prev) => {
      const newIntervals = [...prev[day].openIntervals, { start: "", end: "" }];
      return {
        ...prev,
        [day]: {
          ...prev[day],
          openIntervals: newIntervals,
        },
      };
    });
  };
  const handleSplitChange = (
    day: string,
    index: number,
    type: string,
    value: string
  ) => {
    setValue((prev) => {
      const newIntervals = prev[day].openIntervals.map((interval, i) => {
        if (i === index) {
          return {
            ...interval,
            [type]: value,
          };
        }
        return interval;
      });
      return {
        ...prev,
        [day]: {
          ...prev[day],
          openIntervals: newIntervals,
        },
      };
    });
  };

  const handleSplitRemove = (day: string, index: number) => {
    setValue((prev) => {
      const newIntervals = prev[day].openIntervals.filter(
        (_, i) => i !== index
      );
      return {
        ...prev,
        [day]: {
          ...prev[day],
          openIntervals: newIntervals,
        },
      };
    });
  };
  const initialSelectedDays: SelectedDays = days.reduce(
    (acc: any, day: any) => {
      const dayData = initialValue[day.toLowerCase()] || { openIntervals: [] };
      JSON.stringify(initialValue) === "{}" || initialValue === undefined
        ? (acc[day] = {
            selectedType: "Closed",
            openIntervals: [],
          })
        : (acc[day] = {
            selectedType: dayData.isClosed
              ? "Closed"
              : dayData.openIntervals.length > 1
              ? "Split"
              : dayData.openIntervals.length > 0 &&
                dayData.openIntervals[0].start === "00:00" &&
                dayData.openIntervals[0].end === "23:59"
              ? "24 Hours"
              : "Open",
            openIntervals: dayData.openIntervals,
          });
      return acc;
    },
    {}
  );
  const [value, setValue] = useState<SelectedDays>(initialSelectedDays);

  // const areJSONsEqual = (json1: any, json2: any) => {
  //   const normalizeJSON = (jsonString) =>
  //     jsonString.toLowerCase().replace(/"closed"/g, '"isClosed"');

  //   const normalizedJSON1 = normalizeJSON(JSON.stringify(json1));
  //   const normalizedJSON2 = normalizeJSON(JSON.stringify(json2));

  //   return normalizedJSON1 === normalizedJSON2;
  // };
  // const isContentEdited = areJSONsEqual(value, initialValue);

  const handleDayChange = (day: string, value: string) => {
    setValue((prev) => {
      const openIntervals =
        value === "24 Hours"
          ? [{ start: "00:00", end: "23:59" }]
          : [{ start: "", end: "" }];
      return {
        ...prev,
        [day]: { selectedType: value, openIntervals },
      };
    });
  };

  const handleSave = () => {
    const result: Record<
      string,
      { isClosed?: boolean; openIntervals?: Interval[] }
    > = {};
    days.forEach((day) => {
      const selectedType = value[day].selectedType;
      if (selectedType === "Closed") {
        result[day.toLowerCase()] = {
          isClosed: true,
        };
      } else {
        result[day.toLowerCase()] = {
          openIntervals: value[day].openIntervals,
        };
      }
    });
    console.log(JSON.stringify({ hours: result }, null, 2));
  };

  const handleIntervalChange = (day: string, type: string, value: string) => {
    setValue((prev) => {
      const newIntervals = prev[day].openIntervals.map((interval) => ({
        ...interval,
      }));
      if (type === "start") {
        newIntervals[0].start = value;
      } else {
        newIntervals[0].end = value;
      }
      return {
        ...prev,
        [day]: {
          ...prev[day],
          openIntervals: newIntervals,
        },
      };
    });
  };

  return (
    <>
      {isEditable ? (
        <div className="flex flex-col text-xs">
          {days.map((day, index) => (
            <div className="flex gap-3 items-baseline" key={index}>
              <div className="font-semibold w-1/5">{day}</div>
              <div className="w-1/5 px-2 py-1">
                <Listbox
                  className="border p-1 pr-0"
                  value={value[day].selectedType}
                  onChange={(value) => handleDayChange(day, value)}
                >
                  <div className="relative mt-1">
                    <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white text-left">
                      <span className="block truncate">
                        {value[day].selectedType}
                      </span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronDownIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </span>
                    </Listbox.Button>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="border absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white focus:outline-none">
                        {hoursType.map((hoursOption, index) => (
                          <Listbox.Option
                            key={index}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 px-4 ${
                                active
                                  ? "bg-amber-100 text-amber-900"
                                  : "text-gray-900"
                              }`
                            }
                            value={hoursOption}
                          >
                            {({ selected }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selected ? "font-normal" : "font-light"
                                  }`}
                                >
                                  {hoursOption}
                                </span>
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
              </div>
              {value[day].selectedType === "Split" ? (
                <div className="flex flex-col gap-3">
                  {value[day].openIntervals.map((interval, i) => (
                    <div className="flex gap-2" key={i}>
                      <input
                        className="border w-1/2 p-1 bg-white"
                        type="text"
                        placeholder="Start time"
                        value={interval.start}
                        onChange={(e) =>
                          handleSplitChange(day, i, "start", e.target.value)
                        }
                      />
                      <input
                        className="border w-1/2 p-1 bg-white"
                        type="text"
                        placeholder="End time"
                        value={interval.end}
                        onChange={(e) =>
                          handleSplitChange(day, i, "end", e.target.value)
                        }
                      />
                      <TrashIcon
                        className="w-4 h-4 hover:cursor-pointer"
                        onClick={() => handleSplitRemove(day, i)}
                      >
                        Remove
                      </TrashIcon>
                    </div>
                  ))}
                  <button
                    onClick={() => handleSplitAdd(day)}
                    className="text-linkColor mr-auto"
                  >
                    + Add an item
                  </button>
                </div>
              ) : (
                <>
                  <div className="w-1/5 px-4 py-1">
                    <input
                      className="border w-full p-1 bg-white"
                      type="text"
                      disabled={
                        value[day].selectedType === "Closed" ||
                        value[day].selectedType === "24 Hours"
                      }
                      value={
                        value[day].selectedType === "24 Hours"
                          ? "00:00"
                          : value[day].selectedType !== "Closed"
                          ? value[day].openIntervals[0].start
                          : ""
                      }
                      onChange={(e) =>
                        handleIntervalChange(day, "start", e.target.value)
                      }
                    />
                  </div>
                  <div className="w-1/5 px-4 py-1">
                    <input
                      type="text"
                      className="border w-full p-1 bg-white"
                      disabled={
                        value[day].selectedType === "Closed" ||
                        value[day].selectedType === "24 Hours"
                      }
                      value={
                        value[day].selectedType === "24 Hours"
                          ? "23:59"
                          : value[day].selectedType !== "Closed"
                          ? value[day].openIntervals[0].end
                          : ""
                      }
                      onChange={(e) =>
                        handleIntervalChange(day, "end", e.target.value)
                      }
                    />
                  </div>
                </>
              )}
            </div>
          ))}
          <Actions
            initialValue={initialValue}
            isContentEdited={true}
            setIsEditable={(e) => setIsEditable(e)}
            setValue={(e) => setValue(e)}
            saveBody={{ [fieldId as string]: buildBody(days, value) }}
          ></Actions>
        </div>
      ) : (
        <div
          className="hover:cursor-pointer"
          onClick={() => setIsEditable(true)}
        >
          {JSON.stringify(initialValue) !== "{}" || initialValue !== undefined
            ? days.map((day, index) => (
                <div className="flex gap-1 items-baseline" key={index}>
                  <div className="font-semibold w-1/5">{day}</div>
                  <div className="font-semibold w-1/5">
                    {value[day].selectedType}
                  </div>

                  {!["24 Hours", "Closed"].includes(value[day].selectedType) &&
                    (value[day].selectedType === "Split" ? (
                      <span className="flex flex-col w-2/5">
                        {value[day].openIntervals.map((interval, i) => (
                          <div className="flex gap-2" key={i}>
                            <div className=" w-1/2">{interval.start}</div>
                            <div className="  w-1/2">{interval.end}</div>
                          </div>
                        ))}
                      </span>
                    ) : (
                      <>
                        <div className="font-semibold w-1/5">
                          {value[day].openIntervals[0].start}
                        </div>
                        <div className="font-semibold w-1/5">
                          {value[day].openIntervals[0].end}
                        </div>
                      </>
                    ))}
                </div>
              ))
            : `Click me!`}
        </div>
      )}
    </>
  );
};

export default HoursField;

const buildBody = (days: string[], value: SelectedDays) => {
  const result: Record<
    string,
    { isClosed?: boolean; openIntervals?: Interval[] }
  > = {};
  days.forEach((day) => {
    const selectedType = value[day].selectedType;
    if (selectedType === "Closed") {
      result[day.toLowerCase()] = {
        isClosed: true,
      };
    } else {
      result[day.toLowerCase()] = {
        openIntervals: value[day].openIntervals,
      };
    }
  });
  return result;
};
