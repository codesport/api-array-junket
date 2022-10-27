// File of React Components

//inline styles using CSS objects
// https://github.com/codesport/admin-panel/blob/main-final-public/src/components/Master.js
    const inline = {
        display: 'inline'
    }


const ExecuteShellScript = (props) =>{
    console.log('executeShellScript:', props)
    return(
    <>
            <button onClick={props.onClickCallback} className="" >{props.buttonText}</button>
    
    </>
    )

}

const GetUserDataFormComponent = (props) =>{
    console.log('GetUserDataFormComponent Inputs:', props)
    return(
    <>
        <form id="getData" onSubmit={props.onSubmitCallback}>   
            <input type="number" name="splice"  step="1"  min="1" form="getData" className="" placeholder="Number of Users to Return" />
            <button form="getData" className="" >Get Users</button>
        </form>
    </>
    )

}

const PostAndAppendFormComponent = (props) =>{
    console.log('PostAndAppendFormComponent Inputs: ', props)
    return(
    <>
         <form id="postData" onSubmit={() => props.onSubmitCallback(event)}>  {/*events auto-submitted, event argument is not needed */}
            <input name="id" type="number" form="postData"  className="" placeholder="id" required/>
            <input name="name"  form="postData" className="" placeholder="Full Name" required/>
            <input name="username"  form="postData" className="" placeholder="Username" required/>
            <input name="email"  type="email" form="postData" className="" placeholder="Email" required/>
            <input name="phone"  form="postData" className="" placeholder="Phone" required/>
            <button form="postData" className="" >Run Post Request</button>
        </form>
        
    </>
    )

}

const UpdateFormComponent = (props) =>{
    console.log('UpdateUserDataFormComponent Inputs: ', props)
    return(
    <>
         <form id="updateData" onSubmit={props.onSubmitCallback}>  
            <input name="id" form="updateData" type="number"  className="" placeholder="id" required/>
            <input name="name"  form="updateData" className="" placeholder="Full Name" required/>
            <input name="username"  form="updateData" className="" placeholder="Username" required/>
            <input name="email"  form="updateData" type="email"  className="" placeholder="Email" required/>
            <input name="phone"  form="updateData" className="" placeholder="Phone" required/>
            <button form="updateData" className="" >Update Data Request</button>
        </form>
        
    </>
    )

}


const DeleteFormComponent = (props) =>{
    console.log('DeleteFormComponent Inputs: ', props)
    return(
    <>
         <form id="deleteData" onSubmit={() => props.onSubmitCallback(event)}>  {/*events auto-submitted, event argument is not needed */}
            <input name="id"  form="deleteData" type="number" className="" placeholder="id" required/>
            <button form="deleteData" className="">Delete Entry</button>
        </form>
        
    </>
    )

}

const AddUserDataFormComponent = (props) =>{
    console.log('xyz Inputs: ', props)
    return(
    <>
         <form id="postData" onSubmit={() => props.onSubmitCallback(event)}>  {/*events auto-submitted, event argument is not needed */}
            <input name="id"  form="postData" type="number" className="" placeholder="id" required/>
            <input name="fullName"  form="postData" className="" placeholder="Name" required/>
            <input name="username"  form="postData" className="" placeholder="Username" required/>
            <input name="phone"  form="postData" className="" placeholder="Phone" required/>
            <button onClick={props.callback} className="">Run Post Request</button>
        </form>
        
    </>
    )
}


//Named Exports
export { GetUserDataFormComponent, PostAndAppendFormComponent, UpdateFormComponent, DeleteFormComponent, ExecuteShellScript}