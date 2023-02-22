import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { Button, Form, Grid, GridColumn, Loader } from 'semantic-ui-react';

const CreatingTask = () => {
  const [newTask, setnewTask] = useState({
    title: "",
    description : ""
  });

  const {title, description} = newTask;
  const {push, query}= useRouter();
  const [isSubmit, setIsSubmit] = useState(false)
  const [errors, setErrors] = useState({})

  const getTask = async () => {
      const response = await fetch (`http://localhost:3000/api/tasks/${query.id}`)
      const data = await response.json();
      setnewTask({title: data.title, description: data.description})
  };

  useEffect(() => {
    if(query.id) getTask();
  }, [query.id]);

  const validate = () => {
    let errors = {};
    if(!title) {
      errors.title = "Title is Required"
    }
    if(!description) {
      errors.description = "Description is Required"
    }
    return errors
  }

 const handleSubmit = async (e) =>{
   e.preventDefault();
   let errors = validate();
   if (Object.keys(errors).length) return setErrors(errors);
   setIsSubmit(true);
   if (query.id){
    await updateTask();
   }else{
    await createTask();
   }
   await push("/");
 };

 const updateTask = async () =>  {
  try{
    await fetch(`http://localhost:3000/api/tasks/${query.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTask)
    });
  } catch (error) {
    console.log(error) 
  }
}



  const createTask = async () =>  {
    try{
      await fetch("http://localhost:3000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newTask)
      });
    } catch (error) {
      console.log(error) 
    }
  }


 const handleChange = (e) =>{
  const {name, value} = e.target;
  setnewTask({...newTask,[name] : value})
  console.log(newTask)
 }

 

  return (
    <Grid
      centered
      verticalAlign="middle"
      columns={3}
      style={{ height: "80vh" }}
    >
      <Grid.Row>
        <Grid.Column textAlign="center">
          <div>
            <h1>{query.id? "Update Task" : "Create Task"}</h1>
            <div>
              {isSubmit ? (
                <Loader active inline="centered" />
              ) : (
                <Form onSubmit={handleSubmit}>
                  <Form.Input
                   error={
                    errors.title ? { content: "Please enter a title"} : null
                   }
                    label="Title"
                    placeholder="Enter Title"
                    name="title"
                    onChange={handleChange}
                    value={title}
                    autoFocus
                  />
                  <Form.TextArea
                  error={
                    errors.description ? { content: "Please enter a description"} : null
                   }
                    label="Description"
                    placeholder="Enter Description"
                    name="description"
                    onChange={handleChange}
                    value={description}
                  />
                  <Button type='submit' primary>{query.id? "Update" : "Submit"}</Button>
                </Form>
              )}
            </div>
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default CreatingTask;