import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]); // create a stateful empty array

  useEffect( ()=>{
    fetch("http://localhost:4000/questions").then(
      (r)=>r.json()
    ).then(
      (data)=>{
        setQuestions(data);
        console.log(data)
      }
    );
  }, [])

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm questions={questions} questionStateSetter={setQuestions} /> : <QuestionList questions={questions} questionStateSetter={setQuestions} />}
    </main>
  );
}

export default App;
