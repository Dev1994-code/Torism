import "../assets/custom.css";

const Fiche = () => {
  return (
    <>
      <div className="fiche mt-12">
        <h1 className="absolute bottom-0 left-0 text-white p-4">
          Fichee-Chambalaalla, New Year festival of the Sidama people
        </h1>
      </div>
      <div className="container mx-auto py-8">
        <div className="flex flex-col sm:flex-row gap-10">
          <div className="w-full md:w-2/3">
            <h1 className="text-3xl font-bold mb-4">Fichee-Chambalaalla</h1>
            <p className="text-gray-700 mb-8 text-xl">
              Fichee-Chambalaalla is a New Year festival celebrated among the
              Sidama people. According to the oral tradition, Fichee
              commemorates a Sidama woman who visited her parents and relatives
              once a year after her marriage, bringing buurisame, a meal
              prepared from false banana, milk and butter, which was shared with
              neighbours. Fichee has since become a unifying symbol of the
              Sidama people. Each year, astrologers determine the correct date
              for the festival, which is then announced to the clans. Communal
              events take place throughout the festival, including traditional
              songs and dances. Every member participates irrespective of age,
              gender and social status. On the first day, children go from house
              to house to greet their neighbours, who serve them buurisame.
              During the festival, clan leaders advise the Sidama people to work
              hard, respect and support the elders, and abstain from cutting
              down indigenous trees, begging, indolence, false testimony and
              theft. The festival therefore enhances equity, good governance,
              social cohesion, peaceful co-existence and integration among
              Sidama clans and the diverse ethnic groups in Ethiopia.
            </p>
          </div>
          <div className="w-full md:w-1/3">
            <img
              src="https://ich.unesco.org/img/photo/thumb/09289-BIG.jpg"
              alt="City Image"
              className="w-full h-auto rounded-lg hidden md:block"
              style={{ maxWidth: "400px" }}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default Fiche;
