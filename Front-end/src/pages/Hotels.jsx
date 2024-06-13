import { Card, List } from "antd";

const data = [
  {
    id: 1,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2DkO8pxDZiKXfh3REWOfMH41q6DBwhE5VkMSwotBT6Q&s",
    title: "Central Hotel hawassa",
    description:
      "Offering a spa center and sauna, Central Hawassa Hotel is situated in Hawassa. The hotel has an outdoor pool and views of the mountain, and guests can enjoy a meal at the restaurant or a drink at the bar. Free Wi-Fi is featured and free private parking is available on site.",
  },
  {
    id: 2,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTraDBdSzBNSNsjFWrbM5CLs-4oaaVUALEGoc8msOaVA&s",
    title: "Rori Hotel Hawassa",
    description:
      "Rori Hotel is a brand new hotel located in the heart of Hawassa, Sidama, Ethiopia. The hotel is located close to Hawassa International stadium and Hawassa University. https://rorihotel.com",
  },
  {
    id: 3,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtzpeeI7mvvylw-1jIjmBNkS45Xww2bMq5F4LU6rWRfw&s",
    title: "Aregash Lodge Yirgalem",
    description:
      "Nestled between coffee fields and lush vegetation in Yirgalem town Aregash Lodge is a peaceful heaven for those who seek relaxation and a welcome break. It is an excellent Ethiopian lodge, and a perfect stopover between Yabello and Addis.",
  },
  {
    id: 4,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtz_kHKS7w9IGyuIvCIP8zXwvlIQq1x-j_T43I3MjfCg&s",
    title: "Gezahegne and Elifnesh Hotel and Resorts",
    description:
      "Gezahegn & Elfnesh Hotels & Resorts, which  found in Hawassa offers a luxurious bungalow style guest rooms; attractive and impressing swimming pool with swim up bar; all day and specialty restaurant and bar.",
  },
  {
    id: 5,
    img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/61/6d/dc/lewi-hotels-resorts.jpg?w=700&h=-1&s=1",
    title: "Lewi Resort Hawassa",
    description:
      "Located in Hawassa, 15 km from Hawassa Airport, Lewi Resort and Spa provides accommodations with a restaurant, free private parking, free bikes and a fitness center.",
  },
  {
    id: 6,
    img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/05/56/f6/6e/south-star-international.jpg?w=700&h=-1&s=1",
    title: "South Star international hotel",
    description:
      "Approximately 11 km from Hawassa (AWA) airport, the 4-star South Star International Hotel offers steam baths, a wellness area and a sauna. It contains 114 non-smoking rooms that strike a perfect balance between comfort and style.",
  },
  {
    id: 7,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSET99Qv4rLaIZEp__iSJtFIfvTu9tTqUC-JDdbQJpGLw&s",
    title: "Haile Resort-Hawassa",
    description:
      "Found in the capital city of Sidama Region, Hawassa, the resort is located on the shores of Lake Hawassa with a spectacular view that blends the rich mosaic cultural with the area warm hospitality. https://www.hailehotelsandresorts.com/hawassa-resort",
  },
];

const Hotels = () => {
  return (
    <div>
      <h2 className="mx-20">Find your best destination</h2>
      <div className="my-10 mx-20">
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 1,
            md: 2,
            lg: 2,
            xl: 3,
            xxl: 3,
          }}
          dataSource={data}
          renderItem={(item) => (
            <List.Item className="mx-10">
              <Card
                hoverable
                cover={
                  <img
                    src={item.img}
                    alt={item.name}
                    style={{ width: "600px", height: "300px" }}
                  />
                }
              >
                <Card.Meta title={item.title} description={item.description} />
              </Card>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};
export default Hotels;
