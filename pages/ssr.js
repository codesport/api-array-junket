import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

import { GetUserDataFormComponent, PostAndAppendFormComponent, UpdateFormComponent, DeleteFormComponent } from "../components//helperFunctions"

import { useEffect, useState } from "react";
import { ethers } from "ethers";
import axios from "axios"
import MyApp from './_app';


const url = 'https://jsonplaceholder.typicode.com/users'

const SSR = ({ result }) => {

    console.log(result);

    const mapReduce = result.map( (singleItem, Index) =>

            singleItem.id        
    )        
    .reduce( (previousValue, currentValue) =>
        previousValue + currentValue
    )     
              
          

return(
    <div className={styles.container}>
        <h1 className="text-3xl font-bold my-3">SSR Page</h1>

        <p>These examples use Next.js Server Side Rendering (SSR) to manage API data.</p>

        <p>Return to <Link href="/"><a>Home Page</a></Link></p>

        <h2 className="text-xl font-bold my-3">Using map to List Items</h2>
        <ol>
            {result.map( (singleItem, index) =>
            
                <li key={singleItem.id}>
                <b>Name:</b> {singleItem.name} <b>Email:</b> {singleItem.email}
                </li>
            
            
            )}
        </ol>

        <h2 className="text-xl font-bold my-3">Using map and reduce to sum IDs</h2>

        <p>Sum of {result.length} IDs:  {mapReduce}</p>

        {/* Embed code snippets in React render: https://stackoverflow.com/a/46649904/946957 */}
        <pre>{`
        const SSR = ({ result }) => {

            const mapReduce = result.map( (singleItem, Index) =>

                    singleItem.id        
            )        
            .reduce( (previousValue, currentValue) =>
                previousValue + currentValue
            )     
            return( 
                ...
            )

        }

        export async function getServerSideProps() {
            const response = await axios.get(url)
            const result = (response.data).splice(0,5)

            return{
                props: { result }
            }
        }
        `}</pre>


        <p>Return to <Link href="/"><a>Home Page</a></Link></p>

    </div>
)


}


/**
 * Three ways to fech external data in Next.js:
 * 1. Uses a "handler" function in the API folder
 * 2. SSR with getServeSideProps()
 * 3. Use "raw" React to do a native fetch (or with axios)
 *
 * https://stackoverflow.com/a/69036809/946957
 */

//export default SSR

export async function getServerSideProps() {

    const response = await axios.get(url)
    const result = (response.data).splice(0,5)

    return{
    
        props: { result }
    }

}

export default SSR