document.addEventListener("DOMContentLoaded", () => {
  const feedbackBtn = document.getElementById('feedback-btn');
  const complaintsBtn = document.getElementById('complaints-btn');
  const deliveryBtn = document.getElementById('delivery-btn');

  // Action URLs
  const feedbackFormURL = 'https://www.google.com/';
  const complaintsFormURL = 'https://www.google.com/';
  const deliveryEmail = 'test@email.com';

  // Event Listeners
  feedbackBtn.addEventListener('click', () => {
    // Open Feedback Form
    window.open(feedbackFormURL, '_blank');
  });

  complaintsBtn.addEventListener('click', () => {
    // Open Complaints Form
    window.open(complaintsFormURL, '_blank');
  });

  deliveryBtn.addEventListener('click', () => {
    // Open Email Client with Pre-filled Template
    const subject = encodeURIComponent("Food Delivery Request");
    const body = encodeURIComponent(`
      Hi,

      I would like to request food delivery to the following address:

      Name:
      Address:
      Contact Number:
      Special Instructions:

      Regards,
      [Your Name]
    `);
    window.location.href = `mailto:${deliveryEmail}?subject=${subject}&body=${body}`;
  });
});
