(function () {
  var revealItems = document.querySelectorAll('.reveal, .reveal-delay');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealItems.forEach(function (item) {
      observer.observe(item);
    });
  } else {
    revealItems.forEach(function (item) {
      item.classList.add('visible');
    });
  }

  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    var button = item.querySelector('.faq-question');
    button.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      faqItems.forEach(function (current) {
        current.classList.remove('open');
      });
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });

  var countdown = document.getElementById('countdownTimer');
  var countdownWrap = document.querySelector('.countdown');

  if (countdown && countdownWrap) {
    var hours = Number(countdownWrap.getAttribute('data-deadline-hours')) || 6;
    var target = Date.now() + hours * 60 * 60 * 1000;

    function updateTimer() {
      var now = Date.now();
      var diff = target - now;

      if (diff <= 0) {
        countdown.textContent = '00:00:00';
        return;
      }

      var totalSeconds = Math.floor(diff / 1000);
      var hh = Math.floor(totalSeconds / 3600);
      var mm = Math.floor((totalSeconds % 3600) / 60);
      var ss = totalSeconds % 60;

      var timerText =
        String(hh).padStart(2, '0') +
        ':' +
        String(mm).padStart(2, '0') +
        ':' +
        String(ss).padStart(2, '0');

      countdown.textContent = timerText;
    }

    updateTimer();
    setInterval(updateTimer, 1000);
  }
})();
