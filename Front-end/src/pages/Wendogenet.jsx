import "../assets/custom.css";
export const Wendogenet = () => {
  return (
    <>
      <div className="wendoBg mt-12">
        <h1 className="absolute bottom-0 left-0 text-white p-4">Wendogenet</h1>
      </div>
      <div className="container mx-auto py-8">
        <div className="flex gap-5">
          <div className="w-full md:w-2/3">
            <h1 className="text-3xl font-bold mb-4">History</h1>
            <p className="text-gray-700 mb-8 text-xl">
              Wondo Genet (also transliterated Wendo Genet) is a resort town in
              Ethiopia located southeast of Shashemene in the Sidama Region with
              an elevation of 1723 meters.Based on figures from the Central
              Statistical Agency of Ethiopia published in 2005, Wondo Genet has
              an estimated total population of 5,792 consisting of 2,857 men and
              2,935 women.[2] The 1994 census reported this town had a total
              population of 3,197 of whom 1,582 were males and 1,615 were
              females. It is the main town in Wondo Genet woreda.
            </p>
          </div>
          <div className="w-full md:w-1/3 mb-4 h-3/6">
            <img
              src="https://cdn.pixabay.com/photo/2023/12/01/21/50/sunset-8424565_1280.jpg"
              alt="City Image"
              className="w-full h-auto rounded-lg"
              style={{ maxWidth: "400px" }}
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto py-8">
        <div className="flex gap-5">
          <div className="w-full md:w-2/3">
            <h1 className="text-3xl font-bold mb-4">Hotsprings</h1>
            <p className="text-gray-700 mb-8 text-xl">
              Wondo Genet is known for its hot springs and is surrounded by
              primary Ethiopian forests. It is home to an arboretum and a
              College of Forestry which was founded in 1977 with Swedish
              assistance.[3] Also located in this resort town is the Essential
              Oils Research Sub Center, where spices, aromatic and medicinal
              plants are conserved and their qualities researched
            </p>
          </div>
          <div className="w-full md:w-1/3 mb-4 h-3/6">
            <img
              src="http://photos.wikimapia.org/p/00/02/67/00/57_960.jpg"
              alt="City Image"
              className="w-full h-auto rounded-lg"
              style={{ maxWidth: "400px" }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Wendogenet;
