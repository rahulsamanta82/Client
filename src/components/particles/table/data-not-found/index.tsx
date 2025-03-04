import { FC } from "react";
import { DataNotFoundMain } from "./style";

interface DataNotFoundProps {
    show: boolean;
}

const DataNotFound: FC<DataNotFoundProps> = ({ show }) => {
    return (
        <DataNotFoundMain show={show}>
            <span>No record found</span>
        </DataNotFoundMain>
    )
}

export default DataNotFound;