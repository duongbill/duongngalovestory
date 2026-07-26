// Comprehensive Automated Test Suite for InLove Date Invitation Web App
const fs = require('fs');
const path = require('path');

console.log("==================================================");
console.log("   AUTOMATED TEST SUITE: INLOVE DATE INVITATION   ");
console.log("==================================================\n");

// Configuration
const BOT_TOKEN = "8926669399:AAEcGtM5E5Ua1YXcC_Xc7BeCGvbR8h8wfgM";
const CHAT_ID = "1898063540";

function escapeHtml(str) {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

function buildPayload(data) {
    let dinnerOption = "";
    if (data.dinner_group === "khac") {
        dinnerOption = data.other_dinner_input ? `Lựa chọn khác: ${data.other_dinner_input}` : "Lựa chọn khác (Chưa điền cụ thể)";
    } else {
        dinnerOption = data.dinner_option || "Chưa chọn";
    }

    let drinksOption = "";
    if (data.drinks_group === "khac_activity") {
        drinksOption = data.other_activity_input ? `Lựa chọn khác: ${data.other_activity_input}` : "Lựa chọn khác (Chưa điền cụ thể)";
    } else {
        drinksOption = data.drinks_option || "Chưa chọn";
    }

    const dateOption = data.datePicker || "05/08/2026";
    const timeOption = data.timePicker || "19:00";
    const noteMessage = data.noteInput || "(Không có lời nhắn)";

    const textMessage = `
💌 <b>PHẢN HỒI LỜI MỜI HẸN HÒ</b>

🍽️ <b>Bữa tối:</b> ${escapeHtml(dinnerOption)}
☕ <b>Hoạt động:</b> ${escapeHtml(drinksOption)}
📅 <b>Ngày hẹn:</b> ${escapeHtml(dateOption)}
⏰ <b>Giờ hẹn:</b> ${escapeHtml(timeOption)}
📝 <b>Lời nhắn:</b> <i>"${escapeHtml(noteMessage)}"</i>
    `.trim();

    return textMessage;
}

async function sendTelegramMessage(text) {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            chat_id: CHAT_ID,
            text: text,
            parse_mode: "HTML"
        })
    });
    const json = await res.json();
    return { ok: res.ok, status: res.status, json };
}

// Test Cases Definition
const testCases = [
    {
        id: "CASE_1_DEFAULT",
        name: "Case 1: Mặc định (Sushi TAKEYA + Phim Người nhện + Ngày 05/08/2026)",
        input: {
            dinner_group: "sushi",
            dinner_option: "Sushi: TAKEYA",
            drinks_group: "rooftop",
            drinks_option: "Phim: Người nhện: Khởi đầu mới",
            datePicker: "2026-08-05",
            timePicker: "19:00",
            noteInput: ""
        }
    },
    {
        id: "CASE_2_CUSTOM_DINNER",
        name: "Case 2: Chọn bữa tối tùy chỉnh (Ghi món riêng: Bún đậu mắm tôm)",
        input: {
            dinner_group: "khac",
            other_dinner_input: "Bún đậu mắm tôm ngon nhất Hà Nội & Trà tắc",
            drinks_group: "rooftop",
            drinks_option: "Phim: The Odyssey",
            datePicker: "2026-08-05",
            timePicker: "19:30",
            noteInput: "Anh nhớ đón em đúng giờ nhen!"
        }
    },
    {
        id: "CASE_3_CUSTOM_ACTIVITY",
        name: "Case 3: Chọn hoạt động tùy chỉnh (Đi dạo Hồ Tây hóng gió)",
        input: {
            dinner_group: "sushi",
            dinner_option: "Sushi: Zen Sushi",
            drinks_group: "khac_activity",
            other_activity_input: "Đi dạo Hồ Tây hóng gió & Ăn kem Tràng Tiền",
            datePicker: "2026-08-05",
            timePicker: "20:00",
            noteInput: "Anh chuẩn bị áo khoác cho em nữa"
        }
    },
    {
        id: "CASE_4_SPECIAL_CHARS",
        name: "Case 4: Ký tự đặc biệt HTML (Tránh lỗi 400 Bad Request Telegram)",
        input: {
            dinner_group: "khac",
            other_dinner_input: "Lẩu Thái Tomyum <Cay & Đậm Đà>",
            drinks_group: "cocktail",
            drinks_option: "Game: Tiếp tục chơi tiếp game lần trước hai đứa mình chơi dở",
            datePicker: "2026-08-05",
            timePicker: "19:00",
            noteInput: "Lưu ý: <script>alert('test')</script> & \"ngon quá\" -> 100%"
        }
    },
    {
        id: "CASE_5_EMPTY_CUSTOM_INPUTS",
        name: "Case 5: Chọn mục Khác nhưng để trống không điền chữ",
        input: {
            dinner_group: "khac",
            other_dinner_input: "",
            drinks_group: "khac_activity",
            other_activity_input: "",
            datePicker: "2026-08-05",
            timePicker: "19:00",
            noteInput: ""
        }
    }
];

async function runTests() {
    let passed = 0;
    let failed = 0;

    for (const test of testCases) {
        console.log(`--------------------------------------------------`);
        console.log(`🧪 Running: ${test.name}`);
        
        const payload = buildPayload(test.input);
        console.log(`📄 Payload Generated:\n${payload}\n`);

        try {
            const result = await sendTelegramMessage(payload);
            if (result.ok && result.json.ok) {
                console.log(`✅ TEST PASSED! Message ID: ${result.json.result.message_id}`);
                passed++;
            } else {
                console.log(`❌ TEST FAILED! Error Code: ${result.json.error_code}, Description: ${result.json.description}`);
                failed++;
            }
        } catch (err) {
            console.log(`❌ NETWORK EXCEPTION: ${err.message}`);
            failed++;
        }
    }

    console.log(`==================================================`);
    console.log(`   TEST SUMMARY: ${passed} PASSED, ${failed} FAILED   `);
    console.log(`==================================================`);
}

runTests();
