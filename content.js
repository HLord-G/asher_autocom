import { injectUI } from "./ui.js";


/* ======================================= [S] **** [S] ======================================= */
// UI 
/*==============================================================================================*/
  injectUI();
/* ======================================= [E] **** [E] ======================================= */

 






function enableMessageBoxDrag() {

    const mover = document.getElementById("mover");

    if (!mover) {
        console.log("❌ #mover not found");
        return;
    }

    // Find the fixed message box
    let box = mover.parentElement;

    while (box) {

        if (getComputedStyle(box).position === "fixed") {
            break;
        }

        box = box.parentElement;
    }

    if (!box) {
        console.log("❌ Message box not found");
        return;
    }


    const STORAGE_KEY = "messageBoxPosition";

    let dragging = false;

    let startX = 0;
    let startY = 0;

    let startLeft = 0;
    let startTop = 0;


    // =====================================================
    // LOAD SAVED POSITION
    // =====================================================

    chrome.storage.local.get(STORAGE_KEY, function (result) {

        const saved = result[STORAGE_KEY];

        if (!saved) {
            console.log("No saved position. Using default position.");
            return;
        }

        // Restore position
        box.style.left = saved.left + "px";
        box.style.top = saved.top + "px";

        // Disable original right/bottom
        box.style.right = "auto";
        box.style.bottom = "auto";

        console.log(
            "Message box position restored:",
            saved.left,
            saved.top
        );

    });


    // =====================================================
    // START DRAG
    // =====================================================

    mover.addEventListener("pointerdown", function (e) {

        if (e.pointerType === "mouse" && e.button !== 0) {
            return;
        }

        e.preventDefault();

        const rect = box.getBoundingClientRect();

        dragging = true;

        startX = e.clientX;
        startY = e.clientY;

        startLeft = rect.left;
        startTop = rect.top;


        // Convert current position to left/top
        box.style.left = startLeft + "px";
        box.style.top = startTop + "px";

        box.style.right = "auto";
        box.style.bottom = "auto";


        mover.setPointerCapture?.(e.pointerId);

        mover.style.cursor = "grabbing";

        document.body.style.userSelect = "none";

    });


    // =====================================================
    // MOVE
    // =====================================================

    mover.addEventListener("pointermove", function (e) {

        if (!dragging) return;

        e.preventDefault();

        let left =
            startLeft + (e.clientX - startX);

        let top =
            startTop + (e.clientY - startY);


        // Keep inside viewport
        const maxLeft =
            window.innerWidth - box.offsetWidth;

        const maxTop =
            window.innerHeight - box.offsetHeight;


        left = Math.max(
            0,
            Math.min(left, maxLeft)
        );

        top = Math.max(
            0,
            Math.min(top, maxTop)
        );


        box.style.left = left + "px";
        box.style.top = top + "px";

    });


    // =====================================================
    // SAVE POSITION
    // =====================================================

    function savePosition(e) {

        if (!dragging) return;

        dragging = false;

        document.body.style.userSelect = "";

        mover.style.cursor = "move";

        mover.releasePointerCapture?.(e.pointerId);


        const rect = box.getBoundingClientRect();


        const position = {
            left: Math.round(rect.left),
            top: Math.round(rect.top)
        };


        chrome.storage.local.set({

            [STORAGE_KEY]: position

        }, function () {

            console.log(
                "✅ Position saved:",
                position
            );

        });

    }


    mover.addEventListener(
        "pointerup",
        savePosition
    );

    mover.addEventListener(
        "pointercancel",
        savePosition
    );

}


 
setTimeout(() => {
    enableMessageBoxDrag();
}, 600);
// Run

