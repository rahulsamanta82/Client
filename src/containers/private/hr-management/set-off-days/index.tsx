import { FC, Fragment, useState } from "react";
import {
  DeleteTableSvg,
  EditTableSvg,
  ExcelSvg,
  PdfSvg,
  SearchFieldSvg,
} from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import Breadcrumb, { BreadcrumbLink } from "components/particles/breadcrumb";
import { SetOffDaysMain, SetOffDaysTop } from "./style";

import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { useNavigate } from "react-router-dom";
import DataNotFound from "components/particles/table/data-not-found";

const SetOffDays: FC = () => {
  const [search, setSearch] = useState<string>("");
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });
  const columns: string[] = ["Name", "Action"];

  const breadcrumbLinks: BreadcrumbLink[] = [
    { title: "HR Management / ", path: siteRoutes.hrManagementLeaveDashboard },
    {
      title: "Set Off Days",
      path: siteRoutes.setOffDays,
    },
  ];
  const navigate = useNavigate();

  const [openSetting, setOpenSetting] = useState<boolean>(false);

  const goToSettings = () => {
    setOpenSetting(true);
  };

  const Days = [
    { id: 1, name: "Monday" },
    { id: 2, name: "Tuesday" },
    { id: 3, name: "Wednesday" },
    { id: 4, name: "Thursday" },
    { id: 5, name: "Friday" },
    { id: 6, name: "Saturday" },
    { id: 7, name: "Sunday" },
  ];

  const [selectedDay, setSelectedDay] = useState(null);

  const handleDayClick = (day: any) => {
    setSelectedDay(day.id); // Store the id of the selected day
  };

  return (
    <SetOffDaysMain>
      <SetOffDaysTop>
        <div className="left">
          <span className="page-heading">Set Off Days</span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
      </SetOffDaysTop>

      <div className="content-radius-shadow">
        <div className="days-main">
          {Days?.map((item) => {
            const isSelected = selectedDay === item.id;
            return (
              <div
                key={item.id}
                className={`days-name ${
                  isSelected ? "days-name-selected" : ""
                }`}
                onClick={() => handleDayClick(item)}
              >
                {item.name}
              </div>
            );
          })}
        </div>
      </div>
    </SetOffDaysMain>
  );
};

export default SetOffDays;
