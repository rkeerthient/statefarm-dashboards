import * as React from "react";
import { useEffect, useState } from "react";
export interface Root {
  uid: string;
  accountId: string;
  createdDate: string;
  lastUpdatedDate: string;
  resolvedDate: string;
  source: Source;
  entityFieldSuggestion: EntityFieldSuggestion;
  status: string;
  locked: boolean;
  comments: any[];
  approver: Approver;
}

export interface Source {
  userId: string;
}

export interface EntityFieldSuggestion {
  entity: Entity;
  existingContent: ExistingContent;
  suggestedContent: SuggestedContent;
}

export interface Entity {
  id: string;
  uid: string;
  type: string;
  language: string;
  folderId: string;
  labels: string[];
}

export interface ExistingContent {
  c_fAQs: CFAq[];
}

export interface CFAq {
  question: string;
  answer: string;
}

export interface SuggestedContent {
  c_fAQs: CFAq2[];
}

export interface CFAq2 {
  question: string;
  answer: string;
}

export interface Approver {
  userId: string;
}

export interface Source {
  userId: string;
}
const Suggestions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestionsData, setSuggestionsData] = useState<Root[]>([]);
  const formattedDate = (createdDate: string) => {
    const dateObject = new Date(Date.parse(createdDate));

    const dateString = dateObject.toLocaleDateString("en-US", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });

    const timeString = dateObject.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });

    return `${dateString} at ${timeString}`;
  };
  useEffect(() => {
    let isMounted = true;

    const getFieldConfig = async () => {
      const entityId = `fp-0274`;
      try {
        const response = await fetch(`/api/getSuggestions/${entityId}`);

        if (!isMounted) {
          return;
        }
        const mainJson: any = await response.json();
        const suggestions: Root[] = mainJson.response.suggestions.sort(
          (a: Root, b: Root) =>
            new Date(b.createdDate).getTime() -
            new Date(a.createdDate).getTime()
        );

        setSuggestionsData(suggestions);
      } catch (error) {
        console.error(
          `Failed to fetch field configuration for ${`fp-0274`}:`,
          error
        );
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };
    getFieldConfig();

    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <div className="min-h-[800px] overflow-scroll p-4 bg-white">
      {isLoading ? (
        <div
          className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        ></div>
      ) : (
        <div className="flex flex-col gap-2 px-4 centered-container text-sm text-slate-600 overflow-auto">
          {suggestionsData.map((item: Root, index: number) => (
            <div key={index} className="flex   border border-gray-300 w-full">
              <div className="border-r-2 border-gray-300 w-1/3 p-4">
                <div className="flex flex-col gap-4">
                  <div className="font-bold">Existing</div>
                  <div className="flex flex-col">
                    {Object.entries(
                      item.entityFieldSuggestion.existingContent
                    ).map(([key, value]) => (
                      <div key={index}>
                        <div>{key}</div>
                        <div>{value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className=" w-1/3 flex p-4 border-r-2 border-gray-300 ">
                <div className="flex flex-col gap-4 ">
                  <div className="font-bold">Suggested</div>
                  <div className="flex flex-col">
                    {Object.entries(
                      item.entityFieldSuggestion.suggestedContent
                    ).map(([key, value]) => (
                      <div key={index}>
                        <div>{key}</div>
                        <div className="flex flex-col mt-2">
                          {Array.isArray(value)
                            ? value.map((item, index) => <div>{item}</div>)
                            : value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className=" w-1/3 flex flex-col gap-2 p-4 ">
                <div className="flex flex-col ">
                  <div className="font-bold">Created</div>
                  <div>{formattedDate(item.createdDate)}</div>
                </div>
                <div className="flex flex-col ">
                  <div className="font-bold">Status</div>
                  <div>{item.status}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Suggestions;
