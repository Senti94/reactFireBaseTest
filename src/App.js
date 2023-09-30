import { useEffect, useState } from "react";
import Auth from "./components/auth";
import { db,auth,storage } from "./config/firebase";
import { getDocs,collection,addDoc,deleteDoc,doc,updateDoc  } from "firebase/firestore";
import "./App.css";
import { ref,uploadBytes } from "firebase/storage"; 
function App() {
  const [movieList,setMovieList]=useState([]);
  const [movieName,setMovieName]=useState("");
  const [rDate,setRdate]=useState("");
  const [wonOscar,setWonOscar]=useState(false);
  const [upTitle,setUpTitle]=useState("");
  const [fileUp,setFileUp]=useState(null);
  
  const movieCollectionRef=collection(db,"movies");
  const getMovieList=async ()=>
  {
  try{
      const data= await getDocs(movieCollectionRef);
      const filteredData=data.docs.map((docs)=>({
       ...docs.data(),id:docs.id
      }));
     console.log(filteredData);
     setMovieList(filteredData);
     }
catch(err)
{
 console.log(err);
}
};

  useEffect(()=>
  {getMovieList()}
    );
    const addMovie=async ()=>
      {
        try{
          await addDoc(movieCollectionRef,{
            title:movieName,
            releaseDate:rDate,
            receivedAnOscar:wonOscar,
            userId:auth?.currentUser?.uid,
          })
         getMovieList();
        }
        catch(err)
        {
          console.log(err);
        }
      }
    const delMovie=async (id) => {
     const movieDoc=doc(db,"movies",id);
     await deleteDoc(movieDoc);
     getMovieList();
    }
    const updateFun= async (id)=>{
      const movieDoc=doc(db,"movies",id);
      await updateDoc(movieDoc,{title:upTitle});
      getMovieList();
    }  
   const handleUpload=async ()=>
   {
    if(!fileUp) return;
    const filesFolderRef=ref(storage,`projectFiles/${fileUp.name}`);
    try{
      await uploadBytes(filesFolderRef,fileUp);
    }
    catch(err){
        console.error(err);
    }


   }

  return (
    <div>
      <Auth />
      <div>
        <input placeholder="movie name.." onChange={(e)=>setMovieName(e.target.value)} />
        <input placeholder="year... " type="year" onChange={(e)=>setRdate(e.target.value)}/>
        <input type="checkbox" onChange={()=>setWonOscar(!wonOscar)}/>
        <label>Received Oscar?</label>
        <button onClick={addMovie}>Submit Movie</button>
      </div>
      <div>
        {
          movieList.map((movie)=>(
            <div key={movie.id} className="movies">
              <h1>{movie.title}</h1>
              <p>Date: {movie.releaseDate}</p>
              <p>Oscars: {movie.receivedAnOscar?"Yes":"No"}</p>
              <button onClick={()=>delMovie(movie.id)}>Delete</button>
              <input onChange={(e)=>setUpTitle(e.target.value)}/>
              <button onClick={()=>updateFun(movie.id)}>Update</button>
            </div>
          ))
        }
      </div>
      <div className="movies">
        <input type="file" onChange={(e)=>setFileUp(e.target.files[0])}/>
        <button onClick={handleUpload}>Upload</button>
      </div>
    </div>
  );
}

export default App;
