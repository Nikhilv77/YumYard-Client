import React, { useEffect } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";
import { useSelector, useDispatch } from "react-redux";
import { getAllBurgersAction } from "../../Actions/BurgerActions";
import { getAllSidesAction } from "../../Actions/SidesActions";
import { getAllIndianMealsActions } from "../../Actions/IndianMealsActions";
import { getAllContactsActions } from "../../Actions/ContactActions";
import { getAllFeedbackActions } from "../../Actions/FeedbackActions";
import { getAllOrders } from "../../Actions/OrderAction";
import { getAllUsers } from "../../Actions/UserRegActions";
import { getAllPizzas } from "../../Actions/PizzaAction";
import { getAllBevaragesAction } from "../../Actions/BevarageActions";
import { getAllDonations } from "../../Actions/DonationActions";
import ClipLoader from "react-spinners/ClipLoader";
import { Alert } from "react-bootstrap";
function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllBurgersAction());
    dispatch(getAllSidesAction());
    dispatch(getAllIndianMealsActions());
    dispatch(getAllContactsActions());
    dispatch(getAllFeedbackActions());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
    dispatch(getAllPizzas());
    dispatch(getAllBevaragesAction());
    dispatch(getAllDonations());
  }, [dispatch]);

  const {
    Orders,
    loading: orderLoading,
    error: orderError,
  } = useSelector((state) => state.allOrders);
  const {
    Users,
    loading: userLoading,
    error: userError,
  } = useSelector((state) => state.users);
  const {
    Feedbacks,
    loading: feedbackLoading,
    error: feedbackError,
  } = useSelector((state) => state.Feedbacks);
  const {
    Donations,
    loading: donationLoading,
    error: donationError,
  } = useSelector((state) => state.allDonations);
  const {
    Contacts,
    loading: contactLoading,
    error: contactError,
  } = useSelector((state) => state.Contacts);
  const pizzaState = useSelector((state) => state.pizzas);
  const { pizzas, error: pizzaError, loading: pizzaLoading } = pizzaState;

  const BurgerState = useSelector((state) => state.burgers);

  const { Burgers, error: burgerError, loading: burgerLoading } = BurgerState;
  const MealState = useSelector((state) => state.IndianMeals);
  const { Meals, error: mealError, loading: mealLoading } = MealState;
  const BevarageState = useSelector((state) => state.Bevarages);
  const {
    Bevarages,
    error: bevarageError,
    loading: loadingError,
  } = BevarageState;

  const SidesState = useSelector((state) => state.Sides);
  const { Sides, error: sideError, loading: sideLoading } = SidesState;

  console.log(Sides,"coming from homejs")
  console.log(Bevarages,"coming from homejs")

  const donationAmountArray = 1000
  // Donations.map(
  //   (donation) => donation.donationAmount
  // );
  console.log(donationAmountArray,"coming from home")
  const totalDonationsGenerated = 8000
  // donationAmountArray.reduce(
  //   (Accumulator, donationAmount) => Accumulator + donationAmount,
  //   0
  // );
  const amountArray =2000
  // Orders.map((order) => order.orderAmount);
  // const totalAmountGenerated = amountArray.reduce(
  //   (Accumulator, Amount) => Accumulator + Amount,
  //   0
  // );
  const totalRevenue = totalAmountGenerated;
  const totalDonations = totalDonationsGenerated;
  const totalProducts = 20000
    // pizzas.length +
    // Burgers.length +
    // Bevarages.length +
    // Sides.length +
    // Meals.length;
  const menuCategories = 5;

  // Sample data for the restaurant's main metrics
  const restaurantData = [
    { name: "Orders", value: 15  },//Orders.length
    { name: "Customers", value: 15 }, // Users.length
    { name: "Feedbacks", value:17 },//Feedbacks.length 
    { name: "Contacts", value:22 },//Contacts.length 
    { name: "Donations", value: 27 },//Donations.length 
  ];
console.log(restaurantData,"data from homejs")
  // Data for the pie chart representing the selling of pizzas, burgers, Indian cuisine, beverages, and sides
  const pieChartData = [
    { name: "Pizzas", value: pizzas.length, label: "Pizzas" },
    { name: "Burgers", value: Burgers.length, label: "Burgers" },
    { name: "Indian Cuisine", value: Meals.length, label: "Indian Cuisine" },
    { name: "Bevarages", value: Bevarages.length, label: "Beverages" },
    { name: "Sides", value: Sides.length, label: "Sides" },
  ];

  const feedbackStarsData = [0, 0, 0, 0, 0]; // Initialize an array to store counts for each star rating

  const ratingArray = [5,5,5,5,5,5,5,5,5]
  
  // Feedbacks.map((feedback) => feedback.rating);
  
  for (const rating of ratingArray) {
    feedbackStarsData[rating - 1] += 1; // Increment the count for the corresponding star rating
  }
  
  const feedbackStarsDataFormatted = feedbackStarsData.map((count, index) => ({
    stars: `${index + 1}⭐`,
    count,
  }));
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red"];
  if (orderLoading || userLoading || feedbackLoading || donationLoading || contactLoading || pizzaLoading || burgerLoading || mealLoading || loadingError || sideLoading) {
    return (
      <div className="card-container">
        <div
          style={{ display: "flex", height: "88vh", justifyContent: "center" }}
          className="card"
        >
          <ClipLoader className="m-auto" size={60}></ClipLoader>
        </div>
      </div>
    );
  }
  
  // Add a check for error state before rendering the component
 else if (orderError || userError || feedbackError || donationError || contactError || pizzaError || burgerError || mealError || bevarageError || sideError) {
    return (
      <div className="card-container">
        <div style={{ display: "flex", height: "85vh", justifyContent: "center" }} className="card">
          <Alert className="m-auto"  style={{maxWidth:'300px'}} variant="danger">Something went wrong!</Alert>
        </div>
      </div>
    );
  }

  // Colors for the pie chart
  else if(!orderLoading && !userLoading && !feedbackLoading && !donationLoading && !contactLoading && !pizzaLoading && !burgerLoading &&!mealLoading && !loadingError && !sideLoading)
{
  return (
    <main className="main-container">
      <div className="small-cards">
        {/* Total Revenue Card */}
        <div className="small-card">
          <h5>Total Revenue</h5>
          <p>&#8377;{totalRevenue}</p>
        </div>

        {/* Total Donations Card */}
        <div className="small-card">
          <h5>Total Donations</h5>
          <p>&#8377;{totalDonations}</p>
        </div>

        {/* Total Products Card */}
        <div className="small-card">
          <h5>Total Products</h5>
          <p>{totalProducts}</p>
        </div>

        {/* Additional Info Card */}
        <div className="small-card">
          <h5>Menu Categories</h5>
          <p>{menuCategories}</p>
        </div>
      </div>
      <div className="charts2">
        {/* Stylish Metrics Chart */}
        <div className="chart-card stylish-chart">
          <h4>Metrics</h4>
          <div className="card-inner"></div>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={restaurantData}
              margin={{ top: 5, right: 30, left: 20, bottom: 10 }}
            >
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                interval={0}
                height={70}
                tick={{ fill: "white" }}
              />
              <YAxis tick={{ fill: "white" }} />
              <Tooltip />

              <Bar
                dataKey="value"
                fill="#69c2e8"
                barSize={30}
                radius={[12, 12, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-card">
          <h4>Meals</h4>
          <div className="card-inner"></div>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart width={500} height={300}>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => entry.label}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieChartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-card">
          <h4>Feedback Analysis</h4>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart
              cx="50%"
              cy="50%"
              outerRadius="80%"
              data={feedbackStarsDataFormatted}
            >
              <PolarGrid />
              <PolarAngleAxis dataKey="stars" />
              <Tooltip />
              <Radar
                name="Stars Count"
                dataKey="count"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </main>
  )
}
}

export default Home;
