import React, { Suspense } from "react";
import "./Listpage.scss";
import { listData } from "../../lib/dummydata";
import Filter from "../../components/Filter/Filter";
import Card from "../../components/Card/Card";
import Map from "../../components/Map/Map";
import { Await, useLoaderData } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
const Listpage = () => {
  const data = useLoaderData();
  return (
    <>
      <div className="listPage h-full">
        <div className="listContainer overflow-auto h-full">
          <Filter />
          <Suspense fallback={<Loading />}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading properties.....</p>}
            >
              {(postResponse) => (
                <div className="wrapper mt-5 h-full pb-11">
                  {postResponse.data.map((item) => (
                    <Card key={item.id} item={item} />
                  ))}
                </div>
              )}
            </Await>
          </Suspense>
        </div>
        <div className="mapContainer">
          <Suspense fallback={<p>Loading Map..</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading properties.....</p>}
            >
              {(postResponse) => <Map item={postResponse.data} />}
            </Await>
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default Listpage;
