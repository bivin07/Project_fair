import { commonAPI } from "./commonApi";
import {server_url} from './server_url'


//registerAPI
 
export const registerAPI =async(user)=>{
    return await commonAPI('POST',`${server_url}/register`,user,"")
}
export const loginAPI= async(user)=>{
    return await commonAPI('POST',`${server_url}/login`,user,"")
}
export const addProjectAPI= async(reqBody,reqHeader)=>{
    return await commonAPI('POST',`${server_url}/addproject`,reqBody,reqHeader)
}

//get home project api

export const getHomeProjectAPI=async()=>{
return await commonAPI('GET',`${server_url}/homeprojects`,"","")
}

//get all projects api

export const getAllProjectAPI =async(searchkey,reqHeader)=>{
    return await commonAPI('GET',`${server_url}/allprojects?search=${searchkey}`,"",reqHeader)
}


export const getuserProjectAPI =async(reqHeader)=>{
    return await commonAPI('GET',`${server_url}/userprojects`,"",reqHeader)
}


//updateProjectApi

export const updateProjectAPI =async(id,reqBody,reqHeader)=>{
    return await commonAPI('PUT',`${server_url}/projects/edit/${id}`,reqBody,reqHeader)
}

//deleteProjectApi

export const deleteProjectAPI=async(id,reqHeader)=>{
    
return await commonAPI('DELETE',`${server_url}/projects/remove/${id}`,{},reqHeader)

}