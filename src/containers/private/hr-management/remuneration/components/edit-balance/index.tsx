import { FC, Fragment, useState } from "react";
import {
  SelectEmployeMain,
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

interface SelectEmployeProps {
  setOpen: Function;
  id?: number;
}

const SelectEmploye: FC<SelectEmployeProps> = ({ setOpen }) => {
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
  const columns: string[] = ["", "Name", "Designation"];

  return (
    <SelectEmployeMain>
      <Container>
        <ContentWrapper className="p-custom-scrollbar-8">
          <div className="header">
            <div className="empty"></div>
            <div className="heading">
              <span>Edit Balance</span>
            </div>
            <div className="close-icon cp" onClick={handleCloseModal}>
              <CloseMediumSvg className="icon" />
            </div>
          </div>
          <form>
            <div className="common-fields">
              <div className="input-field">
                <label>Remuneration Type</label>
                <div className="field-wrap">
                  <div className="field">
                    <select name="" id="">
                      <option value="">Select</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="radio-field">
                <label>Rate</label>
                <div className="field-wrap">
                  <div className="field">
                    <label htmlFor="is-active-yes">Full Rate</label>
                    <input type="radio" />
                  </div>
                  <div className="field">
                    <label htmlFor="is-active-no">Half Rate</label>
                    <input type="radio" />
                  </div>
                  <div className="field">
                    <label htmlFor="is-active-no">Quarter Rate</label>
                    <input type="radio" />
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label>Months </label>
                <div className="field-wrap">
                  <div className="field">
                    <select name="" id="">
                      <option value="">January</option>
                    </select>
                  </div>
                </div>
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
                          <td>Lecturer</td>
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

            <div className="action-buttons">
              <div className="buttons">
                <button className="lg-rounded-btn gray" type="reset">
                  Close
                </button>

                <button className="lg-rounded-btn" type="submit">
                  Save & Close
                </button>
              </div>
            </div>
          </form>
        </ContentWrapper>
      </Container>
    </SelectEmployeMain>
  );
};

export default SelectEmploye;
