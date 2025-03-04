import { FC, useEffect, useState } from "react";
import { DropdownMain } from "./style";
import { useSelector } from "react-redux";

interface MultiselectDropdownProps {
    options: any[];
    onSelect: (item: any) => void;
    value: number[];
    property?: string;
}

const MultiselectDropdown: FC<MultiselectDropdownProps> = ({ options, onSelect, value, property }) => {
    const [items, setItems] = useState<any[]>([options]);
    const { isLoading } = useSelector((state: any) => state.sharedReducer);

    const handleSelect = (item: any) => {
        item.selected = !item.selected;
        const index = items.findIndex((i: any) => i.id == item.id);
        items[index] = item;
        setItems([...items]);
        onSelect(item);
    }

    useEffect(() => {
        if (value) {
            const customOptions: any[] = [...options];
            value.map((item: any) => {
                const findIndex = customOptions.findIndex((opt: any) => opt.id == item);
                if (findIndex >= 0) {
                    customOptions[findIndex]['selected'] = true;
                }

                setItems([...customOptions]);
            })
        }
    }, []);

    useEffect(() => {
        setItems([...options]);
    }, [options]);

    return (
        <DropdownMain>
            <ul className="p-custom-scrollbar-8">
                {items.map((item: any, index: number) => {
                    return <li key={index} onClick={() => handleSelect(item)}>
                        <div className="checkbox">
                            <input type="checkbox" checked={value.includes(item.id)} />
                        </div>
                        <div className="item-text">
                            <span className="text">{property ? item?.[property] : item?.title}</span>
                        </div>
                    </li>
                })}
                {!items.length && !isLoading && <span className="no-options-found">No options found</span>}
            </ul>
        </DropdownMain>
    );
};


export default MultiselectDropdown;