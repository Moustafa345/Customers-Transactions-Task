const Skeleton = [1, 2, 3, 4, 5, 6, 7, 8];

const Loading = () => {
  return (
    <>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <div className="mb-10 m-2 animate-pulse">
          <p className=" bg-gray-300 w-1/6 h-3 md:h-6 rounded-2xl mb-3"></p>
          <p className=" bg-gray-300 w-3/6 h-6 md:h-10 rounded-2xl"></p>
        </div>
        <div className="m-2 animate-pulse">
        {Skeleton.map((item) => (
          <p key={item} className=" bg-gray-300 w-full h-8 md:h-12 rounded-2xl mb-2"></p>
        ))}
        </div>
      </div>
    </>
  );
};

export default Loading;
