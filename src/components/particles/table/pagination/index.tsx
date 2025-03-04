import { FC } from "react";
import { PaginationMain } from "./style";
import ReactPaginate from "react-paginate";

interface PaginationProps {
    onPageChange: (pageInfo: { selected: number }) => void;
    totalRecords: number;
    page: number;
    per_page: number;
}

const Pagination: FC<PaginationProps> = ({ onPageChange, page, totalRecords, per_page }) => {

    // const onPageChange = (page: { selected: number }): void => {
    //     if (setPage) setPage(page.selected + 1);
    // }
    return (
        <PaginationMain>
            <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={onPageChange}
                pageRangeDisplayed={5}
                pageCount={Math.ceil(totalRecords / per_page)}
                previousLabel="<"
                renderOnZeroPageCount={null}
                forcePage={page - 1}
            />
        </PaginationMain>
    )
}

export default Pagination;