import Image from "next/image";

import starIcon from '@public/star.svg'
import { Nav } from "@components/commons/Nav";
import { useSession } from "next-auth/react";


export default function Rooms({allRooms}){

  const session = useSession();
   console.log(allRooms);

   return(
      <div>
        <Nav pageName={"Pokoje"} />
        <section className="room_list">
          {allRooms.map(room =>{
            const imgSrc = `http://localhost:3000/uploaded/${room.image}`;

            return(
              <div key={room._id} className="room_item">
                  <div className="room_image">
                      <Image loader={() => imgSrc} src={imgSrc} alt="zdjęcie pokoju" width={"100%"} height={"100%"}/>
                  </div>
                  <div className="room_info">
                      <h3>{room.name}</h3>
                      <section className="room_infoDetails">
                          <div className="room_rating">
                              <div className="room_rating_rat_wr">
                                <span className="room_rating_number">{room.rating}</span>
                                <Image src={starIcon} alt="GWIADA" width={"20px"} height={"20px"}/>
                              </div>
                              <span className="room_rating_count">{room.opinionsCount}</span>
                              <span>opini</span>
                          </div>
                          <div className="room_max">max {room.maxCount}-osobowy</div>
                          <div className="bottom_info">
                            <span className="room_type">{room.type}</span>
                            <span className="room_price">{room.cost} zł</span>
                          </div>      
                      </section>
                  </div>
              </div>
            )
          })}
        </section>
      </div>
   )
}

export const getServerSideProps = async () => {
   const res = await fetch("http://localhost:3000/api/rooms", {
     method: "GET",
     headers: {
       "Content-Type": "application/json",
     },
   });
  
   const allRooms = await res.json();
 
   return {
     props: {
       allRooms: allRooms.data,
     },
   };
 
 };
 