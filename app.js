/* ==========================================
   Opal Centers (مركز أوبال) - Enhanced JavaScript
   Luminous Warm Pearl Architecture & Interactions
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Core DOM Elements
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
    const bookViaWhatsappBtn = document.getElementById('bookViaWhatsappBtn');
    const inquiryForm = document.getElementById('inquiryForm');

    // 1. Mobile Menu Navigation
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    // 2. Real-Time Libyan Opening Status
    const updateOpeningStatus = () => {
        const statusPill = document.getElementById('openingStatus');
        const statusText = document.getElementById('statusText');
        if (!statusPill || !statusText) return;

        // Benghazi / Libya is UTC+2 without DST
        const now = new Date();
        const utcHour = now.getUTCHours();
        const utcDay = now.getUTCDay();
        const libyaHour = (utcHour + 2) % 24;
        const libyaDay = (utcHour + 2 >= 24) ? (utcDay + 1) % 7 : utcDay;

        // Friday (day 5) is closed
        // Saturday (6) to Thursday (4): 10:00 to 21:00
        const isFriday = (libyaDay === 5);
        const isOpenHour = (libyaHour >= 10 && libyaHour < 21);

        if (!isFriday && isOpenHour) {
            statusPill.className = 'status-pill open';
            statusText.textContent = 'مفتوح الآن لاستقبالكم';
        } else {
            statusPill.className = 'status-pill closed';
            statusText.textContent = isFriday ? 'مغلق اليوم (عطلة الجمعة)' : 'مغلق الآن - يفتح 10:00 ص';
        }
    };
    updateOpeningStatus();

    // 3. Service Category Filtering
    const tabBtns = document.querySelectorAll('.tab-btn');
    const serviceCards = document.querySelectorAll('.service-card');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            serviceCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 4. Modal Open/Close System
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

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && bookingModal && bookingModal.classList.contains('active')) {
            closeModal();
        }
    });

    // Connect Service Cards to Modal
    serviceBookBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const serviceName = btn.getAttribute('data-service');
            openModal(serviceName);
        });
    });

    // 5. Booking Form Submission
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('bookName').value.trim();
            const phone = document.getElementById('bookPhone').value.trim();
            const service = document.getElementById('bookService').value;
            const date = document.getElementById('bookDate').value;

            if (!name || !phone || !service || !date) {
                alert('يرجى تعبئة جميع الحقول الإلزامية.');
                return;
            }

            bookingForm.classList.add('hidden');
            if (bookingSuccess) {
                bookingSuccess.classList.remove('hidden');
            }
        });
    }

    // 6. Direct WhatsApp Booking Action
    if (bookViaWhatsappBtn) {
        bookViaWhatsappBtn.addEventListener('click', () => {
            const name = document.getElementById('bookName').value.trim() || 'عميلة مركز أوبال';
            const phone = document.getElementById('bookPhone').value.trim();
            const service = document.getElementById('bookService').value || 'استشارة عامة';
            const date = document.getElementById('bookDate').value || 'في أقرب وقت';
            const notes = document.getElementById('bookNotes') ? document.getElementById('bookNotes').value.trim() : '';

            const message = `مرحباً مركز أوبال، أود حجز موعد بالتفاصيل التالية:\n- الاسم: ${name}\n- الهاتف: ${phone}\n- الخدمة: ${service}\n- التاريخ المفضل: ${date}${notes ? '\n- ملاحظات: ' + notes : ''}`;
            const encoded = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/218920000000?text=${encoded}`;
            window.open(whatsappUrl, '_blank');
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

    // 7. FAQ Accordion Toggle
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.closest('.faq-item');
            const isActive = item.classList.contains('active');

            // Close other FAQ items
            document.querySelectorAll('.faq-item').forEach(other => {
                if (other !== item) other.classList.remove('active');
            });

            // Toggle current item
            item.classList.toggle('active', !isActive);
        });
    });

    // 8. Inquiry Form Submission
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('inqName').value.trim();
            const phone = document.getElementById('inqPhone').value.trim();
            const message = document.getElementById('inqMessage').value.trim();

            if (!name || !phone || !message) {
                alert('يرجى ملء كافة الحقول لإرسال استفسارك.');
                return;
            }

            alert(`شكراً لكِ ${name}! تم إرسال استفسارك بنجاح إلى مركز أوبال. سنتواصل معك عبر الهاتف أو الواتساب في أقرب وقت.`);
            inquiryForm.reset();
        });
    }
});
