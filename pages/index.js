import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

import { GetUserDataFormComponent, PostAndAppendFormComponent, UpdateFormComponent, DeleteFormComponent } from "../components//helperFunctions"
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import axios from "axios"


/** 
*
* map: iterate over an array
* filter, pop, shift, splice
*
*
* reduce: You have an array of amounts and you want to add 
* 
* Cannonical Guide: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
* Basic Array Methods: https://blog.teamtreehouse.com/javascript-basic-array-methods
* Filter: https://github.com/codesport/admin-panel/blob/main-final-public/src/components/Controller.js#L210-L228
*
* */

// const array1 = [1, 2, 3, 4];

// // 0 + 1 + 2 + 3 + 4
// const initialValue = 0;
// const sumWithInitial = array1.reduce( (previousValue, currentValue, index, array) => {
  	
//     console.log(previousValue, currentValue, index); 
//     return previousValue + currentValue
// }                                  
// );

// console.log(sumWithInitial);


export default function Home() {

    const [output, setOutput] = useState([])
    const [outputForm, setOutputForm] = useState([])
    const [outputPost, setOutputPost] = useState()
    const url = 'https://jsonplaceholder.typicode.com/users'

    let outputFormatted



    const postPatchAwait = async ()=>{
        axios.post("https://jsonplaceholder.typicode.com/users", {
            id: 11,
            name: "Tom Brady",
            username: "Brad",
            email: "tombrad@asd.com",
        })
        .then((response) => displayOutput(response))
        .catch((err) => console.log(err));    
    
    }



    const handlePostAndAppend = async (event)=>{

        event.preventDefault() 
        // console.log('handlePostAndAppend Called')

        // 1. Processing Form Values: Consider using spread operator
        // @see https://javascript.plainenglish.io/forms-in-react-with-hooks-809a3f38ed4#df69
    
   
   
        // 2. Processing Form Values: Programatically build via JavaScipt's Form API
        // https://www.learnwithjason.dev/blog/get-form-values-as-json
        const data = new FormData(event.target);
        const formJSON = Object.fromEntries(data.entries());
        //const formJSONstring = JSON.stringify(formJSON, null, 2)
        // console.log('formJSON:', formJSON)
        //console.log('Form to JSON string:', formJSONstring)

        formJSON.id = Number(event.target.id.value)

        console.log(formJSON)  
      
        // 3. Processing Form Values: Manually build
        // const payload = {
        //     id: event.target.id.value,
        //     fullname: event.target.fullname.value,
        //     email: event.target.email.value,
        //     phone: event.target.phone.value
        // }
        // console.log('Manually Assembled Payload:', payload)

        try{
            const response = await axios.post("https://jsonplaceholder.typicode.com/users", formJSON)
            console.log('Running handlePostAndAppend')

            /**
            * Update Array of Objects:
            *   const updatedOutput = output.filter( detail => detail.id !== updates.id).concat(updates)
            *   setOutput(updatedOutput)
            * 
            *   Or consider using spread operator to concat, append to existing state variable hook:
            *
            *  setOutput ([...output, newContent])
            */
            
            // convert FormData (HTML5 object) to JSON
            // https://stackoverflow.com/a/46774073/946957
            // var object = {};
            // formData.forEach(function(value, key){
            //     object[key] = value;
            // });
            // var json = JSON.stringify(object);


           
            setOutputPost (     
                
                <div key={response.data.id}>
                    {/* <b>ID:</b> {response.data.id}<br /> */}
                    <b>Name:</b> {response.data.name}<br />
                    <b>Email:</b> {response.data.email}<br />
                    <b>Phone:</b> {response.data.phone}<br /><br />
                </div>          
            
            )


            // Append to an array of objects stored in State
            //setOutput([...output, formJSON])

            const updatedArray = output.filter( update => update.id !== formJSON.id).concat(formJSON)
            console.log('Updated Array from handlePostAndAppend:', updatedArray)

            setOutput(updatedArray)


           // console.log('Post Output State:', outputPost)
        } catch (error) {
                console.log(error);
        }   
    
    }    

    const handleDelete = async (event) =>{

        event.preventDefault() 
        // form values are strings. Therefore cast to number
        // https://stackoverflow.com/a/1133814/946957
        const id = Number(event.target.id.value)

        console.log('Contents of Output Before Deletion: ', output)
        
        //let updatedArray = output
        const updatedArray = output.filter( item => item.id !== id)

        console.log('Updated Array after Deleting: ', updatedArray)
        console.log('ID to be Deleted: ', id)

        // https://stackoverflow.com/a/20827100/946957
        // In ECMA6 (arrow function syntax):
        //const filteredArray = arr.filter(e => e !== 'seven') 
         setOutput( updatedArray )

         console.log('Contents of Output After Deletion: ', output)
    
    }

    const handleUpdate = async (event) =>{
     
        event.preventDefault() 

        const data = new FormData(event.target);
        const formJSON = Object.fromEntries(data.entries());
        formJSON.id = Number(event.target.id.value)

        // //Find index of specific object using findIndex method
        // https://stackoverflow.com/a/41938641/946957

        // objIndex = formJSON.findIndex((obj => obj.id == id))

        // //Log object to Console.
        // console.log("Before update: ", formJSON[objIndex])

        // //Update object's name property.
        // formJSON[objIndex].id = Number(event.target.id.value)

        // //Log object to console again.
        // console.log("After update: ", formJSON[objIndex])       


        

        const updatedArray = output.filter( update => update.id !== formJSON.id).concat(formJSON)
        setOutput( updatedArray )
        
    }



    const getUserDataArrow = async (size) =>{
        try {
            const response = await axios.get(url);  //NB:  Requests will default to GET if method is not specified.
            console.log(response);

            // const { result } = response.data;

            if (!size){
                size =3
            }
            return (response.data.splice(0, size))
        } catch (error) {
            console.log(error);
        }   
    }


    async function getUserDataNormy() {
        try {
            const response = await axios.get(url);  //NB:  Requests will default to GET if method is not specified.
            console.log('getUserDataNormy() Response', response);

             const  result = response.data;
             console.log('getUserDataNormy() Result.data', result)

            // setArrayItems(response.data.splice(0, 6))

            
            return result
        }
        catch (error) {
            console.log(error)

            //https://www.atatus.com/blog/how-to-perform-http-requests-with-axios-a-complete-guide/#error-handling
            //Source: https://www.bezkoder.com/axios-request/
            // if (error.response) { // get response with a status code not in range 2xx
            // console.log(error.response.data);
            // console.log(error.response.status);
            // console.log(error.response.headers);
            // } else if (error.request) { // no response
            // console.log(error.request);
            // } else { // Something wrong in setting up the request
            // console.log('Error', error.message);
            // }
            // console.log(error.config);
         }

    }

    
    const handleGetOutputCustomeLength = async (event) =>{ //callback1
    
        event.preventDefault() 

        const spliceLength = event.target.splice.value
        setOutput( await getUserDataArrow(spliceLength) )

        console.log('handleGetOutputCustomeLength', output)
        
        const secondOutputFormatted = output.map( (singleItem ) =>
        <div key={singleItem.id}>
            <b>Id:</b> {singleItem.id}<br />
            <b>Name:</b> {singleItem.name}<br />
            <b>Email:</b> {singleItem.email}<br />
            <b>Phone:</b> {singleItem.phone}<br /><br />
        </div>
        )

        setOutputForm(secondOutputFormatted)
    }


    /**
     * Examples of how to select elements with JavaScript
     * 
     *  document.getElementsByClassName('check-box');
     *  document.getElementById('demo');
     *  document.querySelector('input[name=hey]').value
     * @link https://github.com/codesport/admin-panel/blob/main-final-public/src/components/Controller.js#L262
     * @link https://stackoverflow.com/a/3450609/946957
     */
    const handleClearOutput = async (elementID) =>{ //callback2

         console.log('Clear form using JavaScript DOM:', elementID)

        document.getElementById(elementID).innerHTML = "";

    }  

    const handleClearOutputHook = async () =>{ //onClearCallback

        console.log('Clear form using React hook')

        setOutputForm([])

    }       


    useEffect(() => {
        console.log('useEffect Loading')

        // https://stackoverflow.com/a/58343697/946957
        // async function run(){
        //     setOutput(( await getUserDataNormy()).splice(0,100))
        // }
        // run()

        // if (!output){
        //     return
        
        // } else{
            outputFormatted = output.map( (singleItem, index ) =>
                <div key={singleItem.id}>
                    <b>ID:</b> {singleItem.id}<br />
                    <b>Name:</b> {singleItem.name}<br />
                    <b>Email:</b> {singleItem.email}<br />
                    <b>Phone:</b> {singleItem.phone}<br /><br />
                </div>
            )            
                
        // }        

        setOutputForm(outputFormatted)

        console.log('UseEffect Output',output)
    }, [output]);









  return (
    <div className={styles.container}>

                <h1 className="text-3xl font-bold">API Pull and Array Manipulation using "Raw" React</h1>

                <p>View the <Link href="/ssr"><a>Server Side Rendering (SSR)</a></Link> example</p>
        <div className="flex flex-row ml-24 w-full ">

            <div className="w-full lg:w-1/3">
                    <h2>Manual API Call</h2>
                    <GetUserDataFormComponent onSubmitCallback={handleGetOutputCustomeLength} />

                    <h2>Clear Output State</h2>
                    <div id="manualOutput">
                        <button className=""  onClick={handleClearOutputHook} className="adminButton kviMVi">Clear Data Using React Hook</button>
                    </div>

                    <h2>Update Array Locally</h2>
                    <div id="updateArray">
                        <UpdateFormComponent onSubmitCallback={handleUpdate} />
                        
                    </div>

                    <h2>Delete Array Element Locally</h2>
                    <div id="deleteArray">
                        <DeleteFormComponent onSubmitCallback={handleDelete} />
                    
                    </div>                    
            </div>
            <div className="w-full lg:w-1/4">
                    <h2>Output</h2>
                    <div id="autoOutput" >
                        {outputForm}
                    </div> 
            </div>            
            <div className="w-full lg:w-1/3">
                   <h2>Post API Call, Then Append Locally</h2>
                    <div id="postRequest">
                       <PostAndAppendFormComponent onSubmitCallback={handlePostAndAppend} />
                        {/* <button onClick={handlePostAndAppend} className="adminButton kviMVi">Run Post Request</button> */}
                        {outputPost}
                    </div>                    
            </div>      
        </div>

    </div>

      
  )
}
