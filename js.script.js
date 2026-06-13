let selectedFoods = ['Pasta']; // Default selected value matches UI
let chosenDate = "2026-06-25";
let chosenTime = "9:00 PM 🌙 — late night menace mode";

// Simple navigation coordinator between UI screens
function nextStep(stepNumber) {
    document.querySelectorAll('.step').forEach(step => {
        step.classList.remove('active');
    });
    document.getElementById(`step-${stepNumber}`).classList.add('active');
}

// 1. Runaway No Button Code Logic
const noBtn = document.getElementById("runaway-no");

noBtn.addEventListener("mouseover", () => {

    const x = Math.random()*250-100;
    const y = Math.random()*150-75;

    noBtn.style.transform=`translate(${x}px,${y}px)`;
});
function moveNoButton() {
    // Determine bounds within the bounding box container card
    const padding = 20;
    const maxX = container.clientWidth - noBtn.clientWidth - padding;
    const maxY = container.clientHeight - noBtn.clientHeight - padding;
    
    // Generate random coordinates inside the safe bounds
    const randomX = Math.max(padding, Math.floor(Math.random() * maxX));
    const randomY = Math.max(padding, Math.floor(Math.random() * maxY));
    
    // Apply layout positions natively
    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
}

// Trigger escape maneuvers on both mouse hovering and mobile touches
noBtn.addEventListener('mouseenter', moveNoButton);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Prevents clicking the element accidentally on mobile browsers
    moveNoButton();
});


// If they managed to actually bypass the evasion parameters and select it
noBtn.addEventListener('click', () => {
    nextStep(2);
});

// 2. Data State Pickers
function saveDateTime() {
    const dateValue = document.getElementById('date-input').value;
    const timeValue = document.getElementById('time-input').value;
    
    if(dateValue) chosenDate = dateValue;
    if(timeValue) chosenTime = timeValue;
    
    nextStep(4);
}

function toggleFood(element, foodName) {
    element.classList.toggle('selected');
    
    if (selectedFoods.includes(foodName)) {
        selectedFoods = selectedFoods.filter(item => item !== foodName);
    } else {
        selectedFoods.push(foodName);
    }
}

// 3. Compile dynamically written summaries
function generateSummary() {
    // Turn dates (YYYY-MM-DD) into readable formats like "Thursday, June 25th"
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    const dateObj = new Date(chosenDate);
    let formattedDate = dateObj.toLocaleDateString('en-US', options);
    
    // Extract short-hand time strings
    const cleanTime = chosenTime.split('—')[0].trim();
    
    document.getElementById('final-date').innerText = `${formattedDate} at ${cleanTime}`;
    
    // Gather string choices dynamically
    if(selectedFoods.length > 0) {
        document.getElementById('final-food').innerText = selectedFoods.join(', ');
    } else {
        document.getElementById('final-food').innerText = "Anything works! 🙌";
    }
    
    nextStep(5);
}

// 4. Utility Copy To Clipboard Actions
function copyDetails() {
    const finalDateStr = document.getElementById('final-date').innerText;
    const finalFoodStr = document.getElementById('final-food').innerText;
    
    const textToCopy = `It's a date! ❤️\n🗓️ When: ${finalDateStr}\n🍕 Food Prefs: ${finalFoodStr}\n\nLock it in! 🔥`;
    
    navigator.clipboard.writeText(textToCopy).then(() => {
        alert('Plan details copied directly to clipboard! Go ahead and paste it to them.');
    }).catch(err => {
        console.error('Could not copy string text components: ', err);
    });

}
