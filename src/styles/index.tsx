import { Fragment } from "react"
import VariablesStyles from "./variables";
import CommonStyles from "./common";
import ScrollBarStyles from "./scrollbar";
import StructureStyles from "./structure";
import FormsStyles from "./forms";
import TableStyles from "./table";
import AnimationStyles from "./animations";
import LoaderStyles from "./loader";
import PalleteStyles from "./palletes";

const GlobalStyles = () => {
    return (
        <Fragment>
            <VariablesStyles />
            <CommonStyles />
            <ScrollBarStyles />
            <StructureStyles />
            <FormsStyles />
            <TableStyles />
            <AnimationStyles />
            <LoaderStyles />
            <PalleteStyles />
        </Fragment>
    )
}

export default GlobalStyles;