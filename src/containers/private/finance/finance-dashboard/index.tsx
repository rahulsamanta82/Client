import { FC } from "react";
import {
  FDContentSection,
  FDTopSection,
  FinanceDashboardMain,
  HeadlineCard,
  HeadlineCards,
  MainStatCard,
  MainStatCards,
} from "./style";
import Breadcrumb from "components/particles/breadcrumb";
import {
  DummyHeadlineGraphSvg,
  GreenFileBgSvg,
} from "assets/images/finance/svgs";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface FinanceDashboardProps {}

const FinanceDashboard: FC<FinanceDashboardProps> = ({}) => {
  const data = [12, 19, 3, 5, 2, 3];
  const labels = ["January", "February", "March", "April", "May", "June"];
  const chartData = {
    labels,
    datasets: [
      {
        label: "Paid",
        data,
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };
  return (
    <FinanceDashboardMain>
      <FDTopSection>
        <div className="heading">
          <span className="page-heading">Dashboard</span>
          <Breadcrumb />
        </div>
      </FDTopSection>

      <FDContentSection>
        <HeadlineCards>
          {[1, 1, 1, 1].map((card: any, index: number) => {
            return (
              <HeadlineCard key={index}>
                <div className="header">
                  <div className="file-icon">
                    <GreenFileBgSvg />
                  </div>
                  <div className="title">TOTAL VOUCHER SERVED</div>
                </div>

                <div className="lower-part">
                  <div className="graph">
                    <DummyHeadlineGraphSvg />
                  </div>
                  <div className="stats">
                    <span className="total">2000</span>
                    <span className="percentage">52%</span>
                  </div>
                </div>
              </HeadlineCard>
            );
          })}
        </HeadlineCards>
        <MainStatCards>
          {[1, 1].map((card: any, index: number) => {
            return (
              <MainStatCard key={index}>
                <div className="header-section">
                  <div className="title">
                    <span>Vouchers</span>
                  </div>
                  <div className="description">
                    Paid/ Pending for payment/ Uploaded, valid & pending
                  </div>
                </div>

                <div className="chart-section">
                  <Bar data={chartData} options={options} />
                </div>
              </MainStatCard>
            );
          })}
        </MainStatCards>
      </FDContentSection>
    </FinanceDashboardMain>
  );
};

export default FinanceDashboard;
