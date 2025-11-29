// --- BÀI 01: CÁC TÍNH NĂNG TƯƠNG TÁC LANDING PAGE ---
document.addEventListener('DOMContentLoaded', () => {

    // 1. Thư viện ảnh đơn giản
    const mainImage = document.getElementById('main-product-display');
    const thumbnails = document.querySelectorAll('.thumbnail');

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            // Cập nhật ảnh lớn
            const newImageSrc = this.getAttribute('data-full-src');
            mainImage.src = newImageSrc;
            mainImage.alt = this.alt;

            // Xóa class 'active' khỏi tất cả thumbnails và thêm vào thumbnail được click
            thumbnails.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // 2. Scroll Effect cho Header
    const header = document.querySelector('.product-header');
    
    function handleScroll() {
        if (header) { // Kiểm tra để không lỗi khi chạy index.html hoặc bai02.html
            // Thêm class 'scrolled' nếu cuộn xuống quá 50px
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    }

    window.addEventListener('scroll', handleScroll);

    // 3. Tư duy sáng tạo: Animation khi cuộn (Intersection Observer)
    const featureItems = document.querySelectorAll('.feature-item');

    // Tùy chọn cho Intersection Observer
    const observerOptions = {
        root: null, // Dùng viewport làm root
        rootMargin: '0px',
        threshold: 0.1 // Kích hoạt khi 10% phần tử hiển thị
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Thêm class 'animate' để kích hoạt hiệu ứng CSS
                entry.target.classList.add('animate');
                // Ngừng theo dõi sau khi đã xuất hiện
                observer.unobserve(entry.target);
            }
        });
    };

    // Tạo Intersection Observer và quan sát các phần tử tính năng
    if (featureItems.length > 0) {
        const featureObserver = new IntersectionObserver(observerCallback, observerOptions);
        featureItems.forEach(item => {
            featureObserver.observe(item);
        });
    }

    // Xử lý Responsive Menu (chỉ cần HTML/CSS cho bài này) - JS cho Hamburger Menu
    const hamburger = document.querySelector('.hamburger-menu');
    const navList = document.querySelector('.product-nav .nav-list');

    if (hamburger && navList) {
        hamburger.addEventListener('click', () => {
            // Dùng toggle() để bật/tắt menu
            navList.style.display = navList.style.display === 'flex' ? 'none' : 'flex';
        });
    }
});


// --- BÀI 02: GAME ĐOÁN SỐ ---
function initializeGuessingGame() {
    const min = 50;
    const max = 150;
    // Tạo số bí mật ngẫu nhiên trong khoảng [50, 150]
    let secretNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    let attempts = 0;
    let isGameOver = false;

    // Lấy các phần tử DOM (Đảm bảo chỉ chạy khi bai02.html được tải)
    const guessInput = document.getElementById('guessInput');
    const checkButton = document.getElementById('checkButton');
    const resultMessage = document.getElementById('resultMessage');
    const attemptCount = document.getElementById('attemptCount');
    const resetButton = document.getElementById('resetButton');
    const confettiContainer = document.getElementById('confetti-container');
    
    // Nếu các phần tử game không tồn tại, thoát khỏi hàm
    if (!guessInput) return; 


    function checkGuess() {
        if (isGameOver) return;

        const guess = parseInt(guessInput.value.trim());

        // Logic xử lý Input (kiểm tra lỗi)
        if (isNaN(guess) || guess < min || guess > max) {
            resultMessage.textContent = `❌ Vui lòng nhập một số hợp lệ trong khoảng ${min} đến ${max}.`;
            resultMessage.className = 'message error';
            return;
        }

        attempts++;
        attemptCount.textContent = attempts;

        // Logic so sánh
        if (guess === secretNumber) {
            resultMessage.textContent = `🎉 CHÍNH XÁC! Số bí mật là ${secretNumber}. Bạn đã đoán đúng trong ${attempts} lần!`;
            resultMessage.className = 'message success';
            isGameOver = true;
            checkButton.disabled = true;
            resetButton.style.display = 'block';
            
            // Kích hoạt Confetti Animation
            confettiContainer.classList.add('active');
        } else if (guess < secretNumber) {
            resultMessage.textContent = '🔽 Quá thấp! Thử lại.';
            resultMessage.className = 'message warning';
        } else { 
            resultMessage.textContent = '🔼 Quá cao! Thử lại.';
            resultMessage.className = 'message warning';
        }
    }

    function resetGame() {
        // Generate số bí mật mới
        secretNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        attempts = 0;
        isGameOver = false;

        // Reset DOM
        attemptCount.textContent = 0;
        resultMessage.textContent = '';
        resultMessage.className = 'message';
        guessInput.value = '';
        checkButton.disabled = false;
        resetButton.style.display = 'none';

        // Tắt Confetti
        confettiContainer.classList.remove('active');
    }
    
    // Gán sự kiện
    checkButton.addEventListener('click', checkGuess);
    resetButton.addEventListener('click', resetGame);
    // Cho phép dùng Enter
    guessInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            checkGuess();
        }
    });
}
