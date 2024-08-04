import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [howManyQuestion, setHowManyQuestion] = useState('');

  const navigate = useNavigate();

  function handleClick(e) {
    e.preventDefault();
    if (!howManyQuestion) return;
    navigate('/quiz', {
      state: { howManyQuestion: howManyQuestion, start: true },
    });
  }

  return (
    <>
      <div className='card-container'>
        <div className='homepage'>
          <h1>Home Quiz</h1>
          <h2>Peraturan</h2>
          <ol>
            <li>Quiz memiliki waktu 3 menit</li>
            <li>
              Apabila anda telah menjawab soal, tunggu beberapa detik agar soal
              selanjutnya muncul
            </li>
            <li>
              Anda bisa memilih banyaknya soal yang ingin anda kerjakan pada
              inputan disamping{' '}
              <span>
                <input
                  type='text'
                  placeholder='5'
                  onChange={(e) => setHowManyQuestion(parseInt(e.target.value))}
                />
              </span>
            </li>
            <li>Jika sudah memilih, klik tombol mulai untuk memulai quiz</li>
          </ol>
          <button onClick={handleClick}>Mulai Quiz</button>
        </div>
      </div>
      {/* </GlobalContext.Provider> */}
    </>
  );
}
