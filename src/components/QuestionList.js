import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ questions, questionStateSetter }) {


  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questions.map( (question)=>{
        return (
          <QuestionItem key={question.id} question={question} questionStateSetter={questionStateSetter} allQuestions={questions} />
        )
      })}</ul>
    </section>
  );
}

export default QuestionList;
