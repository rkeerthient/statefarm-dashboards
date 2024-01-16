import { Listbox, Transition } from "@headlessui/react";
import { ChevronDownIcon, TrashIcon } from "@heroicons/react/24/outline";
import * as React from "react";
import { Fragment, useState } from "react";

interface HoursHolidayFieldProps {
  initialValue: any[] | undefined;
  fieldId?: string;
}

interface Interval {
  start: string;
  end: string;
}

const HoursHolidayField = ({
  fieldId,
  initialValue,
}: HoursHolidayFieldProps) => {
  const hoursType = ["Open", "Split", "24 Hours", "Closed"];
  const [isEditable, setIsEditable] = useState(false);

  const initialSelectedIntervals: Interval[] = initialValue || [];

  const [value, setValue] = useState<Interval[]>(initialSelectedIntervals);
  const handleDateChange = (index: any, date: string) => {
    setValue((prev) => {
      const openIntervals =
        date === "24 Hours"
          ? [{ start: "00:00", end: "23:59" }]
          : [{ start: "", end: "" }];
      return prev.map((interval, i) => {
        if (i === index) {
          return {
            ...interval,
            date,
            selectedType: getType({ isClosed: false, openIntervals }),
            openIntervals,
          };
        }
        return interval;
      });
    });
  };

  const handleSplitAdd = () => {
    setValue((prev) => [...prev, { start: "", end: "" }]);
  };

  const handleSplitChange = (index: number, type: string, value: string) => {
    setValue((prev) => {
      const newIntervals = prev.map((interval, i) => {
        if (i === index) {
          return {
            ...interval,
            [type]: value,
          };
        }
        return interval;
      });
      return newIntervals;
    });
  };

  const handleSplitRemove = (index: number) => {
    setValue((prev) => prev.filter((_, i) => i !== index));
  };

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
  const handleDropdownChange = (index: number, selectedType: string) => {
    setValue((prev) => {
      const openIntervals =
        selectedType === "24 Hours"
          ? [{ start: "00:00", end: "23:59" }]
          : [{ start: "", end: "" }];

      return prev.map((interval, i) => {
        if (i === index) {
          return {
            ...interval,
            selectedType,
            openIntervals,
          };
        }
        return interval;
      });
    });
  };

  return (
    <>
      {isEditable ? (
        <div className="flex flex-col text-xs">
          <div className="flex flex-col gap-3 items-baseline">
            {value.map((interval, index) => (
              <div className="flex gap-3 items-baseline" key={index}>
                <input
                  type="date"
                  value={interval.date}
                  onChange={(e) => handleDateChange(index, e.target.value)}
                />
                <div className="w-1/5 px-2 py-1">
                  <Listbox
                    className="border p-1 pr-0"
                    value={getType(interval)}
                    onChange={(selectedType) =>
                      handleDropdownChange(index, getType(interval))
                    }
                  >
                    <div className="relative mt-1">
                      <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white text-left">
                        <span className="block truncate">
                          {getType(interval)}
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
                {getType(interval) === "Split" ? (
                  <div className="flex flex-col gap-3">
                    {interval.openIntervals.map((interval, i) => (
                      <div className="flex gap-2" key={i}>
                        <input
                          className="border w-1/2 p-1 bg-white"
                          type="text"
                          placeholder="Start time"
                          value={interval.start}
                          onChange={(e) =>
                            handleSplitChange(index, "end", e.target.value)
                          }
                        />
                        <input
                          className="border w-1/2 p-1 bg-white"
                          type="text"
                          placeholder="End time"
                          value={interval.end}
                          onChange={(e) =>
                            handleSplitChange(index, "start", e.target.value)
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
                    <div className="flex flex-col gap-3">
                      <div className="flex gap-2" key={index}>
                        <input
                          className="border w-1/2 p-1 bg-white"
                          type="text"
                          disabled={
                            getType(interval) === "Closed" ||
                            getType(interval) === "24 Hours"
                          }
                          value={
                            getType(interval) === "24 Hours"
                              ? "00:00"
                              : getType(interval) !== "Closed"
                              ? interval.openIntervals[0].start
                              : ""
                          }
                        />
                        <input
                          className="border w-1/2 p-1 bg-white"
                          type="text"
                          disabled={
                            getType(interval) === "Closed" ||
                            getType(interval) === "24 Hours"
                          }
                          value={
                            getType(interval) === "24 Hours"
                              ? "23:59"
                              : getType(interval) !== "Closed"
                              ? interval.openIntervals[0].end
                              : ""
                          }
                        />
                        <TrashIcon
                          className="w-4 h-4 hover:cursor-pointer"
                          onClick={() => handleSplitRemove(index)}
                        >
                          Remove
                        </TrashIcon>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
            <button onClick={handleSplitAdd} className="text-linkColor mr-auto">
              + Add an item
            </button>
          </div>
        </div>
      ) : (
        <div className="hover:cursor-pointer w-[60%]">
          {initialValue.length >= 1
            ? initialValue.map((item: any, index: any) => (
                <div className="flex gap-1 items-baseline" key={index}>
                  <div className="w-1/5">
                    {new Date(Date.parse(item.date)).toLocaleDateString(
                      "en-US"
                    )}
                  </div>
                  <div className="flex flex-col  w-1/5">
                    {item.isClosed ? (
                      <div>Closed</div>
                    ) : item.openIntervals[0].start === "00:00" &&
                      item.openIntervals[0].end === "23:59" ? (
                      <div>24 Hours</div>
                    ) : (
                      item.openIntervals.map((subItem, subIndex) => (
                        <div key={subIndex} className="flex gap-8">
                          <div key={subIndex}>{subItem.start}</div>
                          <div key={subIndex}>{subItem.end}</div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              ))
            : `Click me!`}
        </div>
      )}
    </>
  );
};

export default HoursHolidayField;
