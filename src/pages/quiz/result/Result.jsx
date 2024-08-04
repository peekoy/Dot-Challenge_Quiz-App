import { useNavigate } from 'react-router-dom';
import Card from '../../../components/card/Card';

export default function Result({
  correctAnswer,
  incorrectAnswer,
  totalQuestion,
}) {
  const navigate = useNavigate();

  function handleClick() {
    navigate('/home');
  }

  return (
    <>
      <Card>
        <div className='result-page'>
          <h2>Hasil Quiz</h2>
          <div className='result'>
            <p>Benar: {correctAnswer}</p>
            <p>Salah: {incorrectAnswer}</p>
            <p>Jumlah Jawab: {correctAnswer + incorrectAnswer}</p>
            <p>Total Soal: {totalQuestion}</p>
          </div>
          <button onClick={handleClick}>Ulangi Quiz</button>
        </div>
      </Card>
    </>
  );
}
