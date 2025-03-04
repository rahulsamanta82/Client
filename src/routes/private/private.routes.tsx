import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import OrganizationRoutes from "./organization.routes";
import MainLayout from "components/layout/page-containers/main-layout";
import EportalRoutes from "./eportal.routes";
import DashboardRoutes from "./dashboard.routes";
import HostelRoutes from "./hostel.routes";
import AcademicsRoutes from "./academics.routes";
import AdmissionRoutes from "./admissions.routes";
import FinanceRoutes from "./finance.routes";
import AdministrationRoutes from "./administration.routes";
import CareerRoutes from "./career.routes";
import TestingServicesRoutes from "./testing-services.routes";
import AuthoritiesRoutes from "./authorities.routes";
import QEC from "./qec.routes";
import Library from "./library.routes";
import LegalMatters from "./legal-matters.routes";
import OricRoutes from "./oric.routes";
import HRManagementRoutes from "./hr-management.routes";

const PrivateRoutes: FC = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/organization/*" Component={OrganizationRoutes} />
        <Route path="/dashboard/*" Component={DashboardRoutes} />
        <Route path="/e-portal/*" Component={EportalRoutes} />
        <Route path="/hostel/*" Component={HostelRoutes} />
        <Route path="/academics/*" Component={AcademicsRoutes} />
        <Route path="/admissions/*" Component={AdmissionRoutes} />
        <Route path="/finance/*" Component={FinanceRoutes} />

        <Route
          path="/system-administration/*"
          Component={AdministrationRoutes}
        />
        <Route path="/career/*" Component={CareerRoutes} />
        <Route path="/testing-services/*" Component={TestingServicesRoutes} />
        <Route
          path="/authorities-and-communities/*"
          Component={AuthoritiesRoutes}
        />
        <Route path="/qec/*" Component={QEC} />
        <Route path="/library/*" Component={Library} />
        <Route path="/legal-matter/*" Component={LegalMatters} />
        <Route path="/oric/*" Component={OricRoutes} />
        <Route path="/hr-management/*" Component={HRManagementRoutes} />
      </Routes>
    </MainLayout>
  );
};

export default PrivateRoutes;
