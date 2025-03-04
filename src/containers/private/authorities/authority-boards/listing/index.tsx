import { FC, Fragment, useEffect, useState } from "react";
import {
  AuthorityBoardsListingSection,
  AuthorityBoardsListingMain,
  AuthorityBoardsListingTop,
} from "./style";
import Breadcrumb, { BreadcrumbLink } from "components/particles/breadcrumb";
import {
  DeleteTableSvg,
  EditTableSvg,
  ExcelSvg,
  PdfSvg,
  SearchFieldSvg,
} from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import useStore from "hooks/useStore";
import { sitePermissions } from "utils/helpers/enums/permissions.enum";
import { useNavigate } from "react-router-dom";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import useFinance from "../../useHooks";
import { BankInfoDTO } from "utils/helpers/models/finance/bank-info.dto";
import { confirmationPopup } from "utils/helpers/common/alert-service";
import useUtils from "hooks/useUtils";
import { useSelector } from "react-redux";
import DataNotFound from "components/particles/table/data-not-found";
import useAuthorities from "../../useHooks";
import { AuthorityBoardDTO } from "utils/helpers/models/authorities/authority-board.dto";

interface AuthorityBoardsListingProps { }

const AuthorityBoardsListing: FC<AuthorityBoardsListingProps> = ({ }) => {
  const breadcrumbLinks: BreadcrumbLink[] = [
    { title: 'Authority & Committees / ', path: siteRoutes.authoritiesListing },
    { title: 'Authority Boards', path: siteRoutes.authorityBoardsListing },
  ]
  const navigate = useNavigate();
  // const { getAuthorityBoards, deleteBankInfo } = useFinance();
  const [data, setData] = useState<AuthorityBoardDTO[]>([]);
  const { isLoading } = useSelector((state: any) => state.sharedReducer);
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });
  const { getAuthorityBoards, deleteAuthorityBoard, updateAuthorityBoard} = useAuthorities();
  const [search, setSearch] = useState<string>("");
  const columns: string[] = [
    "Title",
    "Status",
    "Action",
  ];

  const { hasAccess } = useStore();
  const { handleSearchChange, handleTableSearch } = useUtils();

  const goToCreate = () => {
    navigate(siteRoutes.createAuthorityBoard);
  };

  useEffect(() => {
    getAllAuthorityBoards(pagination.page, search);
  }, []);

  const handleDelete = async (id: number) => {
    const response = await confirmationPopup();
    if (response.isConfirmed) {
      const queryParams = {
        page: 1,
        per_page: pagination.per_page,
      };
      deleteAuthorityBoard(id, setData, queryParams, setPagination);
    }
  };

  const onPageChange = (pageInfo: { selected: number }) => {
    const { selected: page } = pageInfo;
    setPagination({ ...pagination, page: page + 1 });
    getAllAuthorityBoards(page + 1, search);
  };
  const getAllAuthorityBoards = (page: number, search: string) => {
    const queryParams = {
      per_page: pagination.per_page,
      page,
      search,
    };
    getAuthorityBoards(setData, queryParams, setPagination);
  };

  const goToEdit = (id: number) => {
    navigate(`${siteRoutes.createAuthorityBoard}?id=${id}`);
  }

  const handleUpdateStatus = (board: AuthorityBoardDTO, index: number) => {
    data[index] = board;
    setData([...data]);
    updateAuthorityBoard(board.id, board, false);

  }
  return (
    <AuthorityBoardsListingMain>
      <AuthorityBoardsListingTop>
        <div className="left">
          <span className="page-heading">Authority Boards</span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
        <div className="right">
          {hasAccess(sitePermissions.createAuthorityBoard) && (
            <div className="create-fine-slot-btn">
              <button className="lg-rounded-btn" onClick={goToCreate}>
                + Add Authority Board
              </button>
            </div>
          )}
        </div>
      </AuthorityBoardsListingTop>

      <AuthorityBoardsListingSection className="content-radius-shadow">
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
              onChange={(e) =>
                handleSearchChange(e, setSearch, getAllAuthorityBoards)
              }
              onKeyUp={(e) => handleTableSearch(e, getAllAuthorityBoards)}
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
              {data.map((board, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <div className="mw-150">
                        {board.title}
                      </div>
                    </td>
                    <td>
                      <div className="table-radio-field">
                        <div className="radio">
                          <label htmlFor={`is-active-yes-${index}`}>
                            Active
                          </label>
                          <input
                            type="radio"
                            name={`is-active-${index}`}
                            id={`is-active-yes-${index}`}
                            checked={board?.is_active == 1}
                            onChange={() => handleUpdateStatus({...board, is_active: 1},index)}
                          />
                        </div>
                        <div className="radio">
                          <label htmlFor={`is-active-no-${index}`}>
                            Non-Active
                          </label>
                          <input
                            type="radio"
                            name={`is-active-${index}`}
                            id={`is-active-no-${index}`}
                            checked={board?.is_active == 0}
                            onChange={() => handleUpdateStatus({...board, is_active: 0},index)}
                          />
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="table-action-icons">
                        <div className="action-icon" onClick={() => goToEdit(board.id)}>
                          <EditTableSvg />
                        </div>
                        <div className="action-icon" onClick={() => handleDelete(board.id)}>
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
        <Fragment>
          <DataNotFound show={!isLoading && !data.length} />
          <Pagination
            {...pagination}
            onPageChange={onPageChange}
          />
        </Fragment>
      </AuthorityBoardsListingSection>
    </AuthorityBoardsListingMain>
  );
};

export default AuthorityBoardsListing;
