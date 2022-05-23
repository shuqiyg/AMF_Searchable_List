import React, {useState} from 'react';
import { Link } from 'react-router-dom'
import '../App.css';

const handleKeyword = (business)=>{
    if(typeof(business) === 'undefined'){
        return <span style={{color: "Red"}}>Not Applicable</span>
    }else if(business.includes(" or ")){
        const files = business.split(" or ")
        return <div><span><div style={{display:"inline-block"}}><Link to={"/DataBase"}>{files[0]}</Link><span style={{color: "deeppink" }}>&nbsp;&nbsp; OR &nbsp;&nbsp; </span><Link to={"/DataBase"}>{files[1]}</Link></div></span><span>&nbsp;&nbsp;(Either Form)&nbsp;&nbsp;</span></div>
    }else if(business.includes(" and ")){ 
        const files = business.split(" and ")
        return <div><div style={{display:"inline-block"}}><Link to={"/DataBase"}>{files[0]}</Link><span style={{color: "red"}}>&nbsp;&nbsp; AND &nbsp;&nbsp;</span><Link to={"/DataBase"}>{files[1]}</Link></div><span>&nbsp;&nbsp;(Both Forms)&nbsp;&nbsp;</span></div>
    }else{
        return <div><span><Link to={"/DataBase"}>{business}</Link></span></div>
    }
}

function CompanyType({typeName}){
  return (
    <div className="typeName">
        <h5>{"Liability: "}<span>{handleKeyword(typeName["Liability"])}</span></h5>
        <h5><span>{"Property: "}</span>{handleKeyword(typeName["Property"])}</h5>
        <h5><span>{"E&O: "}</span>{handleKeyword(typeName["E&O"])}</h5>
        <h5><span>{"Excess: "}</span>{handleKeyword(typeName["Excess"])}</h5>
        <h5><span>{"Umbrella: "}</span>{handleKeyword(typeName["Umbrella"])}</h5>
    </div>
  )
}

export default CompanyType