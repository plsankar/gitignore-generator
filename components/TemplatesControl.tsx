import React from "react";
import useSWR from "swr";
import Select, { MultiValue } from "react-select";
import makeAnimated from "react-select/animated";
import { SelectOption } from "./types";
import { TemplatesEndpointResponse } from "@/pages/api/templates";
import { useTemplates } from "@/contexts/TemplatesProvider";

const animatedComponents = makeAnimated();

const TemplatesControl = () => {
    const { data, error } = useSWR<TemplatesEndpointResponse>("/api/templates");
    const { selected, setSelected } = useTemplates();
    function handleOnChange(value: MultiValue<SelectOption>) {
        setSelected(Array.from(value));
    }
    if (error) {
        return (
            <div className="px-3 py-5 text-black bg-red-200">
                <p>{error.message}</p>
            </div>
        );
    }
    return (
        <div>
            <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                defaultValue={selected}
                isMulti
                onChange={handleOnChange}
                options={data?.templates}
            />
        </div>
    );
};

export default TemplatesControl;
