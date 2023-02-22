import React, { useState } from 'react'
import { Button, Card,Container,Grid } from 'semantic-ui-react';
import Link from 'next/link';
import { useRouter } from 'next/router';



export default function CreateNew({tasks}) {

console.log(tasks)
 
  return (
    <Grid centered verticalAlign='middle' columns={1} style={{height: "80vh"}}>
      <Grid.Row>
        <Grid.Column>
      <h1>There are no tasks present. Please create a new one</h1>
      <div>
        <Button primary onClick={() => router.push("/tasks/new") }>
          Create Task
        </Button>
      </div>
        </Grid.Column>

      </Grid.Row>


      <div>Creating Task </div>
    </Grid>
  )
    
};



export async function getServerSideProps() {
  const response = await fetch('http://localhost:3000/api/tasks');
  const tasks = await response.json();
  console.log(tasks)
  return{
    props: {
      tasks,
    },
  };
}

