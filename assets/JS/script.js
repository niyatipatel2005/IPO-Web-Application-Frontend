document.addEventListener("DOMContentLoaded", function () {
    // Cursor animation
    const cursorDot = document.querySelector("[data-cursor-dot]");
    const cursorOutline = document.querySelector("[data-cursor-outline]");

    if (cursorDot && cursorOutline) {
        window.addEventListener("mousemove", function (e) {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            cursorOutline.animate(
                { left: `${posX}px`, top: `${posY}px` },
                { duration: 150, fill: "forwards" }
            );
        });
    }

    // Testimonials carousel logic
    const slider = document.querySelector(".testimonial-slider");
    const cards = document.querySelectorAll(".testimonial-card");
    const prevBtn = document.querySelector(".testimonial-nav.prev");
    const nextBtn = document.querySelector(".testimonial-nav.next");

    let currentIndex = 0;
    const cardsPerView = 3;
    const cardWidth = 300 + 20; // card width + margin

    function updateSliderPosition() {
        slider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }

    if (nextBtn && prevBtn && slider) {
        nextBtn.addEventListener("click", () => {
            if (currentIndex < cards.length - cardsPerView) {
                currentIndex++;
                updateSliderPosition();
            }
        });

        prevBtn.addEventListener("click", () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateSliderPosition();
            }
        });
    }

    // Market Movers data
    const marketData = {
        nseHigh: [
            { company: "Indian Railway Finance", price: 113.40, high: 114.00 },
            { company: "Firstsource Solution", price: 209.90, high: 217.00 }
        ],
        bseHigh: [
            { company: "HCL Tech.", price: 1540.80, high: 1555.00 },
            { company: "ONGC", price: 223.40, high: 224.75 }
        ],
        nseLow: [
            { company: "Mukesh Babu Fin Serv", price: 149.10, change: "+20%" },
            { company: "Jupiter Infomedia", price: 52.40, change: "+19.8%" }
        ],
        bseLow: [
            { company: "Jigar Cables", price: 66.45, change: "+19.6%" },
            { company: "CNI Research", price: 40.00, change: "+19.3%" }
        ]
    };

    function renderHighTable(dataSet) {
        const table = document.getElementById("highTable");
        if (!table) return;
        table.innerHTML = "";
        dataSet.forEach(item => {
            table.innerHTML += `
                <tr>
                    <td>${item.company}</td>
                    <td class="text-end">${item.price.toFixed(2)}</td>
                    <td class="text-end">${item.high.toFixed(2)}</td>
                </tr>
            `;
        });
    }

    function renderLowTable(dataSet) {
        const table = document.getElementById("lowTable");
        if (!table) return;
        table.innerHTML = "";
        dataSet.forEach(item => {
            table.innerHTML += `
                <tr>
                    <td>${item.company}</td>
                    <td class="text-end">${item.price.toFixed(2)}</td>
                    <td class="text-end text-success">${item.change}</td>
                </tr>
            `;
        });
    }

    // Initial table render
    renderHighTable(marketData.nseHigh);
    renderLowTable(marketData.nseLow);

    // NSE/BSE Tab Logic for Highs
    const nseHighBtn = document.getElementById("nseHighBtn");
    const bseHighBtn = document.getElementById("bseHighBtn");

    if (nseHighBtn && bseHighBtn) {
        nseHighBtn.addEventListener("click", function () {
            nseHighBtn.classList.add("btn-primary", "active");
            nseHighBtn.classList.remove("btn-outline-secondary");
            bseHighBtn.classList.remove("btn-primary", "active");
            bseHighBtn.classList.add("btn-outline-secondary");
            renderHighTable(marketData.nseHigh);
        });

        bseHighBtn.addEventListener("click", function () {
            bseHighBtn.classList.add("btn-primary", "active");
            bseHighBtn.classList.remove("btn-outline-secondary");
            nseHighBtn.classList.remove("btn-primary", "active");
            nseHighBtn.classList.add("btn-outline-secondary");
            renderHighTable(marketData.bseHigh);
        });
    }

    // NSE/BSE Tab Logic for Lows
    const nseLowBtn = document.getElementById("nseLowBtn");
    const bseLowBtn = document.getElementById("bseLowBtn");

    if (nseLowBtn && bseLowBtn) {
        nseLowBtn.addEventListener("click", function () {
            nseLowBtn.classList.add("btn-primary", "active");
            nseLowBtn.classList.remove("btn-outline-secondary");
            bseLowBtn.classList.remove("btn-primary", "active");
            bseLowBtn.classList.add("btn-outline-secondary");
            renderLowTable(marketData.nseLow);
        });

        bseLowBtn.addEventListener("click", function () {
            bseLowBtn.classList.add("btn-primary", "active");
            bseLowBtn.classList.remove("btn-outline-secondary");
            nseLowBtn.classList.remove("btn-primary", "active");
            nseLowBtn.classList.add("btn-outline-secondary");
            renderLowTable(marketData.bseLow);
        });
    }

    const selects = document.querySelectorAll(".broker-select select");
    const broker1 = selects[0].value;
    const broker2 = selects[1].value;
    
    if (broker1 === broker2) {
        alert("Please choose two different brokers to compare.");
    } else {
        // Redirect or display comparison
        alert(`Comparing ${broker1} vs ${broker2}`);
    }
});
