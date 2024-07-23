const modal = document.getElementById("modal");
const closeButton = document.querySelector(".close-button");
const modalMessage = document.getElementById("modal-message");

function showModal(message) {
    modalMessage.textContent = message;
    modal.style.display = "flex";
  }

  closeButton.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });


document.addEventListener("DOMContentLoaded", () => {
  const checkWaitTimeBtn = document.querySelector(".check-wait-time");
  const checkWaitTimeModal = document.getElementById("checkWaitTime");
  const formContent = document.getElementById("enterQueue");

  checkWaitTimeBtn.addEventListener("click", (event) => {
    event.preventDefault();
    checkWaitTimeModal.style.display = "block";
    if (formContent) {
      formContent.style.display = "none";
    }
  });

  const checkWaitTimeForm = document.getElementById("checkWaitTimeForm");
  checkWaitTimeForm.onsubmit = function (event) {
    event.preventDefault();

    const name = document.getElementById("checkName").value;
    const code = document.getElementById("checkCode").value;

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "api.php", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          if (data.success) {
            showModal(
              `Hello ${name}, your estimated wait time is: ${data.waitTime} minutes.`
            );
            checkWaitTimeModal.style.display = "none";
          } else {
            showModal(`User not found or invalid code.`);
          }
        } else {
          console.error("Error:", xhr.statusText);
          showModal("An error occurred. Please try again.");
        }
      }
    };

    const requestData = JSON.stringify({
      action: "check_wait_time",
      name,
      code,
    });
    xhr.send(requestData);
  };


});

document.addEventListener("DOMContentLoaded", () => {
  const enterQueueBtn = document.getElementById("queue-button");
  const formContent = document.getElementById("enterQueue");
  const severitySlider = document.getElementById("severity");
  const severityValue = document.getElementById("severity-value");
  const checkWaitTimeModal = document.getElementById("checkWaitTime");

  if (enterQueueBtn) {
    enterQueueBtn.addEventListener("click", (event) => {
      event.preventDefault();
      formContent.style.display = "block";
      if (checkWaitTimeModal) {
        checkWaitTimeModal.style.display = "none";
      }
    });
  }

  if (severitySlider && severityValue) {
    severityValue.textContent = severitySlider.value;
    severitySlider.addEventListener("input", () => {
      severityValue.textContent = severitySlider.value;
    });
  }

  const queueForm = document.getElementById("queueForm");
  if (queueForm) {
    queueForm.onsubmit = function (event) {
      event.preventDefault();

      const name = document.getElementById("name").value;
      const injury = document.getElementById("injury").value;
      const severity = document.getElementById("severity").value;

      const xhr = new XMLHttpRequest();
      xhr.open("POST", "api.php", true);
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          if (data.success) {
            showModal(
              `You have been added to the queue. Your code is: ${data.code}. Estimated wait time: ${data.waitTime} minutes.`
            );
            formContent.style.display = "none";
          } else {
            showModal(`There was an error: ${data.error}`);
          }
        } else if (xhr.readyState === 4) {
          console.error("Error:", xhr.statusText);
          showModal("An error occurred. Please try again.");
        }
      };

      const requestData = JSON.stringify({
        action: "add_to_queue",
        name,
        injury,
        severity,
      });
      xhr.send(requestData);
    };
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const fetchQueueData = () => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "api.php?action=get_queue_data", true);

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          document.getElementById(
            "totalPatients"
          ).textContent = `Total: ${data.totalPatients}`;
          document.getElementById(
            "inTreatment"
          ).textContent = `In Treatment: ${data.inTreatment}`;
          document.getElementById(
            "waiting"
          ).textContent = `Waiting: ${data.waiting}`;
          document.getElementById(
            "estimatedWait"
          ).textContent = `${data.estimatedWait} hrs`;
        } else {
          console.error("Error fetching queue data:", xhr.statusText);
        }
      }
    };

    xhr.send();
  };

  fetchQueueData();
  setInterval(fetchQueueData, 10000);

});
