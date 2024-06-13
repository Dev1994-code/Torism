import "../assets/custom.css";

const StGabriel = () => {
  return (
    <>
      <div className="stGabriel mt-12">
        <h1 className="absolute bottom-0 left-0 text-white p-4">
          St.Gabriel Church
        </h1>
      </div>
      <div className="container mx-auto py-8">
        <div className="flex flex-col sm:flex-row gap-10">
          <div className="w-full md:w-2/3">
            <h1 className="text-3xl font-bold mb-4">
              St.Gabriel Annual Festival
            </h1>
            <p className="text-gray-700 mb-8 text-xl">
              Ethiopia is a land of religious people. Almost 97% of the
              population have a religion. From the dominant religion in the
              country; the Ethiopian Orthodox Church is one of the big and
              ancient religions of the country. The church calendar has many
              outdoor annual religious events. From those days laities of the
              Ethiopian Orthodox Church celebrate the annual St. Gabriel day in
              spectacular and exuberant fashion. There are two main places that
              are very well known with the celebration of the annual St.Gabriel
              day. Kulbi St. Gabriel in eastern Ethiopia and Hawassa St.Gabriel
              Church in Hawassa. The annual celebration of the Arc Angel looked
              two times in a year. One in December and the other are in July.
              The city of Hawassa hosts hundred thousand believers from various
              parts of Ethiopia during the two periods
            </p>
          </div>
          <div className="w-full md:w-1/3">
            <img
              src="https://pbs.twimg.com/media/DvejdclVYAADiBE.jpg"
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
export default StGabriel;
