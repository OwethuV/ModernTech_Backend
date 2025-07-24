<template>
    <div class="login-container">
        <div class="animated-boxes">
            <div v-for="i in 10" :key="i" :class="`box box-${i}`"></div>
        </div>
        
        <form class="login-form" @submit.prevent="validatePassword">
            <div class="logo-container">
                <img src="@/assets/IMG-20250623-WA0016.png" alt="Company Logo" class="logo">
            </div>

            <h1 class="welcome-text">Welcome Back</h1>
            
            <div class="form-group">
                <label for="email">Email Address:</label>
                <input 
                    id="email"
                    type="email" 
                    v-model="email" 
                    placeholder="eg. name@example.com" 
                    required
                    class="form-input"
                >
            </div>

            <div class="form-group">
                <label for="password">Password:</label>
                <input 
                    id="password"
                    type="password" 
                    v-model="password" 
                    placeholder="Must be 8+ characters" 
                    required
                    class="form-input"
                >
            </div>

            <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>

            <button type="submit" class="login-button">Login</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: '',
            errorMessage: ''
        };
    },
    methods: {
        validatePassword() {
            if (this.password === 'password123') {
                this.errorMessage = '';
                this.$router.push('/employment');
            } else {
                this.errorMessage = 'Invalid password. Please try again.';
            }
        }
    }
};
</script>

<style scoped>
/* Reset and Base Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* Full-screen container */
.login-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(135deg, rgba(2, 0, 0.6, 1) 0%, rgba(9, 9, 121, 1) 35%, rgba(0, 212, 255, 1) 100%);
    overflow: hidden;
}

/* Animated background boxes */
.animated-boxes {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.box {
    position: absolute;
    width: 40px;
    height: 40px;
    background-color: transparent;
    border: 4px solid rgba(255, 255, 255, 0.6);
    animation: animate 10s linear infinite;
    opacity: 0;
}

/* Box positions */
.box-1 { top: 3%; left: 25%; animation-duration: 10s; }
.box-2 { top: 40%; left: 6%; animation-duration: 7s; }
.box-3 { top: 5%; left: 60%; animation-duration: 9s; }
.box-4 { top: 27%; left: 90%; animation-duration: 10s; }
.box-5 { top: 67%; left: 10%; animation-duration: 6s; }
.box-6 { top: 88%; left: 70%; animation-duration: 6s; }
.box-7 { top: 60%; left: 80%; animation-duration: 15s; }
.box-8 { top: 4%; left: 4%; animation-duration: 12s; }
.box-9 { top: 90%; left: 25%; animation-duration: 9s; }
.box-10 { top: 20%; left: 80%; animation-duration: 5s; }

@keyframes animate {
    0% {
        transform: scale(0) translateY(0) rotate(0);
        opacity: 1;
    }
    100% {
        transform: scale(1.3) translateY(-90px) rotate(360deg);
        opacity: 0;
    }
}

/* Login form styling */
.login-form {
    width: 90%;
    max-width: 450px;
    padding: 2.5rem;
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    z-index: 10;
    margin: 20px; /* Small margin on very small screens */
}

.logo-container {
    text-align: center;
    margin-bottom: 1.5rem;
}

.logo {
    width: 120px;
    height: auto;
    max-width: 100%;
}

.welcome-text {
    color: #0f5f96;
    text-align: center;
    margin-bottom: 2rem;
    font-size: clamp(1.5rem, 5vw, 1.8rem);
}

.form-group {
    margin-bottom: 1.5rem;
}

label {
    display: block;
    margin-bottom: 0.5rem;
    color: #0f5f96;
    font-weight: 600;
    font-size: clamp(0.9rem, 3vw, 1rem);
}

.form-input {
    width: 100%;
    padding: 0.8rem 1rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;
    transition: all 0.3s ease;
}

.form-input:focus {
    outline: none;
    border-color: #2199ea;
    box-shadow: 0 0 0 2px rgba(33, 153, 234, 0.2);
}

.error-message {
    color: #dc3545;
    margin: 1rem 0;
    text-align: center;
    font-weight: 500;
    font-size: clamp(0.8rem, 3vw, 0.9rem);
}

.login-button {
    width: 100%;
    padding: 0.9rem;
    background-color: #0f5f96;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 0.5rem;
}

.login-button:hover {
    background-color: #2199ea;
    transform: translateY(-2px);
}

/* Responsive adjustments */
@media (max-width: 480px) {
    .login-form {
        padding: 1.5rem;
        width: 95%;
    }
    
    .logo {
        width: 100px;
    }
    
    .box {
        width: 30px;
        height: 30px;
        border-width: 3px;
    }
}

@media (max-height: 600px) {
    .login-form {
        padding: 1.5rem;
        margin-top: 20px;
        margin-bottom: 20px;
        overflow-y: auto;
        max-height: 90vh;
    }
}
</style>

