const questions = [
    {
        question: "Apa hasil dari query berikut?",
        code: "harga_servis(Service, Harga), Harga < 200000.",
        options: [
        "ganti_oli", 
        "ganti_rem", 
        "service_ringan", 
        "Semua jawaban benar"
        ],
        multi: true,
        correct: ["a", "b"],
        explanation: "Query ini akan mengembalikan semua layanan yang harganya kurang dari 200000. Dalam basis data, ganti_oli dan ganti_rem memiliki harga di bawah 200000."
    },
    {
        question: "Siapa montir yang ahli ganti_oli dan memiliki jadwal di hari Selasa?",
        code: "ahli_servis(Montir, ganti_oli), jadwal(Montir, selasa, _).",
        options: [
        "yusuf", 
        "briant", 
        "udin", 
        "rojak"
        ],
        correct: "b",
        explanation: "Query ini mencari montir yang ahli dalam ganti_oli dan bekerja pada hari Selasa. Berdasarkan basis data, briant adalah satu-satunya montir yang memenuhi kedua kriteria tersebut."
    },
    {
        question: "Query berikut akan menghasilkan true atau false?",
        code: "suku_cadang(minyak_rem, ganti_rem), stok(minyak_rem, 0).",
        options: [
        "true", 
        "false"
        ],
        correct: "a",
        explanation: "Query ini memeriksa apakah minyak_rem adalah suku cadang yang digunakan dalam ganti_rem dan apakah stok minyak_rem adalah 0. Kedua fakta ini benar dalam basis data, sehingga query menghasilkan true."
    },
    {
        question: "Apakah yusuf bisa melakukan servis ganti_rem, dan apakah stok suku cadang untuk servis tersebut masih tersedia?",
        code: "ahli_servis(yusuf, ganti_rem), suku_cadang(C, ganti_rem), stok(C, S), S > 0.",
        options: [
        "true", 
        "false"
        ],
        correct: "b",
        explanation: "Meskipun yusuf ahli dalam ganti_rem, salah satu suku cadang yang diperlukan (minyak_rem) memiliki stok 0, sehingga jawaban yang benar adalah false."
    },
    {
        question: "Servis apa saja yang bisa dilakukan oleh montir yahya?",
        code: "ahli_servis(yahya, Servis).",
        options: [
        "tune_up, service_ringan",
        "ganti_oli, tune_up",
        "service_ringan, ganti_rem",
        "tune_up saja"
        ],
        correct: "a",
        explanation: "Query ini mencari semua layanan yang dapat dilakukan oleh yahya. Berdasarkan fakta dalam basis data, yahya ahli dalam tune_up dan service_ringan."
    },
    {
        question: "Kendaraan mana yang diservis oleh rojak dan jenis servisnya adalah spoorting_balancing?",
        code: "servis(rojak, Kendaraan, spoorting_balancing).",
        options: [
        "honda", 
        "daihatsu", 
        "yamaha", 
        "suzuki"
        ],
        correct: "b",
        explanation: "Berdasarkan fakta dalam basis data, rojak melakukan servis spoorting_balancing pada kendaraan daihatsu."
    },
    {
        question: "Siapa saja montir yang bisa melakukan tune_up, punya jadwal Jumat, dan suku cadangnya tersedia?",
        code: "ahli_servis(Montir, tune_up), jadwal(Montir, jumat, _), suku_cadang(C, tune_up), stok(C, S), S >= 1.",
        options: [
        "yusuf", 
        "yahya", 
        "yusuf dan yahya", 
        "tidak ada"
        ],
        correct: "c",
        explanation: "Berdasarkan basis data, yusuf dan yahya keduanya ahli dalam tune_up, keduanya memiliki jadwal di hari Jumat, dan semua suku cadang yang diperlukan untuk tune_up tersedia."
    },
    {
        question: "Apakah ada montir yang bisa service_ringan atau ganti_rem dan jadwal hari Senin?",
        code: "(ahli_servis(M, service_ringan); ahli_servis(M, ganti_rem)), jadwal(M, senin, _).",
        options: [
        "yusuf", 
        "udin", 
        "yahya", 
        "tidak ada"
        ],
        correct: "b",
        explanation: "Udin ahli dalam service_ringan dan memiliki jadwal pada hari Senin, sehingga dia memenuhi kriteria yang ditanyakan."
    },
    {
        question: "Sebutkan semua kendaraan yang diservis oleh montir yang ahli dalam ganti_oli.",
        code: "ahli_servis(M, ganti_oli), servis(M, Kendaraan, _).",
        options: [
        "honda, suzuki", 
        "honda, yamaha", 
        "suzuki, daihatsu", 
        "hanya honda"
        ],
        correct: "a",
        explanation: "Berdasarkan basis data, montir yang ahli dalam ganti_oli melakukan servis pada kendaraan honda dan suzuki."
    },
    {
        question: "Apakah semua suku cadang untuk tune_up ada stok minimal 2 unit?",
        code: "forall(suku_cadang(C, tune_up), (stok(C, S), S >= 2)).",
        options: ["true", "false"],
        correct: "a",
        explanation: "Berdasarkan basis data, semua suku cadang untuk tune_up memiliki stok minimal 2 unit."
    }
];


    let userAnswers = new Array(questions.length).fill(null);
    let currentQuestion = 0;
    const quizContainer = document.getElementById('quiz-container');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const checkBtn = document.getElementById('checkBtn');
    const progressText = document.getElementById('progress-text');
    const progressFill = document.getElementById('progress-fill');
    const explanationContainer = document.getElementById('explanation-container');
    const explanationText = document.getElementById('explanation-text');

    const facts = `\
    % Fakta kendaraan
    kendaraan(honda).
    kendaraan(yamaha).
    kendaraan(suzuki).
    kendaraan(daihatsu).
    kendaraan(toyota).
    % Jenis kendaraan
    jenis(honda, mobil).
    jenis(yamaha, motor).
    jenis(suzuki, motor).
    jenis(daihatsu, mobil).
    jenis(toyota, mobil).
    % Fakta montir dan spesialisasi utama
    montir(udin,honda).
    montir(yusuf,yamaha).
    montir(briant,suzuki).
    montir(rojak,daihatsu).
    montir(yahya,toyota).
    % Jenis servis
    servis(ganti_oli).
    servis(spooring_balancing).
    servis(service_ringan).
    servis(service_berat).
    servis(ganti_rem).
    servis(tune_up).
    % Montir ahli dalam servis tertentu
    ahli_servis(udin, ganti_oli).
    ahli_servis(udin, service_ringan).
    ahli_servis(yusuf, ganti_rem).
    ahli_servis(yusuf, tune_up).
    ahli_servis(briant, ganti_oli).
    ahli_servis(briant, service_berat).
    ahli_servis(rojak, spooring_balancing).
    ahli_servis(yahya, tune_up).
    ahli_servis(yahya, service_ringan).
    % Harga servis
    harga_servis(ganti_oli, 150000).
    harga_servis(spooring_balancing, 250000).
    harga_servis(service_ringan, 200000).
    harga_servis(service_berat, 500000).
    harga_servis(ganti_rem, 180000).
    harga_servis(tune_up, 220000).
    % Format: jadwal(NamaMontir, Hari, Jam).
    jadwal(udin, senin, pagi).
    jadwal(udin, rabu, siang).
    jadwal(yusuf, senin, siang).
    jadwal(yusuf, jumat, pagi).
    jadwal(briant, selasa, pagi).
    jadwal(rojak, rabu, pagi).
    jadwal(rojak, kamis, siang).
    jadwal(yahya, jumat, siang).
    % suku_cadang(Nama, UntukServis)
    suku_cadang(filter_oli, ganti_oli).
    suku_cadang(minyak_rem, ganti_rem).
    suku_cadang(bus_rem, ganti_rem).
    suku_cadang(bus_tuneup, tune_up).
    suku_cadang(obeng, service_ringan).
    suku_cadang(tune_kit, tune_up).
    % stok(NamaSukuCadang, Jumlah)
    stok(filter_oli, 10).
    stok(minyak_rem, 0). % habis
    stok(bus_rem, 5).
    stok(bus_tuneup, 3).
    stok(obeng, 12).
    stok(tune_kit, 2).
    % Format: riwayat_servis(Kendaraan, Servis, Montir, Tanggal).
    riwayat_servis(honda, ganti_oli, udin, tanggal(2025,4,10)).
    riwayat_servis(yamaha, tune_up, yusuf, tanggal(2025,4,12)).
    riwayat_servis(suzuki, ganti_oli, briant, tanggal(2025,3,28)).
    riwayat_servis(daihatsu, spooring_balancing, rojak, tanggal(2025,4,15)).
    `;

    document.getElementById("btnShowFacts").addEventListener("click", () => {
    document.getElementById("factsContent").textContent = facts;
    document.getElementById("factsModal").style.display = "block";
    });

    function closeFacts() {
    document.getElementById("factsModal").style.display = "none";
    }


    function loadQuestion(index) {
      const q = questions[index];
      
      // Update progress
      progressText.textContent = `${index + 1}/${questions.length}`;
      progressFill.style.width = `${((index + 1) / questions.length) * 100}%`;
      
      // Hide explanation when loading new question
      explanationContainer.classList.add('hidden');
      
      let html = `
        <div class="bg-gray-50 p-6 rounded-xl">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">${index + 1}. ${q.question}</h2>
      `;
      
      // Add code block if exists
      if (q.code) {
        html += `
          <div class="code-block">
            <pre>${q.code}</pre>
          </div>
        `;
      }
      
      // Add options
      html += `<div class="space-y-3">`;
      
      q.options.forEach((opt, i) => {
        const value = String.fromCharCode(97 + i); // a, b, c, d...
        const isSelected = q.multi 
          ? userAnswers[index] && userAnswers[index].includes(value)
          : userAnswers[index] === value;
          
        html += `
          <div class="option-item p-4 ${isSelected ? 'selected' : ''}" data-value="${value}" data-multi="${q.multi ? 'true' : 'false'}">
            <div class="flex items-center">
              ${q.multi 
                ? `<div class="checkbox-button">
                    <div class="checkbox-mark"></div>
                   </div>`
                : `<div class="radio-button">
                    <div class="radio-dot"></div>
                   </div>`
              }
              <span class="text-gray-700">${opt}</span>
            </div>
          </div>
        `;
      });
      
      html += `</div></div>`;
      
      quizContainer.innerHTML = html;
      
      // Add event listeners to options
      document.querySelectorAll('.option-item').forEach(item => {
        item.addEventListener('click', () => {
          const value = item.dataset.value;
          const isMulti = item.dataset.multi === 'true';
          
          if (isMulti) {
            // For checkboxes (multiple answers)
            if (!userAnswers[currentQuestion]) {
              userAnswers[currentQuestion] = [];
            }
            
            if (userAnswers[currentQuestion].includes(value)) {
              // Remove if already selected
              userAnswers[currentQuestion] = userAnswers[currentQuestion].filter(v => v !== value);
              item.classList.remove('selected');
            } else {
              // Add if not selected
              userAnswers[currentQuestion].push(value);
              userAnswers[currentQuestion].sort(); // Keep in alphabetical order
              item.classList.add('selected');
            }
          } else {
            // For radio buttons (single answer)
            document.querySelectorAll('.option-item').forEach(opt => {
              opt.classList.remove('selected');
            });
            
            item.classList.add('selected');
            userAnswers[currentQuestion] = value;
          }
        });
      });
      
      // Update button states
      prevBtn.disabled = index === 0;
      nextBtn.textContent = index === questions.length - 1 ? "Selesai" : "Selanjutnya";
      if (index === questions.length - 1) {
        nextBtn.innerHTML = "Selesai";
      } else {
        nextBtn.innerHTML = `Selanjutnya
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
          </svg>`;
      }
    }

    function checkAnswer() {
      const q = questions[currentQuestion];
      if (!userAnswers[currentQuestion]) {
        alert("Silakan pilih jawaban terlebih dahulu!");
        return;
      }
      
      // Show explanation
      explanationContainer.classList.remove('hidden');
      explanationText.textContent = q.explanation;
      
      // Highlight correct answer
      document.querySelectorAll('.option-item').forEach((item, i) => {
        const value = item.dataset.value;
        const isCorrect = q.multi 
          ? q.correct.includes(value)
          : q.correct === value;
          
        if (isCorrect) {
          item.classList.add('border-green-500', 'bg-green-50');
        }
        
        // If user selected wrong answer
        const isSelected = q.multi 
          ? userAnswers[currentQuestion].includes(value)
          : userAnswers[currentQuestion] === value;
          
        if (isSelected && !isCorrect) {
          item.classList.add('border-red-500', 'bg-red-50');
        }
      });
    }

    prevBtn.addEventListener("click", () => {
      if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion(currentQuestion);
      }
    });

    nextBtn.addEventListener("click", () => {
      if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        loadQuestion(currentQuestion);
      } else {
        // Calculate score
        let score = 0;
        questions.forEach((q, i) => {
          const userAns = userAnswers[i];
          const correctAns = q.correct;

          if (q.multi) {
            if (Array.isArray(userAns) && 
                JSON.stringify(userAns.sort()) === JSON.stringify(Array.isArray(correctAns) ? correctAns.sort() : [correctAns])) {
              score++;
            }
          } else {
            if (userAns === correctAns) {
              score++;
            }
          }
        });
        
        // Show completion message with score
        quizContainer.innerHTML = `
          <div class="text-center p-8">
            <div class="mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 class="text-2xl font-bold text-gray-800 mb-2">Kuis Selesai!</h2>
            <p class="text-lg text-gray-600 mb-4">Skor Anda: ${score} dari ${questions.length}</p>
            <button id="restartBtn" class="btn-primary px-6 py-3 rounded-lg text-white font-medium shadow-sm">
              Ulangi Kuis
            </button>
          </div>
        `;
        
        explanationContainer.classList.add('hidden');
        document.getElementById('restartBtn').addEventListener('click', () => {
          userAnswers = new Array(questions.length).fill(null);
          currentQuestion = 0;
          loadQuestion(0);
        });
        
        // Hide navigation buttons
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
        checkBtn.style.display = 'none';
      }
    });

    checkBtn.addEventListener("click", checkAnswer);

    // Load first question
    loadQuestion(currentQuestion);