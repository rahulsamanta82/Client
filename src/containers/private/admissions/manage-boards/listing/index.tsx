import { FC, Fragment, useEffect, useState } from "react";
import {
    BoardManagementListingMain,
    BoardManagementListingSection,
    BoardManagementListingTop,
} from "./style";
import Breadcrumb from "components/particles/breadcrumb";
import {
    DeleteTableSvg,
    EditTableSvg,
    ExcelSvg,
    PdfSvg,
    SearchFieldSvg,
} from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import { DropdownMain } from "components/particles/forms/multiselect-dropdown/style";
import { useNavigate } from "react-router-dom";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { confirmationPopup } from "utils/helpers/common/alert-service";
import useOrganization from "containers/private/organization/useHooks";
import useUtils from "hooks/useUtils";

interface AdmissionDocumentsMasterListingProps { }

const AdmissionBoardManagementListing: FC<AdmissionDocumentsMasterListingProps> = () => {
    const columns: string[] = ["Title", "Type", "Status", "Action"];
    const { handleSearchChange, handleTableSearch } = useUtils();

    const [pagination, setPagination] = useState({
        page: 1,
        per_page: 10,
        totalRecords: 1,
    });
    const { getBoards, deleteBoard, updateBoard } = useOrganization();
    const [data, setData] = useState<any[]>([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(siteRoutes.createAdmissionBoardManagement);
    };

    const onPageChange = (pageInfo: { selected: number }) => {
        const { selected: page } = pageInfo;
        setPagination({ ...pagination, page: page + 1 });
        getAllBoards(page + 1);
    };
    const getAllBoards = (page: number = 1) => {
        const queryParams = {
            per_page: pagination.per_page,
            page,
            search,
        };
        getBoards(setData, queryParams, setPagination);
    };


    useEffect(() => {
        getAllBoards();
    }, []);

    const handleSearch = (event: any) => {
        if (event.key === "Enter") {
            getAllBoards();
        }
    };

    const handleDelete = async (id: number) => {
        const response = await confirmationPopup();
        if (response.isConfirmed) {
            const queryParams = {
                page: 1,
                per_page: pagination.per_page,
            };
            deleteBoard(id, setData, queryParams, setPagination);
        }
    };

    const goToEditBoard = (id: number) => {
        navigate(`${siteRoutes.boardManagementCreate}?id=${id}`);
    };

    const handleChangeBoardStatus = (board: any) => {
        const { level, is_active, id, title } = board;
        const index = data.findIndex((b => b.id === id));
        data[index] = board;
        setData([...data]);
        updateBoard(id, { level, is_active, title });
    }

    return (
        <BoardManagementListingMain>
            <BoardManagementListingTop>
                <div className="left">
                    <span className="page-heading">Manage Boards/Universities </span>
                    <Breadcrumb />
                </div>
                <div className="right">
                    <div className="add-new-button">
                        <button className="lg-rounded-btn" onClick={handleClick}>
                            + Add New
                        </button>
                    </div>
                </div>
            </BoardManagementListingTop>

            <BoardManagementListingSection className="content-radius-shadow">
                <div className="list-header">
                    <div className="table-data-export-buttons">
                        <div className="export-btn">
                            <span>
                                <PdfSvg className="icon" />
                            </span>
                            <span className="text">PDF</span>
                        </div>

                        <div className="export-btn">
                            <span>
                                <ExcelSvg className="icon" />
                            </span>
                            <span className="text">Excel</span>
                        </div>
                    </div>
                    <div className="table-search-field">
                        <span className="search-icon">
                            <SearchFieldSvg className="icon" />
                        </span>
                        <input
                            type="search"
                            placeholder="Search"
                            value={search}
                            onChange={(e) => handleSearchChange(e, setSearch, getAllBoards)}
                            onKeyUp={e => handleTableSearch(e, getAllBoards)}
                        />
                    </div>
                </div>
                <div className="data-table">
                    <table className="bottom-bordered-cells">
                        <thead>
                            <tr>
                                {columns.map((column: string, index: number) => {
                                    return <th key={index}>{column}</th>;
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item: any, index: number) => {
                                return (
                                    <tr key={index}>
                                        <td>
                                            <div className="mw-150">{item.title}</div>
                                        </td>
                                        <td>{item?.level?.length ? item.level.join(',') : 'No Level'}</td>
                                        <td>
                                            <div className="table-radio-field">
                                                <div className="radio">
                                                    <input
                                                        type="radio"
                                                        name={`is-active-${index}`}
                                                        id={`is-active-yes-${index}`}
                                                        checked={item.is_active == 1}
                                                        onChange={() => handleChangeBoardStatus({ ...item, is_active: 1 })}
                                                    />
                                                    <label htmlFor={`is-active-yes-${index}`}>
                                                        Active
                                                    </label>
                                                </div>
                                                <div className="radio">
                                                    <input
                                                        type="radio"
                                                        name={`is-active-${index}`}
                                                        id={`is-active-no-${index}`}
                                                        checked={item.is_active == 0}
                                                        onChange={() => handleChangeBoardStatus({ ...item, is_active: 0 })}
                                                    />
                                                    <label htmlFor={`is-active-no-${index}`}>
                                                        Deactive
                                                    </label>
                                                </div>
                                            </div>
                                        </td>

                                        <td>
                                            <div className="table-action-icons">
                                                <div
                                                    className="action-icon"
                                                    onClick={() => goToEditBoard(item.id)}
                                                >
                                                    <EditTableSvg />
                                                </div>

                                                <div
                                                    className="action-icon"
                                                    onClick={() => handleDelete(item.id)}
                                                >
                                                    <DeleteTableSvg />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                <div>
                    <DropdownMain />
                </div>
                <Fragment>
                    <Pagination
                        {...pagination}
                        onPageChange={onPageChange}
                    />
                </Fragment>
            </BoardManagementListingSection>
        </BoardManagementListingMain>
    );
};

export default AdmissionBoardManagementListing;
