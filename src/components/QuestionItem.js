import React from "react";

function QuestionItem({ question, questionStateSetter, allQuestions }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleDelete(){
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    }).then(r=>r.json()).then(
      ()=>{
        console.log(`deleted ${id}`);
        questionStateSetter(allQuestions.filter( (question)=>{
          return question.id !== id;
        }));
      }
    )
  }

  function handleChangeCorrectAnswer(event){
    console.log(`correct answer is ${event.target.value}, was ${correctIndex}`)
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type" : "application/json",
      },
      body: JSON.stringify({
        correctIndex: event.target.value,
    }),
  }).then(r=>r.json()).then( (updatedQuestion)=>{
    onUpdatedQuestion(updatedQuestion);
  })
}

  function onUpdatedQuestion(updatedQuestion){
    const updatedQuestionList = allQuestions.map( (quest)=>{
      if(quest.id === updatedQuestion.id){
        return updatedQuestion
      }
      else{
        return quest;
      }
    });

    questionStateSetter(updatedQuestionList);
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleChangeCorrectAnswer}>{options}</select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
