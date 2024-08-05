import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import he from 'he';
import axios from 'axios';
import Result from './result/Result';

export default function Quiz() {
  const dataFromHomepage = useLocation();
  const [data, setData] = useState([]);
  const [refreshQuiz, setRefreshQuiz] = useState(false);
  const [quizNumber, setQuizNumber] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [incorrectAnswer, setIncorrectAnswer] = useState(0);
  const [isQuizDone, setIsQuizDone] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180000);
  const [timerRunning, setTimerRunning] = useState(true);
  const [start, setStart] = useState(dataFromHomepage.state.start);

  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  useEffect(() => {
    if (!isQuizDone) {
      let delay = 500;
      const fetchData = () => {
        axios
          .get(
            'https://opentdb.com/api.php?amount=1&category=15&difficulty=easy&type=multiple&'
          )
          .then((res) => {
            const results = res.data.results;
            const shuffledAnswers = results.map((item) => {
              const answers = [...item.incorrect_answers, item.correct_answer];
              return {
                ...item,
                question: he.decode(item.question),
                answers: shuffle(answers.map((answer) => he.decode(answer))),
              };
            });
            setData(shuffledAnswers);
            setQuizNumber(quizNumber + 1);
            setStart(false);
          })
          .catch((err) => {
            if (err.response.status === 429) {
              setTimeout(fetchData, delay);
            }
          });
      };

      const timeout = setTimeout(fetchData, delay);
      return () => clearTimeout(timeout);
    }
  }, [refreshQuiz, isQuizDone]);

  useEffect(() => {
    if (timerRunning) {
      const timer = setInterval(() => {
        if (timeLeft > 0) {
          setTimeLeft(timeLeft - 1000);
        } else {
          setTimerRunning(false);
          setIsQuizDone(!isQuizDone);
        }
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [timerRunning, timeLeft]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);

    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  function handleNextQuestion(answer) {
    const correct = data.map((item) => item.correct_answer).join();
    if (answer === correct) {
      setCorrectAnswer(correctAnswer + 1);
    } else {
      setIncorrectAnswer(incorrectAnswer + 1);
    }

    if (quizNumber === dataFromHomepage.state.howManyQuestion) {
      setIsQuizDone(!isQuizDone);
      setTimerRunning(false);
    }
    setRefreshQuiz(!refreshQuiz);
  }

  return (
    <>
      {isQuizDone ? (
        <Result
          correctAnswer={correctAnswer}
          incorrectAnswer={incorrectAnswer}
          totalQuestion={dataFromHomepage.state.howManyQuestion}
        />
      ) : (
        <div className='card-container'>
          <div className='question-box'>
            <div className={start ? 'quiz-navbar-refresh' : 'quiz-navbar'}>
              <p>Quiz</p>
              <p>
                Nomor {quizNumber === 0 ? 1 : quizNumber} dari{' '}
                {dataFromHomepage.state.howManyQuestion}
              </p>
              <p>{formatTime(timeLeft)}</p>
            </div>
            <div className='question-page'>
              {data.map((item, index) => (
                <>
                  <p>{item.question}</p>
                  <ul key={index} className='divider'>
                    {item.answers.map((answer, index) => (
                      <li key={index}>
                        <button onClick={() => handleNextQuestion(answer)}>
                          {answer}
                        </button>
                      </li>
                    ))}
                  </ul>
                </>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
