import "../assets/custom.css";

const HawassaCity = () => {
  return (
    <>
      <div className="loginBg mt-12">
        <h1 className="absolute bottom-0 left-0 text-white p-4">
          Hawassa City
        </h1>
      </div>
      <div className="container mx-auto py-8">
        <div className="flex gap-5">
          <div className="w-full md:w-2/3">
            <h1 className="text-3xl font-bold mb-4">History</h1>
            <p className="text-gray-700 mb-8 text-xl">
              Perfectly poised at Lake Hawasa’s edge, the capital of the Sidama
              regional state is large, modern, well organized, and a bit of a
              shock to the system for those who’ve been slogging it through the
              Omo valley for a long time. A distance of 275 km from Addis Ababa
              It is bounded by Lake Hawassa on the west and north-west,
              Chelelaka swampy area on the east and south-east, Tikur Wuha River
              on the north, and Alamura Mountain on the south. Hawassa was
              founded in 1960 by Ras Mangesha Seyoum under the permission of
              Emperor Haile Selassie. In 1961, 404 pensioned soldiers, as well
              as their families, were provided with plots of land to settle in
              the eastern part of the town. This is reckoned to have given an
              impetus to the growth and development of the town. From 1960-1968,
              Hawassa served as the capital of a sub-administration of Yabella
              wereda, and it was designated the capital of the then Sidamo
              province in 1968.
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
          <div className="w-full md:w-1/2 lg:w-1/3">
            <h1 className="text-3xl font-bold mb-4">Religion</h1>
            <p className="text-gray-700 mb-8 text-xl">
              52.71% of the population said they were Protestants, 39.99%
              practiced Ethiopian Orthodox Christianity, 7.30% were Muslim and
              3.78% embraced Catholicism.[14] The Latin Catholic minority is
              pastorally served by the missionary Apostolic Vicariate of Awasa,
              which has its Cathedral of Kidane-Meheret here.
            </p>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 mb-4">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/St_Gabriel_Church_Awasa.jpg/1024px-St_Gabriel_Church_Awasa.jpg"
              alt="City Image"
              className="w-full rounded-lg"
            />
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 mb-4">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHwiJ4uobojMlKQYoarodbmPM_kZds8Eas5JcE1CP9FKgyrwDJr_uwebrWGQ&s"
              alt="City Image"
              className="w-full rounded-lg"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto py-8">
        <div className="flex  gap-5">
          <div className="w-full md:w-1/2 lg:w-2/3">
            <h1 className="text-3xl font-bold mb-4">Climate</h1>
            <p className="text-gray-700 mb-8 text-xl">
              Hawassa has a tropical savanna climate (Köppen Aw) though it
              borders on a subtropical highland climate (Köppen Cwb). There are
              two seasons: a lengthy though not intense wet season from March to
              October and a short dry season from November to February. The
              extra cloudiness of the wet season is sufficient to make it
              substantially cooler than the dry season despite a higher sun
              angle; however, the coolest morning temperatures, often close to
              freezing, occur during the dry season.
            </p>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 mb-4">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Awasa_outskirts.JPG/1024px-Awasa_outskirts.JPG"
              alt="City Image"
              className="w-full rounded-lg"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HawassaCity;
