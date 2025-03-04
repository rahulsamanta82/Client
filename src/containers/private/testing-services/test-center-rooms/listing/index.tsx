import { FC, Fragment, useEffect, useState } from "react";
import {
  DeleteTableSvg,
  EditTableSvg,
  ExcelSvg,
  PdfSvg,
  SearchFieldSvg,
} from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import Breadcrumb from "components/particles/breadcrumb";
import {
  TestCenterListingMain,
  TestCenterListingSection,
  TestCenterListingTop,
  FilterSection,
} from "./style";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { useNavigate } from "react-router-dom";
import useTestingServices from "../../useHooks";
import { confirmationPopup } from "utils/helpers/common/alert-service";
import { useSelector } from "react-redux";
import { TestingCenterRoomDTO } from "utils/helpers/models/testing-service/testing-center-room.dto";
import useUtils from "hooks/useUtils";
import DataNotFound from "components/particles/table/data-not-found";
import { TestingCenterDTO } from "utils/helpers/models/testing-service/testing-center.dto";

const CenterRoomListing: FC = () => {
  const columns: string[] = [
    "Room Name",
    "Room No.",
    "Total Seats",
    "Status",
    "Action",
  ];
  const navigate = useNavigate();
  const { getTestingCenterRooms, deleteTestingCenterRoom, getTestingCenterById, updateTestingCenter } = useTestingServices();
  const [data, setData] = useState<TestingCenterRoomDTO[]>([]);
  const [center, setCenter] = useState<TestingCenterDTO>(new TestingCenterDTO());
  const { isLoading } = useSelector((state: any) => state.sharedReducer);
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });
  const [search, setSearch] = useState<string>("");
  const { handleSearchChange, handleTableSearch, getQueryParams } = useUtils();
  const params = getQueryParams();


  useEffect(() => {
    getAllTestingCenterRooms(pagination.page, search);
    getTestingCenterById(params?.id, center, setCenter);
  }, []);
  console.log(data);
  const handleDelete = async (id: number) => {
    const response = await confirmationPopup();
    if (response.isConfirmed) {
      const queryParams = {
        page: 1,
        per_page: pagination.per_page,
      };
      deleteTestingCenterRoom(id, setData, queryParams, setPagination);
    }
  };

  const onPageChange = (pageInfo: { selected: number }) => {
    const { selected: page } = pageInfo;
    setPagination({ ...pagination, page: page + 1 });
    getAllTestingCenterRooms(page + 1, search);
  };
  const getAllTestingCenterRooms = (page: number, search: string) => {
    const queryParams = {
      per_page: pagination.per_page,
      page,
      search,
      test_center_id: params?.id
    };
    getTestingCenterRooms(setData, queryParams, setPagination);
  };

  const goToEditTestingCenterRoom = (id: number) => {
    navigate(`${siteRoutes.createTestingServicesTestCenterRooms}?id=${id}`);
  }

  const goToCreateRoom = (id : number) => {
    navigate(`${siteRoutes.createTestingServicesTestCenterRooms}?test_center_id=${id}`);
  }

  const handleUpdateCenterStatus = (center: TestingCenterDTO) => {
    setCenter({ ...center });
    updateTestingCenter(params?.id, center, false);

  }

  return (
    <TestCenterListingMain>
      <TestCenterListingTop>
        <div className="left">
          <span className="page-heading">Center Rooms</span>
          <Breadcrumb />
        </div>
        <div className="right">
          <div className="create-org-btn">
            <button  onClick={() => goToCreateRoom(params?.id)} className="lg-rounded-btn">
              + Add New
            </button>
          </div>
        </div>
      </TestCenterListingTop>

      <FilterSection className="content-radius-shadow">
        <div className="stats">
          <div className="sats-item">
            <div className="stats-title">Center Name</div>
            <div className="stats-value">
              {center.name}
            </div>
          </div>
          <div className="sats-item">
            <div className="stats-title">Address</div>
            <div className="stats-value">{center.address}</div>
          </div>
          <div className="sats-item">
            <div className="stats-title">City</div>
            <div className="stats-value">{center?.center_cities?.title}</div>
          </div>
          <div className="">
            <div className="stats-title">Status</div>
            <div className="status-value">
              <div className="table-radio-field">
                <div className="radio">
                  <label className="stats-value">Active</label>
                  <input type="radio" checked={center.is_active == 1} onChange={() => handleUpdateCenterStatus({ ...center, is_active: 1 })} />
                </div>
                <div className="radio">
                  <label className="stats-value">Non-Active</label>
                  <input type="radio" checked={center.is_active == 0} onChange={() => handleUpdateCenterStatus({ ...center, is_active: 0 })} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </FilterSection>
      <TestCenterListingSection
        isTableOverflowing={false}
        className="content-radius-shadow"
      >
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
                handleSearchChange(e, setSearch, getAllTestingCenterRooms)
              }
              onKeyUp={(e) => handleTableSearch(e, getAllTestingCenterRooms)}
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
              {data.map((room, index) => {
                return (
                  <tr>
                    <td>{room?.name}</td>
                    <td>--</td>
                    <td>{room?.total_seats}</td>
                    <td>
                      <div className="table-radio-field">
                        <div className="radio">
                          <label htmlFor={`is-specialization-no-${index}`}>
                            Active
                          </label>
                          <input
                            type="radio"
                            name={`is-specialization-${index}`}
                            id={`is-specialization-no-${index}`}
                            checked={room?.is_active === 1}
                            readOnly
                          />
                        </div>
                        <div className="radio">
                          <label htmlFor={`is-specialization-yes-${index}`}>
                            Non-Active
                          </label>
                          <input
                            type="radio"
                            name={`is-specialization-${index}`}
                            id={`is-specialization-yes-${index}`}
                            checked={room?.is_active === 0}
                            readOnly
                          />
                        </div>
                      </div>
                    </td>

                    <td>
                      <div className="table-action-icons">
                        <div className="action-icon" onClick={() => goToEditTestingCenterRoom(room.id)}>
                          <EditTableSvg />
                        </div>
                        <div className="action-icon" onClick={() => handleDelete(room.id)}>
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
            onPageChange={onPageChange}
            {...pagination}
          />
        </Fragment>
      </TestCenterListingSection>
    </TestCenterListingMain>
  );
};

export default CenterRoomListing;
