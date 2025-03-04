import { FC, Fragment, useEffect, useLayoutEffect, useState } from "react";
import {
  AdvertisementListingMain,
  AdvertisementListingSection,
  AdvertisementListingTop,
} from "./style";
import Breadcrumb from "components/particles/breadcrumb";
import {
  DeleteTableSvg,
  ExcelSvg,
  PdfSvg,
  SearchFieldSvg,
  DownloadTableSvg,
} from "assets/images/common/svgs";

import Pagination from "components/particles/table/pagination";
import { useNavigate } from "react-router-dom";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { JobBatchDTO } from "utils/helpers/models/careers/job-batch.dto";
import { useSelector } from "react-redux";
import useCareers from "../../useHooks";
import { confirmationPopup } from "utils/helpers/common/alert-service";

const AdvertisementListing: FC = () => {
  const navigate = useNavigate();
  const { getJobBatches, deleteJobBatch, updateJobBatch } = useCareers();
  const [data, setData] = useState<JobBatchDTO[]>([]);
  const { isLoading } = useSelector((state: any) => state.sharedReducer);
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });
  const [search, setSearch] = useState<string>("");
  const columns: string[] = [
    "BatchTitle",
    "Start Date",
    "End Date",
    "Status",
    "Batch Type",
    "Action",
  ];

  useEffect(() => {
    getAllJobBatchs(pagination.page, search);
  }, []);

  const handleDelete = async (id: number) => {
    const response = await confirmationPopup();
    if (response.isConfirmed) {
      const queryParams = {
        page: 1,
        per_page: pagination.per_page,
      };
      deleteJobBatch(id, setData, queryParams, setPagination);
    }
  };

  const onPageChange = (pageInfo: { selected: number }) => {
    const { selected: page } = pageInfo;
    setPagination({ ...pagination, page: page + 1 });
    getAllJobBatchs(page + 1, search);
  };
  const getAllJobBatchs = (page: number, search: string) => {
    const queryParams = {
      per_page: pagination.per_page,
      page,
      search,
    };
    getJobBatches(setData, queryParams, setPagination);
  };

  const goToCreateJobBatch = () => {
    navigate(siteRoutes.createCareerAdvertisement);
  }

  const handleEditIsActive = (batch: JobBatchDTO, index: number) => {
    data[index] = batch;
    setData([...data]);
    updateJobBatch(batch.id, batch);
  }

  return (
    <AdvertisementListingMain>
      <AdvertisementListingTop>
        <div className="left">
          <span className="page-heading">Advertisements</span>
          <Breadcrumb />
        </div>
        <div className="right">
          <div className="create-org-btn">
            <button
              className="lg-rounded-btn"
              onClick={goToCreateJobBatch}
            >
              + Add Advertisement
            </button>
          </div>
        </div>
      </AdvertisementListingTop>

      <AdvertisementListingSection className="content-radius-shadow">
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
            <input type="search" placeholder="Search" />
          </div>
        </div>
        <div className="data-table">
          <table className="bottom-bordered-cells">
            <thead>
              <tr>
                {columns.map((column: string, index: number) => {
                  return <th key={index}>{column}</th>
                })}
              </tr>
            </thead>
            <tbody>
              {data.map((batch, index) => {
                return <tr key={index}>
                  <td>{batch.title}</td>
                  <td>{batch.start_date}</td>
                  <td>{batch.end_date}</td>
                  <td>
                    <div className="table-radio-field">
                      <div className="radio">
                        <input
                          type="radio"
                          name={`is-active-${index}`}
                          id={`is-active-yes-${index}`}
                          checked={batch.is_active == 1}
                          onChange={() => handleEditIsActive({ ...batch, is_active: 1 }, index)}
                        />
                        <label htmlFor='is-active-yes'>Active</label>
                      </div>
                      <div className="radio">
                        <input
                          type="radio"
                          name={`is-active-${index}`}
                          id={`is-active-no-${index}`}
                          checked={batch.is_active == 0}
                          onChange={() => handleEditIsActive({ ...batch, is_active: 0 }, index)}
                        />
                        <label htmlFor='is-active-no'>Non-Active</label>
                      </div>
                    </div>
                  </td>
                  <td>{batch.batch_type == 1 ? 'Teaching' : 'Non-teaching'}</td>
                  <td>
                    <div className="table-action-icons">
                      <div className="action-icon">
                        <DownloadTableSvg />
                      </div>

                      <div className="action-icon" onClick={() => handleDelete(batch.id)}>
                        <DeleteTableSvg />
                      </div>
                    </div>
                  </td>
                </tr>
              })}
            </tbody>
          </table>
        </div>
        <Fragment>
          <Pagination onPageChange={onPageChange} {...pagination} />
        </Fragment>
      </AdvertisementListingSection>
    </AdvertisementListingMain>
  );
};

export default AdvertisementListing;
