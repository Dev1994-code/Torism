const MyCard = (Props) => {
  const { title, img, description } = Props;
  return (
    <div className="rounded-xl ml-16">
      <div className="img">
        <img src={img} alt="" />
      </div>
      <h4>{title}</h4>
      <p>{description}</p>
    </div>
  );
};

export default MyCard;
