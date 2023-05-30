import ClipLoader from "react-spinners/ClipLoader";


export const Loader = () =>{

   const override = {
      marginTop: "45%",
      borderWidth: "7px"
   }

   return(
      <div className="loader">
         <ClipLoader
            color="#364ca6"
            loading={true}
            cssOverride={override}
            size={60}
            aria-label="Loading Spinner"
            data-testid="loader"
            />
      </div>
   )
}