import { FC, Fragment, useState } from "react";
import {
  AddEmployesMain,
  Container,
  ContentWrapper,
  AddEmployesSection,
} from "./style";
import {
  CloseMediumSvg,
  ExcelSvg,
  PdfSvg,
  SearchFieldSvg,
} from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";

interface AddEmployesProps {
  setOpen: Function;
  id?: number;
}

const AddEmployes: FC<AddEmployesProps> = ({ setOpen }) => {
  const handleCloseModal = () => {
    setOpen(false);
  };
  const onPageChange = (pageInfo: { selected: number }) => {
    const { selected: page } = pageInfo;
    setPagination({ ...pagination, page: page + 1 });
  };
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });
  const columns: string[] = ["", "Name"];

  return (
    <AddEmployesMain>
      <Container>
        <ContentWrapper className="p-custom-scrollbar-8">
          <div className="header">
            <div className="empty"></div>
            <div className="heading">
              <span>Select Employees to Overtime </span>
            </div>
            <div className="close-icon cp" onClick={handleCloseModal}>
              <CloseMediumSvg className="icon" />
            </div>
          </div>
          <AddEmployesSection className="content-radius-shadow">
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
                      return <th key={index}>{column}</th>;
                    })}
                  </tr>
                </thead>
                <tbody>
                  {[1, 1, 1, 1].map((item: any, index: number) => {
                    return (
                      <tr key={index}>
                        <td>
                          <input type="checkbox" name="" id="" />
                        </td>
                        <td>Dr Imran Basheer</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <Fragment>
              <Pagination onPageChange={onPageChange} {...pagination} />
            </Fragment>
          </AddEmployesSection>
        </ContentWrapper>
      </Container>
    </AddEmployesMain>
  );
};

export default AddEmployes;
