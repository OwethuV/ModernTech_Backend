<template>
  <div class="home">
    <div class="hero p-5 text-center">
      <h1><strong class="text-white">Welcome to ModernTech Solutions</strong></h1>
      <p class="text-white">Take Control of Your Workforce. Fast, Simple, and All in One Place.</p>
      <router-link to="/login" class="btn btn-primary mt-3 btn-lg">Log In</router-link>
    </div>
  </div>
</template>
<style>
/* Hero styling */
.hero {
  background-image: url("https://cdn.pixabay.com/photo/2024/06/22/18/09/ai-generated-8846757_1280.jpg");
  background-size: cover;
  background-position: center;
  /* Center the background image */
  height: 100vh;
  display: flex;
  /* Use flexbox for vertical centering of content */
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  /* Needed for absolute positioning of the button */
}
.hero h1 {
  margin-top: 0;
  /* Reset margin-top as flexbox handles centering */
  font-size: 3.5rem;
  /* Adjust font size for better impact */
  text-shadow: 4px 4px 16px #000000;
}
.hero p {
  font-size: 1.5rem;
  /* Adjust font size */
  text-shadow: 2px 2px 8px #000000;
  margin-bottom: 2rem;
  /* Space below paragraph */
}
</style>