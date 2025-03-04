import { FC, Fragment, useEffect, useState } from "react";
import {
  LinkMeritListingMain,
  LinkMeritListingSection,
  LinkMeritListingTop,
} from "./style";
import {
  DeleteTableSvg,
  EditTableSvg,
  ExcelSvg,
  PdfSvg,
  SearchFieldSvg,
} from "assets/images/common/svgs";
import Breadcrumb from "components/particles/breadcrumb";
import Pagination from "components/particles/table/pagination";
import { useNavigate } from "react-router-dom";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import useUtils from "hooks/useUtils";
import useAdmissions from "containers/private/admissions/useHooks";
import { confirmationPopup } from "utils/helpers/common/alert-service";
import { DataNotFoundMain } from "components/particles/table/data-not-found/style";
import DataNotFound from "components/particles/table/data-not-found";
import { useSelector } from "react-redux";

const LinkMeritList: FC = () => {
  const { getQueryParams } = useUtils();
  const params = getQueryParams();
  const { deleteProgramLinkMerit, getProgramLinkMerits } = useAdmissions();
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });
  const [data, setData] = useState<any[]>([]);
  const [search, setSearch] = useState<string>("");
  const { handleTableSearch, handleSearchChange } = useUtils();
  const columns: string[] = [
    "Title",
    "Eligibility Template",
    "Seq. No.",
    "Action",
  ];
  const { isLoading } = useSelector((state: any) => state.sharedReducer);

  const navigate = useNavigate();

  const goToAddLinkMeritList = () => {
    navigate(
      `${siteRoutes.createProgramLinkMeritList}?program_id=${params?.program_id}&admission_session_id=${params?.admission_session_id}`
    );
  };

  const goToUpdateMeritList = (id: number) => {
    navigate(
      `${siteRoutes.createProgramLinkMeritList}?program_id=${params?.program_id}&id=${id}`
    );
  };

  const handleDelete = async (id: number) => {
    const result = await confirmationPopup();
    if (result.isConfirmed) {
      const queryParams = {
        per_page: pagination.per_page,
        page: 1,
        program_id: params?.program_id,
        admission_session_id: params?.admission_session_id,
      };
      deleteProgramLinkMerit(id, setData, queryParams, setPagination);
    }
  };

  const onPageChange = (pageInfo: { selected: number }) => {
    const { selected: page } = pageInfo;
    setPagination({ ...pagination, page: page + 1 });
    getAllProgramLinkMerits(page + 1, search);
  };

  const getAllProgramLinkMerits = (page: number, search: string) => {
    const queryParams = {
      per_page: pagination.per_page,  
      page,
      search,
      program_id: params?.program_id,
      admission_session_id: params?.admission_session_id,
    };
    getProgramLinkMerits(setData, queryParams, setPagination);
  };

  useEffect(() => {
    getAllProgramLinkMerits(pagination.page, search);
  }, []);

  return (
    <LinkMeritListingMain>
      <LinkMeritListingTop>
        <div className="left">
          <span className="page-heading">Merit Links</span>
          <Breadcrumb />
        </div>
        <div className="right">
          <div className="create-org-btn">
            <button className="lg-rounded-btn" onClick={goToAddLinkMeritList}>
              + Add New
            </button>
          </div>
        </div>
      </LinkMeritListingTop>
      <LinkMeritListingSection className="content-radius-shadow">
        <div className="heading-table">
          <p>{decodeURIComponent(params?.program_title)}</p>
        </div>
        <div className="main-top-cls">
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
                  handleSearchChange(e, setSearch, getAllProgramLinkMerits)
                }
                onKeyUp={(e) => handleTableSearch(e, getAllProgramLinkMerits)}
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
                        <div className="mw-150">{item?.merit?.title}</div>
                      </td>
                      <td>
                        <div className="mw-150">{item?.template?.title}</div>
                      </td>
                      <td>
                        <div className="mw-150">{item?.seq_no}</div>
                      </td>
                      <td>
                        <div className="table-action-icons">
                          <div
                            className="action-icon"
                            onClick={() => goToUpdateMeritList(item?.id)}
                          >
                            <EditTableSvg />
                          </div>

                          <div
                            className="action-icon"
                            onClick={() => handleDelete(item?.id)}
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
          <div className="bottom-pagination">
            <Fragment>
              <DataNotFound show={!isLoading && !data.length} />
              <Pagination {...pagination} onPageChange={onPageChange} />
            </Fragment>
          </div>
        </div>
      </LinkMeritListingSection>
    </LinkMeritListingMain>
  );
};

export default LinkMeritList;
