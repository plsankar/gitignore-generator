import GitignoreRender from "@/components/GitignoreRender";
import Header from "@/components/Header";
import TemplatesControl from "@/components/TemplatesControl";
import { useTemplates } from "@/contexts/TemplatesProvider";
import { Transition } from "@headlessui/react";
import { Fragment } from "react";

export default function Home() {
    const { selected } = useTemplates();
    return (
        <div className="flex flex-col w-screen min-h-screen md:flex-row">
            <div className="z-10 md:sticky md:top-0 md:flex-grow">
                <div className="p-10 max-w-[800px] mx-auto sticky top-0">
                    <Header />
                    <div className="flex flex-col gap-6 py-5 mt-20">
                        <h1 className="text-2xl font-light">
                            Generate .gitignore for your project
                        </h1>
                        <TemplatesControl />
                    </div>
                </div>
            </div>

            <div className="flex-grow w-full md:w-1/5 xl:min-w-[600px] lg:min-w-[500px] md:min-w-[450px] md:flex-grow-0 sm:flex-grow overflow-scroll relative">
                <Transition
                    as={Fragment}
                    show={selected.length > 0}
                    appear={true}
                    enter="transform transition duration-[200ms]"
                    enterFrom="translate-x-full"
                    enterTo="translate-x-0"
                    leave="transform duration-200 transition ease-in-out"
                    leaveFrom="translate-x-0"
                    leaveTo="translate-x-full"
                >
                    <div className="absolute inset-0 z-10 w-full h-full bg-slate-100"></div>
                </Transition>
                <GitignoreRender selected={selected} />
            </div>
        </div>
    );
}
