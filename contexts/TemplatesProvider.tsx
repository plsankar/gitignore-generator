import { SelectOption } from "@/components/types";
import React, {
    FC,
    ReactNode,
    createContext,
    useContext,
    useState,
} from "react";

type TemplatesContext = {
    selected: SelectOption[];
    setSelected: (selected: SelectOption[]) => void;
};

const TemplatesContext = createContext<TemplatesContext>({
    selected: [],
    setSelected: function (_: SelectOption[]): void {},
});

export const useTemplates = () => useContext(TemplatesContext);

const TemplatesProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [selected, setSelected] = useState<SelectOption[]>([]);
    function handleOnChange(value: SelectOption[]) {
        setSelected(value);
    }
    return (
        <TemplatesContext.Provider
            value={{ selected, setSelected: handleOnChange }}
        >
            {children}
        </TemplatesContext.Provider>
    );
};

export default TemplatesProvider;
