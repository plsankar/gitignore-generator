import { GitignoreEndpointResponse } from "@/pages/api/gen";
import React, { FC, Fragment, memo } from "react";
import useSWR from "swr";
import { FaRegCopy } from "react-icons/fa";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-hot-toast";
import { Transition } from "@headlessui/react";
import { SelectOption } from "./types";

const GitignoreRender: FC<{ selected: SelectOption[] }> = ({ selected }) => {
    const { data, error } = useSWR<GitignoreEndpointResponse>(
        selected.length > 0
            ? `/api/gen?templates=${selected
                  .map((item) => item.value)
                  .join(",")}`
            : null
    );

    function getContent() {
        return data?.gitignore?.join("\n") ?? "";
    }

    if (error) {
        return (
            <div className="px-3 py-5 text-black bg-red-200">
                <p>{error.message}</p>
            </div>
        );
    }

    return (
        <div className="relative h-full max-h-full overflow-scroll md:max-h-screen">
            <Transition
                as={Fragment}
                show={selected.length > 0}
                appear={true}
                enter="transform transition duration-[400ms]"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transform duration-200 transition ease-in-out"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="h-full p-5 pb-32 overflow-scroll text-sm">
                    {getContent()
                        .split("\n")
                        .map((str, key) => (
                            <p
                                key={key}
                                className={`${
                                    str.startsWith("#") ? "text-slate-400" : ""
                                }`}
                            >
                                {str}
                                <br />
                            </p>
                        ))}
                </div>
            </Transition>
            <div className="absolute flex -translate-x-1/2 bottom-10 left-1/2">
                <CopyToClipboard
                    text={getContent()}
                    onCopy={() => toast.success("Copied!")}
                >
                    <Transition
                        as={Fragment}
                        show={selected.length > 0}
                        appear={true}
                        enter="transform transition duration-[400ms]"
                        enterFrom="opacity-0 scale-50"
                        enterTo="opacity-100 scale-100"
                        leave="transform duration-200 transition ease-in-out"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <button className="flex items-center h-10 gap-3 px-5 m-2 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded focus:shadow-outline hover:bg-indigo-800 hover:ring-2 hover:ring-indigo-500 ring-offset-2">
                            <FaRegCopy className="w-4 h-4" />
                            <span>Copy</span>
                        </button>
                    </Transition>
                </CopyToClipboard>
            </div>
        </div>
    );
};

export default memo(GitignoreRender);
