// Patient Registered Number
document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Make a GET request to fetch the registered count from the API endpoint
    const response = await axios.get('/api/fetch-registered-number');

    if (response.status === 200) {
      const registeredCount = response.data.registered_count;
      // Update the content of the <span> element
      document.getElementById('registered-count').textContent = registeredCount;
    } else {
      console.error('Failed to fetch registered count:', response.statusText);
    }
  } catch (error) {
    console.error('An error occurred while fetching the registered count:', error);
  }
});

// Completed Appointments Number
document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Make a GET request to fetch the completed count from the API endpoint
    const response = await axios.get('/api/fetch-ComAppointments-number');

    if (response.status === 200) {
      const completedCount = response.data.completed_count;
      // Update the content of the <span> element
      document.getElementById('completed-count').textContent = completedCount;
    } else {
      console.error('Failed to fetch completed count:', response.statusText);
    }
  } catch (error) {
    console.error('An error occurred while fetching the completed count:', error);
  }
});

// Canceled Appointments Number
document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Make a GET request to fetch the canceled count from the API endpoint
    const response = await axios.get('/api/fetch-CanAppointments-number');

    if (response.status === 200) {
      const canceledCount = response.data.canceled_count;
      // Update the content of the <span> element
      document.getElementById('canceled-count').textContent = canceledCount;
    } else {
      console.error('Failed to fetch canceled count:', response.statusText);
    }
  } catch (error) {
    console.error('An error occurred while fetching the canceled count:', error);
  }
});

// Pending Appointments Number
document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Make a GET request to fetch the pending count from the API endpoint
    const response = await axios.get('/api/fetch-PenAppointments-number');

    if (response.status === 200) {
      const pendingCount = response.data.pending_count;
      // Update the content of the <span> element
      document.getElementById('pending-count').textContent = pendingCount;
    } else {
      console.error('Failed to fetch pending count:', response.statusText);
    }
  } catch (error) {
    console.error('An error occurred while fetching the pending count:', error);
  }
});

// Messages Number
document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Make a GET request to fetch the message count from the API endpoint
    const response = await axios.get('/api/fetch-Messages-number');

    if (response.status === 200) {
      const messageCount = response.data.message_count;
      // Update the content of the <span> element
      document.getElementById('message-count').textContent = messageCount;
    } else {
      console.error('Failed to fetch message count:', response.statusText);
    }
  } catch (error) {
    console.error('An error occurred while fetching the message count:', error);
  }
});

// Available slots today
document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Make two separate GET requests to fetch counts from the APIs
    const response1 = await axios.get('/api/fetch-TodayAppointments-number');
    const response2 = await axios.get('/api/fetch-DOR-timeslots');

    if (response1.status === 200 && response2.status === 200) {
      const count1 = response1.data.today_appointments_count || 0;
      const count2 = response2.data.doR_timeslots_count || 0;

      // Add the counts together
      const combinedCount = count1 + count2;

      // Subtract 5 from the combined count
      const result = 5 - combinedCount;

      // Update the content of the <span> element with the result
      document.getElementById('booked-count').textContent = result;
    } else {
      console.error('Failed to fetch counts:', response1.statusText, response2.statusText);
    }
  } catch (error) {
    console.error('An error occurred while fetching counts:', error);
  }
});



