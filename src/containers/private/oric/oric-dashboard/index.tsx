import { FC } from "react";
import {
  FDContentSection,
  FDTopSection,
  FinanceDashboardMain,
  HeadlineCard,
  HeadlineCards,
  FilterSection,
  MainStatCard,
  MainStatCards,
} from "./style";
import Breadcrumb from "components/particles/breadcrumb";
import {
  DummyHeadlineGraphSvg,
  GreenFileBgSvg,
} from "assets/images/finance/svgs";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  ArcElement,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
} from "chart.js";
import { siteRoutes } from "utils/helpers/enums/routes.enum";

ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

interface OricDashboardProps {}

const OricDashboard: FC<OricDashboardProps> = ({}) => {
  const data1 = [12, 19, 3, 5, 2, 3, 8, 10, 6, 7]; // Data for the first bar
  const data2 = [15, 10, 6, 4, 3, 2, 5, 9, 4, 6]; // Data for the second bar
  const data3 = [8, 14, 7, 3, 5, 6, 9, 12, 5, 4]; // Data for the third bar
  const data4 = [10, 12, 3, 12, 15, 16, 19, 12, 15, 14]; // Data for the third bar

  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
  ];
  const lineLabels = [
    "01-12-2020",
    "02-12-2020",
    "03-12-2020",
    "04-12-2020",
    "05-12-2020",
    "06-12-2020",
  ];

  const lineChartData = {
    labels: lineLabels, // Use newLabels for the line chart
    datasets: [
      {
        label: "",
        data: data2,
        backgroundColor: "#128B9B",
        borderColor: "#128B9B",
        borderWidth: 1,
      },
    ],
  };
  const lineChartTwo = {
    labels: lineLabels, // Use newLabels for the line chart
    datasets: [
      {
        label: "",
        data: data4,
        backgroundColor: "#FF4B4A",
        borderColor: "#FF4B4A",
        borderWidth: 1,
      },
      {
        label: "",
        data: data2,
        backgroundColor: "#128B9B",
        borderColor: "#128B9B",
        borderWidth: 1,
      },
    ],
  };

  const chartData = {
    labels,
    datasets: [
      {
        label: "",
        data: data1,
        backgroundColor: "##69BDD3",
        borderColor: "#69BDD3",
        borderWidth: 1,
      },
    ],
  };
  const chartDataTwo = {
    labels,
    datasets: [
      {
        label: "",
        data: data2,
        backgroundColor: "#78DA5F",
        borderColor: "#78DA5F",
        borderWidth: 1,
      },
    ],
  };
  const chartDataThree = {
    labels,
    datasets: [
      {
        label: "",
        data: data2,
        backgroundColor: "#00BCD4",
        borderColor: "#00BCD4",
        borderWidth: 1,
      },
    ],
  };
  const pieChartData = {
    labels: [],
    datasets: [
      {
        label: "",
        data: [12, 19, 3, 5, 2, 3, 10], // Your data values here
        backgroundColor: ["#718EBF", "#69BDD3", "#FFCC85", "#90D67F"],
        borderColor: ["#718EBF", "#69BDD3", "#FFCC85", "#90D67F"],
        borderWidth: 1,
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
    cutout: "50%", // This makes the pie chart a donut chart
  };
  const breadcrumbsLink = [
    { title: "ORIC /", path: "" },
    { title: "Dashboard", path: siteRoutes.oricDashboard },
  ];

  return (
    <FinanceDashboardMain>
      <FDTopSection>
        <div className="heading">
          <span className="page-heading">Dashboard</span>
          <Breadcrumb links={breadcrumbsLink} />
        </div>
      </FDTopSection>

      <FDContentSection>
        <HeadlineCards>
          {[1, 1, 1, 1, 1, 1].map((card: any, index: number) => {
            return (
              <HeadlineCard key={index}>
                <div className="header">
                  <div className="file-icon">
                    <GreenFileBgSvg />
                  </div>
                  <div className="title">Publications</div>
                </div>

                <div className="lower-part">
                  <div className="stats">
                    <span className="total">122,123,467</span>
                    <span className="percentage">52%</span>
                  </div>
                  <div className="graph">
                    <DummyHeadlineGraphSvg />
                  </div>
                </div>
              </HeadlineCard>
            );
          })}
        </HeadlineCards>

        <div className="line-graph-container">
          {/* line-graph*/}
          <MainStatCards>
            <MainStatCard>
              <div className="header-section">
                <div className="title">
                  <span>Publications </span>
                </div>
              </div>

              <div className="">
                <Line data={lineChartData} options={options} />
              </div>
            </MainStatCard>
          </MainStatCards>
          {/* bar graph-1*/}
          <MainStatCards>
            <MainStatCard>
              <div className="header-section">
                <div className="title">
                  <span>MoU’s</span>
                </div>
              </div>

              <div className="chart-section">
                <Bar data={chartData} options={options} />
              </div>
            </MainStatCard>
          </MainStatCards>
        </div>
        <div className="line-graph-container">
          {/* bar graph-1*/}
          <MainStatCards>
            <MainStatCard>
              <div className="header-section">
                <div className="title">
                  <span>MoU’s</span>
                </div>
              </div>

              <div className="chart-section">
                <Bar data={chartDataTwo} options={options} />
              </div>
            </MainStatCard>
          </MainStatCards>
          {/* line-graph*/}
          <MainStatCards>
            <MainStatCard>
              <div className="header-section">
                <div className="title">
                  <span>Conferences </span>
                </div>
              </div>

              <div className="">
                <Line data={lineChartTwo} options={options} />
              </div>
            </MainStatCard>
          </MainStatCards>
        </div>
        <div className="line-graph-container">
          {/* pie-graph*/}
          <MainStatCards>
            <MainStatCard>
              <div className="header-section">
                <div className="title">
                  <span>Standard KPI’s</span>
                </div>
              </div>

              <div className="pie-chart-section">
                <Pie data={pieChartData} options={options} />
              </div>
            </MainStatCard>
          </MainStatCards>
          {/* bar graph-2*/}
          <MainStatCards>
            <MainStatCard>
              <div className="header-section">
                <div className="title">
                  <span>KPI’s Achieved</span>
                </div>
              </div>

              <div className="chart-section">
                <Bar data={chartDataThree} options={options} />
              </div>
            </MainStatCard>
          </MainStatCards>
        </div>
      </FDContentSection>
    </FinanceDashboardMain>
  );
};

export default OricDashboard;
