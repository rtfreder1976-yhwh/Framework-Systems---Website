document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('onboardingForm');
  const steps = document.querySelectorAll('.onboarding-step');
  const dots = document.querySelectorAll('.step-dot');
  const progressFill = document.getElementById('progressFill');
  const nextBtns = document.querySelectorAll('.next-step');
  const prevBtns = document.querySelectorAll('.prev-step');
  const successStep = document.getElementById('successStep');
  
  let currentStep = 1;
  const totalSteps = 5;
  
  function updateStep(step) {
    // Update step visibility
    steps.forEach(s => s.classList.remove('active'));
    const activeStep = document.querySelector(`.onboarding-step[data-step="${step}"]`);
    if (activeStep) activeStep.classList.add('active');
    
    // Update progress bar
    const progressWidth = ((step - 1) / (totalSteps - 1)) * 100;
    progressFill.style.width = `${progressWidth}%`;
    
    // Update dots
    dots.forEach((dot, index) => {
      const dotStep = index + 1;
      dot.classList.remove('active', 'completed');
      if (dotStep === step) {
        dot.classList.add('active');
      } else if (dotStep < step) {
        dot.classList.add('completed');
        dot.innerHTML = '✓';
      } else {
        dot.innerHTML = dotStep;
      }
    });
    
    // Scroll to top of form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  nextBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (currentStep < totalSteps) {
        // Simple validation for required fields
        const activeFields = steps[currentStep - 1].querySelectorAll('[required]');
        let valid = true;
        activeFields.forEach(field => {
          if (!field.value) {
            field.style.borderColor = 'red';
            valid = false;
          } else {
            field.style.borderColor = '';
          }
        });
        
        if (valid) {
          currentStep++;
          updateStep(currentStep);
        }
      }
    });
  });
  
  prevBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (currentStep > 1) {
        currentStep--;
        updateStep(currentStep);
      }
    });
  });
  
  // Multi-select logic for specialties
  const multiOptions = document.querySelectorAll('.multi-select');
  multiOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      opt.classList.toggle('selected');
    });
  });
  
  // Single-select logic for review strategy
  const singleOptions = document.querySelectorAll('.single-select');
  singleOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      singleOptions.forEach(s => s.classList.remove('selected'));
      opt.classList.add('selected');
    });
  });
  
  // GBP Invitation toggle
  const inviteBtn = document.getElementById('inviteSent');
  if (inviteBtn) {
    inviteBtn.addEventListener('click', () => {
      inviteBtn.classList.toggle('selected');
    });
  }
  
  // Form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simulate submission
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Saving...';
    
    setTimeout(() => {
      // Hide all steps and show success
      steps.forEach(s => s.classList.remove('active'));
      successStep.classList.add('active');
      
      // Complete progress bar
      progressFill.style.width = '100%';
      dots.forEach(dot => {
        dot.classList.add('completed');
        dot.innerHTML = '✓';
      });
      
      // Update header label
      document.querySelector('.inline-label').innerHTML = 'Onboarding Complete';
    }, 1500);
  });
});
