import { FC, Fragment, useEffect } from "react";
import {
  SuperRoleManagementListingSection,
  SuperRoleManagementListingMain,
  SuperRoleManagementListingTop,
} from "./style";
import { useState } from "react";
import {
  DeleteTableSvg,
  EditTableSvg,
  ExcelSvg,
  PdfSvg,
  SearchFieldSvg,
} from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import { useNavigate } from "react-router-dom";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import Breadcrumb from "components/particles/breadcrumb";
import { useSelector } from "react-redux";
import { confirmationPopup } from "utils/helpers/common/alert-service";
import useStore from "hooks/useStore";
import { sitePermissions } from "utils/helpers/enums/permissions.enum";
import useAdmissions from "../../useHooks";
import { AddMeritFormulaDTO } from "utils/helpers/models/admissions/add-merit-formula.dto";

const MeritListFormulaListing: FC = () => {
  const columns: string[] = ["Title", "Status", "Action"];

  const [data, setData] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const { getMeritFormulas, deleteMeritFormula, updateMeritFormula } =
    useAdmissions();

  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });
  const { hasAccess } = useStore();
  const { isLoading } = useSelector((state: any) => state.sharedReducer);

  const onPageChange = (pageInfo: { selected: number }) => {
    const { selected: page } = pageInfo;
    setPagination({ ...pagination, page: page + 1 });
    getAllMeritFormulas(page + 1);
  };
  const getAllMeritFormulas = (page: number = 1) => {
    const queryParams = {
      per_page: pagination.per_page,
      page,
      search,
    };

    getMeritFormulas(setData, queryParams, setPagination);
  };

  useEffect(() => {
    getAllMeritFormulas();
  }, []);

  const handleSearch = (event: any) => {
    if (event.key === "Enter") {
      getAllMeritFormulas();
    }
  };

  const handleDelete = async (id: number) => {
    const response = await confirmationPopup();
    if (response.isConfirmed) {
      const queryParams = {
        page: 1,
        per_page: pagination.per_page,
      };

      deleteMeritFormula(id, setData, queryParams, setPagination);
    }
  };

  const navigate = useNavigate();

  const goToCreateMeritListFormula = () => {
    navigate(siteRoutes.createMeritListFormula);
  };

  const handleUpdateMeritFormula = (meritFormula: any, index: number) => {
    const { merit, title, is_active, id } = meritFormula;
    data[index] = meritFormula;
    setData([...data]);
    updateMeritFormula(id, { merit, title, is_active } as AddMeritFormulaDTO);
  };

  const goToUpdateMeritFormula = (id: number) => {
    navigate(`${siteRoutes.createMeritListFormula}?id=${id}`);
  };

  return (
    <SuperRoleManagementListingMain>
      <SuperRoleManagementListingTop>
        <div className="left">
          <span className="page-heading">Merit List Formula</span>
          <Breadcrumb />
        </div>
        <div className="right">
          {hasAccess(sitePermissions.createMeritListFormula) && (
            <div className="create-org-btn">
              <button
                className="lg-rounded-btn"
                type="button"
                onClick={goToCreateMeritListFormula}
              >
                + Add Merit
              </button>
            </div>
          )}
        </div>
      </SuperRoleManagementListingTop>

      <SuperRoleManagementListingSection className="content-radius-shadow">
        <div className="flex">
          <div className="table-data-export-buttons">
            {hasAccess(sitePermissions.downloadMeritListFormulaPDF) && (
              <div className="export-btn">
                <span>
                  <PdfSvg className="icon" />
                </span>
                <span className="text">PDF</span>
              </div>
            )}
            {hasAccess(sitePermissions.downloadMeritListFormulaExcel) && (
              <div className="export-btn">
                <span>
                  <ExcelSvg className="icon" />
                </span>
                <span className="text">Excel</span>
              </div>
            )}
          </div>

          <div className="table-search-field">
            <span className="search-icon">
              <SearchFieldSvg className="icon" />
            </span>
            <input
              type="search"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyUp={handleSearch}
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
              {data?.map((item: any, index: number) => {
                return (
                  <tr key={index}>
                    <td>
                      <div className="">{item.title}</div>
                    </td>
                    <td>
                      <div className="table-radio-field">
                        <div className="radio">
                          <input
                            type="radio"
                            name={`is-active-${index}`}
                            id={`is-active-yes-${index}`}
                            checked={item?.is_active == 1}
                            onChange={() =>
                              handleUpdateMeritFormula(
                                { ...item, is_active: 1 },
                                index
                              )
                            }
                          />
                          <label htmlFor={`is-active-yes-${index}`}>
                            De-Active
                          </label>
                        </div>
                        <div className="radio">
                          <input
                            type="radio"
                            name={`is-active-${index}`}
                            id={`is-active-no-${index}`}
                            checked={item?.is_active == 0}
                          />
                          <label htmlFor={`is-active-no-${index}`}>
                            Active
                          </label>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="table-action-icons">
                        {/* {hasAccess(sitePermissions.editMeritListFormula) && (
                                                    <div className="action-icon" onClick={() => goToUpdateMeritFormula(item?.id)}>
                                                        <EditTableSvg />
                                                    </div>
                                                )} */}
                        {hasAccess(sitePermissions.deleteMeritListFormula) && (
                          <div
                            className="action-icon"
                            onClick={() => handleDelete(item?.id)}
                          >
                            <DeleteTableSvg />
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <Fragment>
          <Pagination onPageChange={onPageChange} {...pagination} />
        </Fragment>
      </SuperRoleManagementListingSection>
    </SuperRoleManagementListingMain>
  );
};

export default MeritListFormulaListing;
