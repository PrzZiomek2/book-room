import Image from "next/image";

import starIcon from '@public/star.svg'
import { Nav } from "@components/commons/Nav";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Loader } from "@components/commons/Loader";


export default function Rooms(){

   const [roomsList, setRoomsList] = useState([]);

   const getRoomsList = async () => {
      const res = await fetch("http://localhost:3000/api/rooms", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
     
      const allRooms = await res.json();

      setRoomsList(allRooms.data);
    };

   useEffect(() => {
      getRoomsList();
   }, []);

   const deleteRoom = async (id) =>{
      const res = await fetch(`http://localhost:3000/api/${id}`, {
         method: "DELETE",
      })
      .catch(err => console.log("error when deleting room", err));

      const resJson = await res.json(); 

      if(resJson.data.deletedCount){
         getRoomsList();
      }
  };

   return(
      <div>
        <Nav pageName={"Pokoje"} />
       {roomsList.length ? 
         <section className="room_list">
            {roomsList.map(room =>{
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
                     <div className="room-actions">
                     <Link aria-current="page" href={`edit/${room._id}`}>Edytuj</Link>
                     <a onClick={() => deleteRoom(room._id)}>Usuń</a>
                     </div>
               </div>
               )
            })}
         </section> : <Loader />}
      </div>
   )
}


 