import * as React from "react";
import { useEffect, useState } from "react";
import Actions from "../common/Actions";
interface HoursTempClosedFieldProps {
  initialValue: any | undefined;
  fieldId?: string;
}

const HoursTempClosedField = ({
  initialValue,
  fieldId,
}: HoursTempClosedFieldProps) => {
  const [value, setValue] = useState<any>(initialValue);
  const [isEditable, setIsEditable] = useState(false);
  const isContentEdited = value !== initialValue;
  const [isChecked, setIsChecked] = useState(initialValue ? true : false);
  useEffect(() => {
    !isChecked && setValue("");
  }, [isChecked]);
  const handleClick = () => {
    setIsEditable(true);
  };

  return (
    <div
      className={`w-full px-4 py-3 ${
        isEditable ? `bg-containerBG` : `bg-transparent`
      }`}
    >
      {isEditable ? (
        <>
          <div className="flex flex-col gap-2 p-2">
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
              />
              <div>Temporarily Closed</div>
            </div>

            {isChecked && (
              <input
                type="date"
                onChange={(e) => setValue(e.target.value)}
                value={value}
                className="w-1/4 border p-1"
              />
            )}
          </div>
        </>
      ) : (
        <div onClick={handleClick} className="hover:cursor-pointer">
          {(value && new Date(Date.parse(value)).toLocaleDateString("en-US")) ||
            "Click to add"}
        </div>
      )}
      {isEditable && (
        <Actions
          initialValue={initialValue}
          isContentEdited={isContentEdited}
          setIsEditable={(e) => setIsEditable(e)}
          setValue={(e) => setValue(e)}
          saveBody={{ [fieldId as string]: { reopenDate: value } }}
        />
      )}
    </div>
  );
};

export default HoursTempClosedField;
