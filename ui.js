
/* ======================================= [S] **** [S] ======================================= */
// UI 
/*==============================================================================================*/
let startcommState = false;


// ===============================
// START FUNCTION
// ===============================
async function startComm() {

    console.log("START FUNCTION RUNNING");

    run()
}


// ===============================
// STOP FUNCTION
// ===============================
async function stopComm() {

    alert("STOP FUNCTION RUNNING");

    // imong stop logic diri
    // await ...
}


// ===============================
// UPDATE BUTTON
// ===============================
function updateStartComm() {

    $("#startcomm")
        .text(startcommState ? "Stop" : "Start")
        .css(
            "background",
            startcommState ? "#dc2626" : "#111827"
        );
}


// ===============================
// LOAD SAVED STATE
// ===============================
async function loadStartCommState() {

    const result = await chrome.storage.local.get("startcomm");

    startcommState = result.startcomm === true;

    // Update button
    updateStartComm();


    // Run the function based on saved state
    if (startcommState) {

        await startComm();

    } else {

        await stopComm();

    }
}


// ===============================
// TOGGLE BUTTON
// ===============================
$(document).on("click", "#startcomm", async function () {
            // Toggle state
            startcommState = !startcommState;


            // Save state FIRST
            await chrome.storage.local.set({
                startcomm: startcommState
            });


            // Update button
            updateStartComm();


            // Run corresponding function
            if (startcommState) {

                await startComm();

            } else {

                await stopComm();

            }

});


// ===============================
// INITIALIZE
// ===============================
loadStartCommState();









// ==========================================
// INPUTS TO SAVE
// ==========================================
const savedInputs = [
    "#firstmsg",
    "#secondmsg",
    "#thirdmsg",
    "#nname",
    "#pnumber"
];


// ==========================================
// LOAD SAVED INPUTS
// ==========================================
async function loadSavedInputs() {

    const result = await chrome.storage.local.get([
        "firstmsg",
        "secondmsg",
        "thirdmsg",
        "nname",
        "pnumber"
    ]);

    if (result.firstmsg !== undefined) {
        $("#firstmsg").val(result.firstmsg);
    }

    if (result.secondmsg !== undefined) {
        $("#secondmsg").val(result.secondmsg);
    }

    if (result.thirdmsg !== undefined) {
        $("#thirdmsg").val(result.thirdmsg);
    }

    if (result.nname !== undefined) {
        $("#nname").val(result.nname);
    }

    if (result.pnumber !== undefined) {
        $("#pnumber").val(result.pnumber);
    }
}


// ==========================================
// SAVE INPUT WHEN TYPING
// ==========================================
$(document).on("input", "#firstmsg, #secondmsg, #thirdmsg, #nname, #pnumber", async function () {

    const id = this.id;
    const value = $(this).val();

    await chrome.storage.local.set({
        [id]: value
    });

});


// ==========================================
// LOAD ON PAGE START
// ==========================================
loadSavedInputs();







export function injectUI() {
    let bodyholder = document.querySelector("body");

    bodyholder.insertAdjacentHTML("beforeend", `
<div style="
    z-index:9999;
    position:fixed;
    bottom:0%;
    left:0%;
    width:250px;
    box-sizing:border-box;
    padding:14px;
    background:#ffffff;
    border:1px solid #e5e7eb;
    border-radius:14px;
    box-shadow:0 10px 30px rgba(0,0,0,.15);
    font-family:Arial, sans-serif;
">

    <!-- Header -->
    <div style="
        width:100%;
        display:flex;
        flex-flow:row;
        margin-bottom:14px;
        justify-content:space-between;
        align-items:center;
    ">

        <div style="
            font-size:14px;
            font-weight:600;
            color:#111827;
        ">
            Message Runner
        </div>

        <div>
            <button
                id="mover"
                title="Drag to move"
                style="
                    width:30px;
                    height:30px;
                    padding:0;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    border:0;
                    border-radius:8px;
                    background:#f3f4f6;
                    color:#6b7280;
                    cursor:pointer;
                    transition:all .2s ease;
                    cursor:move;
                "
                onmouseover="this.style.background='#e5e7eb';this.style.color='#111827'"
                onmouseout="this.style.background='#f3f4f6';this.style.color='#6b7280'"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="18px"
                    viewBox="0 -960 960 960"
                    width="18px"
                    fill="currentColor"
                >
                    <path d="M480-80 310-250l57-57 73 73v-206H235l73 72-58 58L80-480l169-169 57 57-72 72h206v-206l-73 73-57-57 170-170 170 170-57 57-73-73v206h205l-73-72 58-58 170 170-170 170-57-57 73-73H520v205l72-73 58 58L480-80Z"/>
                </svg>
            </button>
        </div>

    </div>


    <!-- Form -->
    <div style="
        display:flex;
        flex-flow:column;
        gap:8px;
    ">

        <input
            type="text"
            placeholder="1st message"
            id="firstmsg"
            style="
                width:100%;
                height:36px;
                box-sizing:border-box;
                padding:0 10px;
                border:1px solid #d1d5db;
                border-radius:8px;
                outline:none;
                background:#f9fafb;
                color:#111827;
                font-size:12px;
            "
        >

        <input
            type="text"
            placeholder="2nd message"
            id="secondmsg"
            style="
                width:100%;
                height:36px;
                box-sizing:border-box;
                padding:0 10px;
                border:1px solid #d1d5db;
                border-radius:8px;
                outline:none;
                background:#f9fafb;
                color:#111827;
                font-size:12px;
            "
        >

        <input
            type="text"
            placeholder="3rd message"
            id="thirdmsg"
            style="
                width:100%;
                height:36px;
                box-sizing:border-box;
                padding:0 10px;
                border:1px solid #d1d5db;
                border-radius:8px;
                outline:none;
                background:#f9fafb;
                color:#111827;
                font-size:12px;
            "
        >

        
        <div style="height:10px;"></div>

        <input
            type="text"
            id="nname"
            placeholder="Username"
            style="
                width:100%;
                height:36px;
                box-sizing:border-box;
                padding:0 10px;
                border:1px solid #d1d5db;
                border-radius:8px;
                outline:none;
                background:#f9fafb;
                color:#111827;
                font-size:12px;
            "
        >

        <input
            type="text"
            id="pnumber"
            placeholder="Contact number"
            style="
                width:100%;
                height:36px;
                box-sizing:border-box;
                padding:0 10px;
                border:1px solid #d1d5db;
                border-radius:8px;
                outline:none;
                background:#f9fafb;
                color:#111827;
                font-size:12px;
            "
        >

        <button
            id="startcomm"
            style="
                width:100%;
                height:38px;
                margin-top:4px;
                border:0;
                border-radius:8px;
                padding:0 12px;
                background:#111827;
                color:#ffffff;
                font-size:12px;
                font-weight:600;
                cursor:pointer;
                box-shadow:0 4px 10px rgba(0,0,0,.12);
                transition:all .2s ease;
            "
            onmouseover="this.style.background='#000000';this.style.transform='translateY(-1px)'"
            onmouseout="this.style.background='#111827';this.style.transform='translateY(0)'"
        >
            Start
        </button>

    </div>

</div>
    `);





}
/* ======================================= [E] **** [E] ======================================= */


let mouseLocked = false; 
let avatars = []
globalThis.messagexx = ""
globalThis.counterxx = ""
globalThis.userxx = ""



 
// ============================================================
// MOUSE LOCK
// ============================================================

function lockMouse() {

    if (mouseLocked) return;

    mouseLocked = true;

    const blockMouse = (event) => {

        if (!mouseLocked) return;

        event.preventDefault();
        event.stopImmediatePropagation();
    };

    window.__mouseLockHandler = blockMouse;

    window.addEventListener(
        'pointerdown',
        blockMouse,
        true
    );

    window.addEventListener(
        'pointerup',
        blockMouse,
        true
    );

    window.addEventListener(
        'mousedown',
        blockMouse,
        true
    );

    window.addEventListener(
        'mouseup',
        blockMouse,
        true
    );

    window.addEventListener(
        'click',
        blockMouse,
        true
    );

    window.addEventListener(
        'dblclick',
        blockMouse,
        true
    );

    window.addEventListener(
        'contextmenu',
        blockMouse,
        true
    );

    console.log('🔒 Mouse locked');
}


// ============================================================
// MOUSE UNLOCK
// ============================================================
function unlockMouse() {

    if (!mouseLocked) return;

    mouseLocked = false;

    const blockMouse =
        window.__mouseLockHandler;

    if (!blockMouse) return;

    window.removeEventListener(
        'pointerdown',
        blockMouse,
        true
    );

    window.removeEventListener(
        'pointerup',
        blockMouse,
        true
    );

    window.removeEventListener(
        'mousedown',
        blockMouse,
        true
    );

    window.removeEventListener(
        'mouseup',
        blockMouse,
        true
    );

    window.removeEventListener(
        'click',
        blockMouse,
        true
    );

    window.removeEventListener(
        'dblclick',
        blockMouse,
        true
    );

    window.removeEventListener(
        'contextmenu',
        blockMouse,
        true
    );

    window.__mouseLockHandler = null;

    console.log('🔓 Mouse unlocked');
}
 





/* ======================================= [S] **** [S] ======================================= */
// PAG CLICK SA BUTTON
/*==============================================================================================*/
function clickMessagesButton(html, callback) {
    const temp = document.createElement('div');
    temp.innerHTML = html.trim();

    const target = temp.firstElementChild;

    if (!target) {
        if (callback) callback(false);
        return;
    }

    const ariaLabel = target.getAttribute('aria-label');

    if (!ariaLabel) {
        if (callback) callback(false);
        return;
    }

    const button = document.querySelector(
        `button[aria-label="${CSS.escape(ariaLabel)}"]`
    );

    if (!button) {
        if (callback) callback(false);
        return;
    }

    // Click first
    button.click();

    // Then run callback
    if (callback) {
        callback(true);
    }
}
/* ======================================= [E] **** [E] ======================================= */




// ============================================================
// SCROLL ALL CONVERSATIONS
// ============================================================
function scrollAllConversations(onComplete) {

    const SELECTOR =
        'button[aria-label^="Conversation with "]';

    const WAIT_TIME = 1200;

    const MAX_NO_CHANGE = 5;

    let lastCount = 0;

    let noChangeCount = 0;

    let finished = false;


    // ========================================================
    // GET CURRENT CONVERSATION BUTTONS
    // ========================================================

    function getButtons() {

        return [
            ...document.querySelectorAll(SELECTOR)
        ];
    }


    // ========================================================
    // SCROLL LAST BUTTON
    // ========================================================

    function scrollLastButton() {

        const buttons = getButtons();

        if (!buttons.length) {
            return false;
        }

        const lastButton =
            buttons[buttons.length - 1];


        console.log(
            `⬇️ Scrolling → ${buttons.length}`
        );


        lastButton.scrollIntoView({
            behavior: 'smooth',
            block: 'end'
        });


        return true;
    }


    // ========================================================
    // REACT DOM OBSERVER
    // ========================================================

    const observer =
        new MutationObserver(() => {

            const buttons =
                getButtons();

            const count =
                buttons.length;


            if (count !== lastCount) {

                console.log(
                    `🔄 React DOM changed: ${lastCount} → ${count}`
                );
            }
        });


    observer.observe(
        document.body,
        {
            childList: true,
            subtree: true
        }
    );


    // ========================================================
    // FINISH FUNCTION
    // ========================================================

    function finish() {

        if (finished) {
            return;
        }

        finished = true;


        observer.disconnect();


        const finalCount =
            getButtons().length;


        console.log(
            `✅ DONE! Total conversations: ${finalCount}`
        );


        // Unlock mouse ONLY after everything is loaded
        unlockMouse();


        // Resolve callback
        if (
            typeof onComplete ===
            'function'
        ) {

            onComplete(finalCount);
        }


        return finalCount;
    }


    // ========================================================
    // START
    // ========================================================

    lockMouse();


    // ========================================================
    // ASYNC LOOP
    // ========================================================

    (async function run() {

        while (!finished) {

            const buttons =
                getButtons();

            const currentCount =
                buttons.length;


            // ------------------------------------------------
            // WAIT FOR INITIAL CONVERSATIONS
            // ------------------------------------------------

            if (!currentCount) {

                console.log(
                    '👀 Waiting for conversations...'
                );


                await new Promise(resolve =>
                    setTimeout(
                        resolve,
                        800
                    )
                );


                continue;
            }


            // ------------------------------------------------
            // FIRST LOAD
            // ------------------------------------------------

            if (lastCount === 0) {

                lastCount =
                    currentCount;


                console.log(
                    `🚀 Found ${currentCount} conversations`
                );


                scrollLastButton();
            }


            // ------------------------------------------------
            // NEW CONVERSATIONS
            // ------------------------------------------------

            else if (
                currentCount >
                lastCount
            ) {

                console.log(
                    `➕ NEW: ${lastCount} → ${currentCount}`
                );


                lastCount =
                    currentCount;


                noChangeCount = 0;


                // Give React time to finish
                // rendering the new DOM
                await new Promise(resolve =>
                    setTimeout(
                        resolve,
                        400
                    )
                );


                // Scroll again
                scrollLastButton();
            }


            // ------------------------------------------------
            // NO NEW CONVERSATIONS
            // ------------------------------------------------

            else {

                noChangeCount++;


                console.log(
                    `⏳ No new conversations: ${noChangeCount}/${MAX_NO_CHANGE}`
                );


                // Continue triggering scroll
                scrollLastButton();


                // ------------------------------------------------
                // FINISHED
                // ------------------------------------------------

                if (
                    noChangeCount >=
                    MAX_NO_CHANGE
                ) {

                    finish();

                    break;
                }
            }


            // ------------------------------------------------
            // WAIT BEFORE NEXT CHECK
            // ------------------------------------------------

            await new Promise(resolve =>
                setTimeout(
                    resolve,
                    WAIT_TIME
                )
            );
        }

    })();
}
/* ======================================= [E] **** [E] ======================================= */





/* ======================================= [S] **** [S] ======================================= */
// KWAON TANAN USER
/*==============================================================================================*/
function getAllConversations() {

    const buttons = [
        ...document.querySelectorAll(
            'button[aria-label^="Conversation with "]'
        )
    ];

    const conversations = buttons.map((button, index) => {

        // =========================================
        // USERNAME
        // =========================================

        const ariaLabel =
            button.getAttribute('aria-label') || '';

        const username =
            ariaLabel.replace(
                'Conversation with ',
                ''
            ).trim();


        // =========================================
        // IMAGE
        // =========================================

        const imageElement =
            button.querySelector('img');

        const image =
            imageElement?.src ||
            imageElement?.getAttribute('srcset')
                ?.split(' ')[0] ||
            '';


        // =========================================
        // TO READ
        // =========================================

        const toread =
            !!button.querySelector('.Y8xri');


        // =========================================
        // GENERATE ID
        // =========================================

        const id =
            'ddkfjeeedfe'.slice(0, 6) +
            Date.now().toString(36) +
            Math.random()
                .toString(36)
                .slice(2, 7);


        // =========================================
        // ADD ID TO BUTTON
        // =========================================

        button.setAttribute(
            'grayowl_id',
            id
        );


        // =========================================
        // RETURN OBJECT
        // =========================================

        return {
            username: username,
            image: image,
            toread: toread,
            id: id
        };
    });


    console.log(
        '📦 Conversations:',
        conversations
    );


    return conversations;
}
/* ======================================= [E] **** [E] ======================================= */






/* ======================================= [S] **** [S] ======================================= */
// TIMER
/*==============================================================================================*/
function timers(callback, timer) {

    return new Promise((resolve) => {

        setTimeout(async () => {

            const result = await callback();

            resolve(result);

        }, timer);

    });
}
/* ======================================= [E] **** [E] ======================================= */


function reloadPage() {
    location.reload();
}


/* ======================================= [S] **** [S] ======================================= */
// Clcik Random User
/*==============================================================================================*/
function clickRandomToRead(users) {
    // 1. Get only users nga toread === true
    const toReadUsers = users.filter(user => user.toread === true);

    if (toReadUsers.length === 0) {
        console.log("Wala nay user nga toread.");
        setTimeout(() => {
            reloadPage() 
        }, 2000);
        return null;
    }

    // 2. Randomly select one user
    const randomIndex = Math.floor(Math.random() * toReadUsers.length);
    const selectedUser = toReadUsers[randomIndex];

    // 3. Get username
    const username = selectedUser.username;

    console.log("Selected username:", username);

    // 4. Find the conversation button
    const button = document.querySelector(
        `button[aria-label="Conversation with ${CSS.escape(username)}"]`
    );

    if (!button) {
        console.log(`Conversation button not found for: ${username}`);
        return null;
    }

    // 5. React-friendly click
    button.dispatchEvent(new MouseEvent("mousedown", {
        bubbles: true,
        cancelable: true,
        view: window
    }));

    button.dispatchEvent(new MouseEvent("mouseup", {
        bubbles: true,
        cancelable: true,
        view: window
    }));

    button.click();

    console.log(`Clicked conversation: ${username}`);
    userxx = selectedUser

    return selectedUser;
}
/* ======================================= [E] **** [E] ======================================= */






/* ======================================= [S] **** [S] ======================================= */
// SENT MESSAGE
/*==============================================================================================*/
async function setMessage(message = "") {

    const textarea = document.querySelector(
        'textarea.xXTjk'
    );

    if (!textarea) {
        console.log("❌ Textarea not found");
        return false;
    }

    textarea.focus();

    // Clear existing content using real keyboard action
    textarea.select();

    document.execCommand(
        "delete"
    );

    // Type character by character
    for (const char of message) {

        const beforeInput = new InputEvent(
            "beforeinput",
            {
                bubbles: true,
                cancelable: true,
                inputType: "insertText",
                data: char
            }
        );

        textarea.dispatchEvent(
            beforeInput
        );

        // Native setter
        const setter =
            Object.getOwnPropertyDescriptor(
                HTMLTextAreaElement.prototype,
                "value"
            )?.set;

        if (setter) {
            setter.call(
                textarea,
                textarea.value + char
            );
        }

        textarea.dispatchEvent(
            new InputEvent(
                "input",
                {
                    bubbles: true,
                    inputType: "insertText",
                    data: char
                }
            )
        );

        // Small delay so React can process it
        await new Promise(resolve =>
            setTimeout(resolve, 10)
        );
    }

    // Final change event
    textarea.dispatchEvent(
        new Event("change", {
            bubbles: true
        })
    );

    // Resize
    textarea.style.height = "auto";
    textarea.style.height =
        textarea.scrollHeight + "px";

    console.log(
        "📝 Final value:",
        textarea.value
    );

    return textarea.value === message;
}
/* ======================================= [E] **** [E] ======================================= */




/* ======================================= [S] **** [S] ======================================= */
// GENERATE IMAGE
/*==============================================================================================*/
 function imgGen(username, img, userx, whatthePack) {
  return new Promise((resolve) => {

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const bg = new Image();
    bg.crossOrigin = "anonymous";
    bg.src = chrome.runtime.getURL("l.jpg");

    bg.onload = () => {

      // =========================
      // ✅ AUTO CANVAS SIZE (BASED SA BG RATIO)
      // =========================
      const baseWidth = 832;
      const ratio = bg.width / bg.height;

      canvas.width = baseWidth;
      canvas.height = baseWidth / ratio;

      // =========================
      // ✅ DRAW BG (NO STRETCH, CENTER)
      // =========================
      const scale = Math.min(canvas.width / bg.width, canvas.height / bg.height);

      const drawWidth = bg.width * scale;
      const drawHeight = bg.height * scale;

      const offsetX = (canvas.width - drawWidth) / 2;
      const offsetY = (canvas.height - drawHeight) / 2;

      ctx.drawImage(bg, offsetX, offsetY, drawWidth, drawHeight);

      // =========================
      // 🧠 SCALE FACTOR (para dili maguba imong layout)
      // =========================
      const scaleX = canvas.width / 932;
      const scaleY = canvas.height / 2230;

      // =========================
      // AVATAR
      // =========================
      const avatar = new Image();
      avatar.crossOrigin = "anonymous";
      avatar.src = img;

      avatar.onload = () => {

        const x = 390 * scaleX;
        const y = 360 * scaleY;
        const size = 150 * scaleX;

        ctx.drawImage(avatar, x, y, size, size);

        // =========================
        // TEXTS
        // =========================
        ctx.fillStyle = "white";
        ctx.font = `${40 * scaleX}px Segoe UI`;
        ctx.textAlign = "center";
        ctx.fillText(username, canvas.width / 2, 664 * scaleY);

        ctx.fillStyle = "#5668ec";
        ctx.font = `bold ${50* scaleX}px Segoe UI`;
        ctx.textAlign = "center";
        ctx.fillText(userx, 380 * scaleX, 1999 * scaleY);

        // para sa whats_app
        ctx.fillStyle = "white";
        ctx.font = `bold ${25* scaleX}px Segoe UI`;
        ctx.textAlign = "center";
        ctx.fillText(whatthePack, 710 * scaleX, 1988 * scaleY);
 
        resolve(canvas.toDataURL("image/jpeg", 0.8));
      };

      avatar.onerror = () => {
        console.warn("⚠️ Avatar failed");

        ctx.fillStyle = "#222";
        ctx.fillRect(390 * scaleX, 360 * scaleY, 51 * scaleX, 51 * scaleY);

        ctx.fillStyle = "#57b2e0";
        ctx.font = `bold ${40 * scaleX}px Segoe UI`;
        ctx.textAlign = "center";
        ctx.fillText(username, canvas.width / 2, 750 * scaleY);

        resolve(canvas.toDataURL("image/jpeg", 0.8));
      };
    };

    bg.onerror = () => {
      console.error("❌ BG failed");
      resolve(null);
    };

  });
}
/* ======================================= [E] **** [E] ======================================= */


/* ======================================= [S] **** [S] ======================================= */
// SENT IMAGE TO MESSAGE BOX
/*==============================================================================================*/
// async function sentBasesixfour(base64) {
//   function base64ToBlob(base64) {
//     const parts = base64.split(',');
//     const mime = parts[0].match(/:(.*?);/)[1];
//     const binary = atob(parts[1]);

//     const array = [];

//     for (let i = 0; i < binary.length; i++) {
//       array.push(binary.charCodeAt(i));
//     }

//     return new Blob([new Uint8Array(array)], { type: mime });
//   }

//   const input = await waitForElement('input[type="file"]', document.body, 8000);

//   if (!input) return false;

//   const blob = base64ToBlob(base64);
//   const file = new File([blob], "upload.jpg", { type: blob.type });

//   const dt = new DataTransfer();
//   dt.items.add(file);

//   const nativeSetter = Object.getOwnPropertyDescriptor(
//     HTMLInputElement.prototype,
//     "files"
//   ).set;

//   nativeSetter.call(input, dt.files);

//   input.dispatchEvent(new Event("change", { bubbles: true }));
//   input.dispatchEvent(new Event("input", { bubbles: true }));

//   await wait(800);

//   const sendBtn = document.querySelector('button[aria-label="Send"]');

//   if (sendBtn && !sendBtn.disabled) {
//     sendBtn.click();
//   } else {
//     return false;
//   }

//   await wait(900);

//   return true;
// }

async function pasteImage(base64) {

    // =========================================
    // WAIT FOR TUMBLR IMAGE INPUT
    // =========================================

    const input = await new Promise((resolve) => {

        const findInput = () => {

            const el = document.querySelector(
                'button[aria-label="Upload an image"] input[type="file"]'
            );

            if (el) return el;

            // fallback
            return document.querySelector(
                'input[type="file"][accept*="image"]'
            );
        };


        const existing = findInput();

        if (existing) {
            resolve(existing);
            return;
        }


        const observer = new MutationObserver(() => {

            const element = findInput();

            if (element) {

                observer.disconnect();
                clearTimeout(timer);

                resolve(element);
            }

        });


        observer.observe(document.documentElement, {
            childList: true,
            subtree: true
        });


        const timer = setTimeout(() => {

            observer.disconnect();

            console.warn(
                "❌ Tumblr image input not found"
            );

            resolve(null);

        }, 10000);

    });


    if (!input) {
        return false;
    }


    console.log(
        "✅ Tumblr image input found:",
        input
    );


    // =========================================
    // BASE64 → BLOB
    // =========================================

    const [header, data] = base64.split(",");

    const mime =
        header.match(/data:(.*?);base64/)?.[1] ||
        "image/jpeg";


    const binary = atob(data);

    const bytes = new Uint8Array(
        binary.length
    );


    for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
    }


    const blob = new Blob(
        [bytes],
        {
            type: mime
        }
    );


    // =========================================
    // BLOB → FILE
    // =========================================

    const extension =
        mime === "image/png"
            ? "png"
            : mime === "image/webp"
                ? "webp"
                : mime === "image/gif"
                    ? "gif"
                    : "jpg";


    const file = new File(
        [blob],
        `pasted-image.${extension}`,
        {
            type: mime,
            lastModified: Date.now()
        }
    );


    // =========================================
    // PUT FILE INTO TUMBLR'S REAL INPUT
    // =========================================

    const dt = new DataTransfer();

    dt.items.add(file);


    const setter =
        Object.getOwnPropertyDescriptor(
            HTMLInputElement.prototype,
            "files"
        )?.set;


    if (!setter) {

        console.error(
            "❌ Cannot access input.files setter"
        );

        return false;
    }


    setter.call(
        input,
        dt.files
    );


    // =========================================
    // LET REACT HANDLE THE UPLOAD
    // =========================================

    input.dispatchEvent(
        new Event("change", {
            bubbles: true
        })
    );


    console.log(
        "📤 Image sent to Tumblr upload handler"
    );


    // =========================================
    // WAIT FOR TUMBLR TO CREATE ATTACHMENT
    // =========================================

    const attached = await new Promise((resolve) => {

        const check = () => {

            const image =
                document.querySelector(
                    'img[alt="Image to be sent"]'
                );


            const removeButton =
                document.querySelector(
                    'button[aria-label="Remove image from being sent"]'
                );


            if (image || removeButton) {
                return true;
            }


            return false;
        };


        if (check()) {
            resolve(true);
            return;
        }


        const observer = new MutationObserver(() => {

            if (check()) {

                observer.disconnect();
                clearTimeout(timer);

                resolve(true);
            }

        });


        observer.observe(document.documentElement, {
            childList: true,
            subtree: true
        });


        const timer = setTimeout(() => {

            observer.disconnect();

            resolve(false);

        }, 10000);

    });


    if (!attached) {

        console.warn(
            "⚠️ Tumblr did not create image attachment"
        );

        return false;
    }


    console.log(
        "✅ Image attached to Tumblr message"
    );


    return true;
}

/* ======================================= [E] **** [E] ======================================= */


/* ======================================= [S] **** [S] ======================================= */
// LOADDING WAITTER
/*==============================================================================================*/

function wait(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}
/* ======================================= [E] **** [E] ======================================= */
 



/* ======================================= [S] **** [S] ======================================= */
// PAG REPLAY 
/*==============================================================================================*/
function replay_message(replies) {

    function checkMessages(container) {

        const messages = [
            ...container.querySelectorAll("._0u3Ix.cidEK")
        ];

        if (!messages.length) return;


        /*
         * Get all messages and determine
         * which ones are OUR messages.
         */
        const myMessages = messages
            .filter(message => {

                const box = message.querySelector(".CvL1C");

                return box &&
                       box.classList.contains("gCivL");

            })
            .map(message => {

                const textElement = message.querySelector(".CX_9D > div:last-child");

                return textElement
                    ? textElement.textContent.trim()
                    : "";

            });


        /*
         * Find which replies from our array
         * already exist in the conversation.
         *
         * IMPORTANT:
         * No counting.
         * We check the actual TEXT.
         */
        let lastReplyIndex = -1;

        replies.forEach((reply, index) => {

            if (myMessages.includes(reply)) {
                lastReplyIndex = index;
            }

        });


        /*
         * Determine the next reply.
         */
        const nextIndex = lastReplyIndex + 1;


        /*
         * All replies already exist.
         */
        if (nextIndex >= replies.length) {
            console.log("All replies already sent.");
            return;
        }


        /*
         * Get the latest conversation message.
         */
        const lastMessage = messages[messages.length - 1];

        const lastBox = lastMessage.querySelector(".CvL1C");

        if (!lastBox) return;


        const lastIsMyMessage =
            lastBox.classList.contains("gCivL");


        /*
         * If the latest message is OUR message,
         * WAIT for the client.
         */
        if (lastIsMyMessage) {
            return;
        }


        /*
         * Latest message is CLIENT message.
         *
         * Now send the next reply.
         */
        const reply = replies[nextIndex];

        console.log("Replay:", reply);

        messagexx = reply;
        counterxx = nextIndex;
    }


    /*
     * Find .iI6zv and observe it.
     */
    function observeContainer() {

        const container = document.querySelector(".iI6zv");

        if (!container) return;


        /*
         * Prevent creating multiple observers
         * on the same container.
         */
        if (container.__replayObserver) {
            return;
        }


        const observer = new MutationObserver(() => {

            checkMessages(container);

        });


        observer.observe(container, {
            childList: true,
            subtree: true
        });


        container.__replayObserver = observer;


        /*
         * Initial check
         */
        checkMessages(container);
    }


    /*
     * Observe the page until .iI6zv appears.
     */
    const pageObserver = new MutationObserver(() => {

        observeContainer();

    });


    pageObserver.observe(document.body, {
        childList: true,
        subtree: true
    });


    /*
     * Check immediately.
     */
    observeContainer();


    return pageObserver;
}
/* ======================================= [E] **** [E] ======================================= */




 




async function sentImage(nnn) {
    if (Number(nnn) == 0) {
 
        const base64 = await imgGen(
        `@${userxx["username"]}`,
        `${userxx["image"]}`,
        `${$("#nname").val()}`,
        `${$("#pnumber").val()}`
    );

    if (base64) {

        await wait(300);

        const pasted = await pasteImage(base64);

        if (pasted) {
            console.log("✅ Image copied to clipboard");
        } else {
            console.log("❌ Image failed");
        }

        await wait(700);
    }
    } 

}













 



async function  step_one(params) {


        try {
            await clickRandomToRead(getAllConversations())
        } catch (error) {
            alert("error1 "+error)
        }


        try {
        await replay_message([
            `${$("#firstmsg").val()}`,
            `${$("#secondmsg").val()}`,
            `${$("#thirdmsg").val()}`])
        } catch (error) {
             alert("error2 "+error)
        }


        try {
             await timers(
            () => sentImage(counterxx),
            1000
        );
        } catch (error) {
            alert("error3 "+ error)
        }


        await timers(
            () => setMessage(messagexx),
            1000
        );


        await clickMessagesButton(`<button class="TRX6J nWfaK" aria-label="Send" type="submit"><span class="EvhBA" tabindex="-1"><div class="RR_oP"><div class="CMFMg bMGN0"><svg height="20" role="presentation" width="20" xmlns="http://www.w3.org/2000/svg"><use href="#managed-icon__airplane"></use></svg></div><div class="k76lX"><svg height="20" role="presentation" width="20" xmlns="http://www.w3.org/2000/svg"><use href="#managed-icon__airplane"></use></svg></div></div></span></button>`, async function(success) {
            })

        await timers(
            () => clickMessagesButton(`<button class="TRX6J" aria-label="Close"><span class="EvhBA" tabindex="-1"><svg height="14" role="presentation" width="14" xmlns="http://www.w3.org/2000/svg"><use href="#managed-icon__close-medium"></use></svg></span></button>`, async function(success) {
            }),
            2000
        );


        await timers(
            () => reloadPage(),
            300 
        );
}



 



















async function run(){

    await clickMessagesButton(`
        <button class="TRX6J js7rf" aria-label="Messages">
            <span class="EvhBA gWu0H" tabindex="-1">
                <div class="YQDd6">
                    <svg height="21" role="presentation" width="21">
                        <use href="#managed-icon__messaging"></use>
                    </svg>

                    <div role="status">
                        <span>13</span>
                    </div>
                </div>

                <div>
                    <span>Messages</span>
                </div>
            </span>
        </button>
    `, async function(success) {
    });



    await scrollAllConversations(async function () {
        await step_one()
    });
    
    
}


 



















































































