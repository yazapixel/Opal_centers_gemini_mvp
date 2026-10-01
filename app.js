/* ==========================================
   Opal Centers (مركز أوبال) - MVP JavaScript
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const bookingModal = document.getElementById('bookingModal');
    const openBookingModalBtns = [
        document.getElementById('openBookingModal'),
        document.getElementById('heroBookBtn'),
        document.getElementById('aboutBookBtn')
    ];
    const closeModalBtn = document.getElementById('closeModal');
    const serviceBookBtns = document.querySelectorAll('.service-book');
    const bookServiceSelect = document.getElementById('bookService');
    const bookingForm = document.getElementById('bookingForm');
    const bookingSuccess = document.getElementById('bookingSuccess');
    const resetBookingBtn = document.getElementById('resetBooking');
    const inquiryForm = document.getElementById('inquiryForm');

    // Mobile Menu Toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu when clicking nav links
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    // Modal Functions
    const openModal = (serviceName = '') => {
        if (bookingModal) {
            bookingModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            if (serviceName && bookServiceSelect) {
                bookServiceSelect.value = serviceName;
            }
        }
    };

    const closeModal = () => {
        if (bookingModal) {
            bookingModal.classList.remove('active');
            document.body.style.overflow = 'auto';
            // Reset form state after close animation
            setTimeout(() => {
                if (bookingForm) bookingForm.reset();
                if (bookingForm) bookingForm.classList.remove('hidden');
                if (bookingSuccess) bookingSuccess.classList.add('hidden');
            }, 300);
        }
    };

    openBookingModalBtns.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                openModal();
            });
        }
    });

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    if (bookingModal) {
        bookingModal.addEventListener('click', (e) => {
            if (e.target === bookingModal) {
                closeModal();
            }
        });
    }

    // Service card "Book this service" buttons
    serviceBookBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const serviceName = btn.getAttribute('data-service');
            openModal(serviceName);
        });
    });

    // Booking Form Submission
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('bookName').value;
            const phone = document.getElementById('bookPhone').value;
            const service = document.getElementById('bookService').value;
            const date = document.getElementById('bookDate').value;

            if (!name || !phone || !service || !date) {
                alert('يرجى ملء جميع الحقول المطلوبة.');
                return;
            }

            // Simulate server request & success
            bookingForm.classList.add('hidden');
            if (bookingSuccess) {
                bookingSuccess.classList.remove('hidden');
            }
        });
    }

    if (resetBookingBtn) {
        resetBookingBtn.addEventListener('click', () => {
            if (bookingForm) {
                bookingForm.reset();
                bookingForm.classList.remove('hidden');
            }
            if (bookingSuccess) {
                bookingSuccess.classList.add('hidden');
            }
        });
    }

    // Inquiry Form Submission
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('inqName').value;
            const phone = document.getElementById('inqPhone').value;
            const message = document.getElementById('inqMessage').value;

            if (!name || !phone || !message) {
                alert('يرجى ملء جميع الحقول.');
                return;
            }

            alert(`شكراً لكِ ${name}! تم إرسال استفسارك بنجاح إلى مركز أوبال. سنتواصل معك قريباً.`);
            inquiryForm.reset();
        });
    }
});
