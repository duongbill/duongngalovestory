// Premium Interactive Date Invitation Logic (Inline Expandable Layout)
document.addEventListener("DOMContentLoaded", () => {
    const PASSCODE = "5158";
    
    // Elements
    const passcodeGate = document.getElementById("passcodeGate");
    const invitationContent = document.getElementById("invitationContent");
    const successState = document.getElementById("successState");
    
    const passcodeForm = document.getElementById("passcodeForm");
    const passcodeInput = document.getElementById("passcodeInput");
    const passcodeError = document.getElementById("passcodeError");
    const envelopeCard = document.querySelector(".envelope-card");
    
    const invitationForm = document.getElementById("invitationForm");

    // ============ PASSCODE GATE LOGIC ============
    if (passcodeForm) {
        passcodeForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const value = passcodeInput.value.trim();
            
            if (value === PASSCODE) {
                envelopeCard.classList.add("animate__animated", "animate__zoomOut");
                setTimeout(() => {
                    passcodeGate.classList.add("hidden");
                    invitationContent.classList.remove("hidden");
                    invitationContent.classList.add("fade-in");
                }, 600);
            } else {
                envelopeCard.classList.remove("shake");
                void envelopeCard.offsetWidth; // Trigger reflow
                envelopeCard.classList.add("shake");
                passcodeError.classList.remove("hidden");
                passcodeInput.value = "";
            }
        });

        passcodeInput.addEventListener("input", () => {
            passcodeError.classList.add("hidden");
        });
    }

    // ============ VENUE POPUP MODAL LOGIC ============
    const venueData = {
        takeya: {
            title: "TAKEYA",
            desc: "Một nơi em từng đăng lại từ khá lâu rồi. Anh nhận ra mình đã bỏ lỡ nhiều điều em quan tâm, nên hôm nay anh muốn bắt đầu lại từ nơi này.",
            images: [
                "./assess/img/sushi/takeya.jpg",
                "./assess/img/sushi/menutakeya.jpg"
            ]
        },
        zensushi: {
            title: "Zen Sushi",
            desc: "Không gian trang nhã chuẩn Nhật Bản, nổi tiếng với các khay sashimi cá hồi tươi cuts mọng nước.",
            images: [
                "./assess/img/sushi/zensushi.jpg",
                "./assess/img/sushi/zensushi1.jpg",
                "./assess/img/sushi/zensushi2.jpg",
                "./assess/img/sushi/zensushi3.jpg",
                "./assess/img/sushi/zensushi4.jpg",
                "./assess/img/sushi/zensushi5.jpg",
                "./assess/img/sushi/zensushi6.jpg"
            ]
        },
        hagisushi: {
            title: "Hagi Sushi",
            desc: "Sushi và ẩm thực Nhật thanh tao, bày trí nghệ thuật và không gian vô cùng yên tĩnh, riêng tư.",
            images: [
                "./assess/img/sushi/hagi.jpg"
            ]
        },
        namasushi: {
            title: "Namasushi",
            desc: "Không gian ẩm thực Nhật Bản ấm cúng, sang trọng với các món sushi và sashimi đa dạng, tinh tế chế biến bởi đầu bếp giàu kinh nghiệm.",
            images: [
                "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&auto=format&fit=crop&q=60",
                "https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=800&auto=format&fit=crop&q=60"
            ]
        },
        isushi: {
            title: "Isushi",
            desc: "Buffet Nhật Bản đẳng cấp mang tới trải nghiệm thực sự trọn vẹn với sashimi tươi ngon và hơn 100 món ăn tinh hoa Nhật Bản khác.",
            images: [
                "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&auto=format&fit=crop&q=60",
                "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=800&auto=format&fit=crop&q=60"
            ]
        }
    };

    const venueModal = document.getElementById("venueModal");
    const modalVenueTitle = document.getElementById("modalVenueTitle");
    const modalVenueDesc = document.getElementById("modalVenueDesc");
    const modalGalleryContainer = document.getElementById("modalGalleryContainer");
    const closeModalBtn = document.getElementById("closeModalBtn");

    document.addEventListener("click", (e) => {
        const btn = e.target.closest(".open-venue-modal");
        if (btn) {
            e.preventDefault();
            e.stopPropagation();
            const key = btn.getAttribute("data-venue");
            const data = venueData[key];
            if (data && venueModal) {
                if (modalVenueTitle) modalVenueTitle.textContent = data.title;
                if (modalVenueDesc) modalVenueDesc.textContent = data.desc;
                if (modalGalleryContainer) {
                    modalGalleryContainer.innerHTML = data.images.map(img => 
                        `<img src="${img}" alt="${data.title}" class="modal-gallery-item mb-3" />`
                    ).join("");
                }
                venueModal.classList.add("active");
                document.body.style.overflow = "hidden";
            }
        }
    });

    const closeModalBtnBottom = document.getElementById("closeModalBtnBottom");

    const closeModal = () => {
        if (venueModal) {
            venueModal.classList.remove("active");
            document.body.style.overflow = "";
        }
    };

    if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);
    if (closeModalBtnBottom) closeModalBtnBottom.addEventListener("click", closeModal);
    if (venueModal) {
        venueModal.addEventListener("click", (e) => {
            if (e.target === venueModal) closeModal();
        });
    }

    // ============ DINNER GROUP CHANGE LOGIC ============
    const dinnerGroupRadios = document.querySelectorAll('input[name="dinner_group"]');
    const sushiSubList = document.getElementById("sushiSubList");
    const khacSubList = document.getElementById("khacSubList");

    dinnerGroupRadios.forEach(radio => {
        radio.addEventListener("change", () => {
            const val = radio.value;
            
            // Toggle sublist visibility
            if (val === "sushi") {
                if (sushiSubList) sushiSubList.classList.remove("hidden");
                if (khacSubList) khacSubList.classList.add("hidden");
                
                // Auto-select first sushi option
                const firstSushi = sushiSubList ? sushiSubList.querySelector('input[name="dinner_option"]') : null;
                if (firstSushi) firstSushi.checked = true;
            } else if (val === "khac") {
                if (sushiSubList) sushiSubList.classList.add("hidden");
                if (khacSubList) khacSubList.classList.remove("hidden");
                
                // Uncheck sushi radio options
                document.querySelectorAll('input[name="dinner_option"]').forEach(opt => {
                    opt.checked = false;
                });

                // Focus input
                const otherInput = document.getElementById("otherDinnerInput");
                if (otherInput) otherInput.focus();
            }
        });
    });

    // ============ MOVIE TRAILER SWITCH LOGIC ============
    const movieRadios = document.querySelectorAll('.movie-radio');
    const activeMovieIframe = document.getElementById('activeMovieIframe');
    const activeMovieTitle = document.getElementById('activeMovieTitle');

    movieRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            const trailerUrl = radio.getAttribute('data-trailer');
            const titleText = radio.getAttribute('data-title');
            if (activeMovieIframe && trailerUrl) {
                activeMovieIframe.src = trailerUrl;
            }
            if (activeMovieTitle && titleText) {
                activeMovieTitle.textContent = titleText;
            }
        });
    });

    // ============ DRINKS GROUP CHANGE LOGIC ============
    const drinksGroupRadios = document.querySelectorAll('input[name="drinks_group"]');
    const rooftopSubList = document.getElementById("rooftopSubList");
    const cocktailSubList = document.getElementById("cocktailSubList");
    const khacActivitySubList = document.getElementById("khacActivitySubList");

    drinksGroupRadios.forEach(radio => {
        radio.addEventListener("change", () => {
            const val = radio.value;
            
            // Toggle sublist visibility
            if (val === "rooftop") {
                if (rooftopSubList) rooftopSubList.classList.remove("hidden");
                if (cocktailSubList) cocktailSubList.classList.add("hidden");
                if (khacActivitySubList) khacActivitySubList.classList.add("hidden");
                
                // Auto-select first option
                const firstOpt = rooftopSubList ? rooftopSubList.querySelector('input[name="drinks_option"]') : null;
                if (firstOpt) firstOpt.checked = true;
            } else if (val === "cocktail") {
                if (rooftopSubList) rooftopSubList.classList.add("hidden");
                if (cocktailSubList) cocktailSubList.classList.remove("hidden");
                if (khacActivitySubList) khacActivitySubList.classList.add("hidden");
                
                // Auto-select first option
                const firstOpt = cocktailSubList ? cocktailSubList.querySelector('input[name="drinks_option"]') : null;
                if (firstOpt) firstOpt.checked = true;
            } else if (val === "khac_activity") {
                if (rooftopSubList) rooftopSubList.classList.add("hidden");
                if (cocktailSubList) cocktailSubList.classList.add("hidden");
                if (khacActivitySubList) khacActivitySubList.classList.remove("hidden");
                
                document.querySelectorAll('input[name="drinks_option"]').forEach(opt => {
                    opt.checked = false;
                });

                const otherActInput = document.getElementById("otherActivityInput");
                if (otherActInput) otherActInput.focus();
            }
        });
    });

    // ============ FORM SUBMISSION LOGIC ============
    invitationForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        const submitBtn = invitationForm.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.style.opacity = "0.7";
        submitBtn.innerText = "Đang gửi phản hồi...";

        // Collect form data
        const selectedDinnerGroup = document.querySelector('input[name="dinner_group"]:checked').value;
        let dinnerOption = "";
        
        if (selectedDinnerGroup === "khac") {
            const otherVal = document.getElementById("otherDinnerInput") ? document.getElementById("otherDinnerInput").value.trim() : "";
            dinnerOption = otherVal ? `Lựa chọn khác: ${otherVal}` : "Lựa chọn khác (Chưa điền cụ thể)";
        } else {
            const selectedDinnerRadio = document.querySelector('input[name="dinner_option"]:checked');
            dinnerOption = selectedDinnerRadio ? selectedDinnerRadio.value : "Chưa chọn";
        }
        
        const selectedDrinksGroup = document.querySelector('input[name="drinks_group"]:checked').value;
        let drinksOption = "";

        if (selectedDrinksGroup === "khac_activity") {
            const otherActVal = document.getElementById("otherActivityInput") ? document.getElementById("otherActivityInput").value.trim() : "";
            drinksOption = otherActVal ? `Lựa chọn khác: ${otherActVal}` : "Lựa chọn khác (Chưa điền cụ thể)";
        } else {
            const selectedDrinksRadio = document.querySelector('input[name="drinks_option"]:checked');
            drinksOption = selectedDrinksRadio ? selectedDrinksRadio.value : "Chưa chọn";
        }
        const selectedDresscodeRadio = document.querySelector('input[name="dresscode"]:checked');
        const dresscodeOption = selectedDresscodeRadio ? selectedDresscodeRadio.value : "Chưa chọn";
        
        const dateOption = document.getElementById("datePicker").value || "05/08/2026";
        const timeOption = document.getElementById("timePicker").value || "19:00";
        const noteMessage = document.getElementById("noteInput").value.trim() || "(Không có lời nhắn)";

        function escapeHtml(str) {
            return String(str)
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;");
        }

        // Construct message payload
        const textMessage = `
💌 <b>PHẢN HỒI LỜI MỜI HẸN HÒ</b>

🍽️ <b>Bữa tối:</b> ${escapeHtml(dinnerOption)}
☕ <b>Hoạt động:</b> ${escapeHtml(drinksOption)}
👗 <b>Dresscode:</b> ${escapeHtml(dresscodeOption)}
📅 <b>Ngày hẹn:</b> ${escapeHtml(dateOption)}
⏰ <b>Giờ hẹn:</b> ${escapeHtml(timeOption)}
📝 <b>Lời nhắn:</b> <i>"${escapeHtml(noteMessage)}"</i>
        `.trim();

        try {
            const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_CONFIG.BOT_TOKEN}/sendMessage`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    chat_id: TELEGRAM_CONFIG.CHAT_ID,
                    text: textMessage,
                    parse_mode: "HTML"
                })
            });

            if (response.ok) {
                invitationContent.classList.add("hidden");
                successState.classList.remove("hidden");
                successState.classList.add("fade-in");
            } else {
                const errData = await response.json().catch(() => ({}));
                console.error("Telegram API Error:", errData);
                alert("Gửi phản hồi thất bại: " + (errData.description || "Token Bot Telegram chưa chính xác!"));
            }
        } catch (error) {
            console.error("Error sending response:", error);
            alert("Đã xảy ra lỗi mạng khi kết nối tới Telegram.");
        } finally {
            submitBtn.disabled = false;
            submitBtn.style.opacity = "1";
            submitBtn.innerText = "Gửi phản hồi";
        }
    });
});
