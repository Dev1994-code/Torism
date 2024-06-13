import { Card, List, Input } from "antd";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Destinations = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_PATH}/package/detail`
      );
      const { data } = response;
      setData(data);
      // console.log("response:", response.data);
    };
    fetchPackages();
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const renderStars = (averageRating) => {
    const stars = [];
    const fullStars = Math.floor(averageRating);
    const halfStars = averageRating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} size={20} color="orange" />);
    }
    if (halfStars) {
      stars.push(<FaStarHalfAlt key="half" size={20} color="orange" />);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} size={20} color="orange" />);
    }
    return stars;
  };

  return (
    <div>
      <h2 className="mx-20">Find your best destination</h2>
      <div className="my-10 mx-20">
        <Input
          placeholder="Search destinations"
          value={searchQuery}
          onChange={handleSearch}
          className="mb-4 border-lime-400 border-2"
        />
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 2,
            lg: 2,
            xl: 3,
            xxl: 4,
          }}
          dataSource={filteredData}
          renderItem={(item) => (
            <List.Item className="gap-10">
              <Link to={`/destination/${item._id}`}>
                <Card
                  hoverable
                  cover={
                    <img
                      src={item.image.url}
                      alt={item.name}
                      style={{ width: "600px", height: "300px" }}
                    />
                  }
                >
                  <Card.Meta
                    title={item.name}
                    description={item.description
                      .split(" ")
                      .slice(0, 30)
                      .join(" ")}
                  />
                  <div className="flex items-center gap-1">
                    <label className="text-lg font-semibold">Rating:</label>
                    {renderStars(item.averageRating)}
                    <span>({item.averageRating})</span>
                  </div>
                </Card>
              </Link>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default Destinations;
