import { FC, Fragment, useEffect, useState } from "react";
import {
  SectionRoomsListingSection,
  SectionRoomsListingMain,
  SectionRoomsListingTop,
} from "./style";
import Breadcrumb, { BreadcrumbLink } from "components/particles/breadcrumb";
import {
  DeleteTableSvg,
  DownArrowLightgrayMediumSvg,
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
import useUtils from "hooks/useUtils";
import AddRooms from "./components/add-rooms";

interface AcademicSectionsListingProps { }

const SectionRooms: FC<AcademicSectionsListingProps> = ({ }) => {
  const breadcrumbLinks: BreadcrumbLink[] = [
    { title: "Academics / ", path: siteRoutes.academicSessionListing },
    { title: "Sections /", path: siteRoutes.academicSectionsListing },
    { title: "Rooms", path: siteRoutes.academicSectionRoomsListing },
  ];
  const navigate = useNavigate();

  // const { getAcademicCourseInfos, deleteAcademicCourseInfo } = useFinance();

  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });
  const [search, setSearch] = useState<string>("");
  const columns: string[] = ["Room No", "Section", "Action"];

  const { hasAccess } = useStore();
  const { handleSearchChange, handleTableSearch } = useUtils();

  const goToCreate = () => {
    navigate(siteRoutes.createAcademicSection);
  };

  const onPageChange = (pageInfo: { selected: number }) => {
    const { selected: page } = pageInfo;
    setPagination({ ...pagination, page: page + 1 });
  };
  const [addRoomsModal, setAddRoomsModal] = useState<boolean>(false);

  const openRoomModal = () => {
    setAddRoomsModal(true);
  };

  return (
    <SectionRoomsListingMain>
      <SectionRoomsListingTop>
        <div className="left">
          <span className="page-heading">Rooms Listing</span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
        <div className="right">
          {hasAccess(sitePermissions.createAcademicCourse) && (
            <div className="create-fine-slot-btn" onClick={openRoomModal}>
              <button className="lg-rounded-btn">+ Add Room</button>
            </div>
          )}
        </div>
      </SectionRoomsListingTop>

      <SectionRoomsListingSection className="content-radius-shadow">
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
            <input type="search" placeholder="Search" value={search} />
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
              {[1, 1, 1, 1, 1, 1, 1].map((bank, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <div className="mw-150">43234</div>
                    </td>
                    <td>
                      <div className="mw-100">BSPAKS-0690</div>
                    </td>

                    <td>
                      <div className="table-action-icons">
                        <div className="action-icon">
                          <EditTableSvg />
                        </div>

                        <div className="action-icon">
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
          {/* <DataNotFound show={!isLoading && !data.length} /> */}
          <Pagination {...pagination} onPageChange={onPageChange} />
          {addRoomsModal && <AddRooms setOpen={setAddRoomsModal} />}
        </Fragment>
      </SectionRoomsListingSection>
    </SectionRoomsListingMain>
  );
};

export default SectionRooms;
