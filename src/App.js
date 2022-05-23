import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import * as XLSX from 'xlsx';
import CompanyType from './components/CompanyType';
import DataBase  from "./components/DataBase";
import './App.css';

const fileName = "./programmertest2022.xlsx"

function App() {
  const[fileName, setFileName] = useState(null);
  const[jsonData, setJsonData] = useState([]);
  const[searchResult, setSearchResult] = useState("");
  const[lang, setLang] = useState("");
  // const[FormLinks, setFormLinks] = useState(false);
  const[index, setIndex] = useState(null);

  useEffect(()=>{},[jsonData])
  // const showFormLinks = () => setFormLinks(!FormLinks) 

  var data;
  const handleFile = async (e) => {
    const file = e.target.files[0];
    //const reader = new FileReader();
    setFileName(file.name);

    data = await file.arrayBuffer();
    const workbook = XLSX.read(data);

    const worksheet = workbook.Sheets[workbook.SheetNames[0]]
    setJsonData(XLSX.utils.sheet_to_json(worksheet));
    console.log(workbook)
    console.log(typeof(jsonData))
  };

  // useEffect(()=>{
  //   handleFile()
  // },[])
  return (    
    <Router>
      <Routes>
        <Route path='/' exact element ={(<> <div className="App">
          <h1> AMF Application Forms </h1>
          <input type="file" onChange={handleFile} /> 
            {jsonData && <div>
              <div className="searchLine">
                <input type="text" className="searchBox" placeholder="Find company type... " onChange={e=> {setSearchResult(e.target.value)}}></input>
                <span onChange={e=> {setLang(e.target.value); setIndex(null);}}>
                  <input className="radio" type="radio" id="english" name="lang" value="E"></input>
                  <label htmlFor="english">E</label>
                  <input className="radio" type="radio" id="french" name="lang" value="F"></input>
                  <label htmlFor="french">F</label>
                </span>
              </div>
              {/* {console.log(lang)} */}
              {jsonData.filter(data=>{
                if(lang !== ""){ 
                  return data["Language"] === lang; 
                }else{ 
                  return true;
                }          
              }).filter(data => {
                if(searchResult === ""){
                    return data;
                }else if(data["Description of Risk"].toLowerCase().includes(searchResult.toLocaleLowerCase())){
                    return data;
                }
              }).map((row,key)=>{
                    return <div style={{ cursor: "pointer"}}key={key}><p className="company" onClick={()=>setIndex(index === key ? null: key )}>{row["id"]}. {row["Description of Risk"]}</p>
                    {key === index && <CompanyType typeName={row}></CompanyType>}
                    </div>} 
              )}
              </div>}
              </div></>)} />
          <Route path='/DataBase' element={<DataBase/>}></Route>
      </Routes>
    </Router>    
  );
}

export default App;
