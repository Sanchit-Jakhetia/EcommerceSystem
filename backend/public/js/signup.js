// Signup page specific JavaScript
// This file is for the standalone signup page functionality

document.addEventListener('DOMContentLoaded', function() {
    // Handle signup form submission
    const signupFormElement = document.getElementById('signup-form-element');
    
    if (signupFormElement) {
        signupFormElement.addEventListener('submit', handleSignUp);
    }

    // Google Sign Up button
    const googleSignupBtn = document.getElementById('google-signup-btn');
    
    if (googleSignupBtn) {
        googleSignupBtn.addEventListener('click', handleGoogleSignUp);
    }

    // Initialize Google Sign-In when page loads
    loadGoogleSDK();
});

// Handle regular sign up
function handleSignUp(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');

    console.log('Sign Up:', { name, email, password });
    
    // Add your backend API call here
    // Example: fetch('/api/auth/signup', { method: 'POST', body: formData })
    alert('Sign Up functionality - implement your backend logic here');
    
    // Simulate successful signup and redirect
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 1000);
}

// Load Google Identity Services SDK
function loadGoogleSDK() {
    // Check if script already exists
    if (document.querySelector('script[src*="accounts.google.com/gsi/client"]')) {
        initializeGoogleSignIn();
        return;
    }
    
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = initializeGoogleSignIn;
    script.onerror = () => {
        console.error('Failed to load Google SDK');
        // Fallback to simulation if Google SDK fails
        window.handleGoogleSignUp = () => simulateGoogleAuth('signup');
    };
    document.head.appendChild(script);
}

// Initialize Google Sign-In
function initializeGoogleSignIn() {
    const CLIENT_ID = '808654019925-ll2ui37okg3itpjrkmj8qmlqrk2iok25.apps.googleusercontent.com';
    
    try {
        if (window.google && window.google.accounts) {
            window.google.accounts.id.initialize({
                client_id: CLIENT_ID,
                callback: handleGoogleResponse,
                auto_select: false,
                cancel_on_tap_outside: true,
                use_fedcm_for_prompt: true // Enable FedCM
            });
            console.log('Google Sign-In initialized successfully');
        } else {
            throw new Error('Google SDK not available');
        }
    } catch (error) {
        console.error('Error initializing Google Sign-In:', error);
        // Fallback to simulation
        window.handleGoogleSignUp = () => simulateGoogleAuth('signup');
    }
}

// Google Sign Up functionality
function handleGoogleSignUp() {
    if (typeof google !== 'undefined' && google.accounts) {
        try {
            // Show the Google One Tap sign-in
            google.accounts.id.prompt((notification) => {
                console.log('Google One Tap notification:', notification);
                
                if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
                    console.log('One Tap not available, using popup fallback');
                    showGooglePopup();
                }
            });
        } catch (error) {
            console.error('Error with Google One Tap:', error);
            showGooglePopup();
        }
    } else {
        console.error('Google SDK not loaded, using simulation');
        simulateGoogleAuth('signup');
    }
}

// Show Google popup as fallback
function showGooglePopup() {
    const CLIENT_ID = '808654019925-ll2ui37okg3itpjrkmj8qmlqrk2iok25.apps.googleusercontent.com';
    const REDIRECT_URI = encodeURIComponent(window.location.origin + window.location.pathname);
    
    const authUrl = `https://accounts.google.com/oauth/authorize?` +
        `client_id=${CLIENT_ID}&` +
        `redirect_uri=${REDIRECT_URI}&` +
        `response_type=code&` +
        `scope=openid email profile&` +
        `access_type=offline&` +
        `prompt=select_account`;
    
    try {
        // Open popup window
        const popup = window.open(
            authUrl,
            'google-signup',
            'width=500,height=600,scrollbars=yes,resizable=yes,left=' + 
            (window.screen.width / 2 - 250) + ',top=' + (window.screen.height / 2 - 300)
        );
        
        if (!popup) {
            throw new Error('Popup blocked');
        }
        
        // Check if popup is closed
        const checkClosed = setInterval(() => {
            try {
                if (popup.closed) {
                    clearInterval(checkClosed);
                    console.log('Google sign-up popup closed');
                }
            } catch (error) {
                // Popup access error, assume closed
                clearInterval(checkClosed);
                console.log('Google sign-up popup access error, assuming closed');
            }
        }, 1000);
        
        // Auto-close after 5 minutes
        setTimeout(() => {
            if (!popup.closed) {
                popup.close();
                clearInterval(checkClosed);
                console.log('Google sign-up popup auto-closed after timeout');
            }
        }, 300000);
        
    } catch (error) {
        console.error('Error opening Google popup:', error);
        simulateGoogleAuth('signup');
    }
}

// Handle Google authentication response
function handleGoogleResponse(response) {
    try {
        // Decode the JWT token to get user information
        const responsePayload = decodeJwtResponse(response.credential);
        
        console.log('Google Auth Response:', responsePayload);
        
        // Extract user information
        const userInfo = {
            name: responsePayload.name,
            email: responsePayload.email,
            picture: responsePayload.picture,
            sub: responsePayload.sub // Google user ID
        };

        console.log('User Info:', userInfo);
        
        // Store user data
        localStorage.setItem('user', JSON.stringify(userInfo));
        
        // Send this information to your backend for authentication
        alert(`Google Authentication successful!\nWelcome ${userInfo.name}!\n\nRedirecting to dashboard...`);
        
        // Redirect to dashboard
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 2000);
        
    } catch (error) {
        console.error('Error handling Google response:', error);
        alert('Google authentication failed. Please try again.');
    }
}

// Decode JWT token
function decodeJwtResponse(token) {
    try {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error('Error decoding JWT:', error);
        throw error;
    }
}

// Simulate Google authentication for demonstration (fallback)
function simulateGoogleAuth(type) {
    const action = type === 'signin' ? 'Sign In' : 'Sign Up';
    console.log(`Using Google ${action} simulation (fallback)...`);
    
    // Simulate a successful Google authentication
    setTimeout(() => {
        const userData = {
            name: 'Jane Smith (Demo)',
            email: 'jane.demo@gmail.com',
            picture: 'https://via.placeholder.com/150'
        };
        
        alert(`Google ${action} simulation successful!\nName: ${userData.name}\nEmail: ${userData.email}\n\nRedirecting to dashboard...`);
        
        // Store user data in localStorage for demo
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Redirect to dashboard
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1000);
        
        console.log(`${action} with Google simulation completed`);
    }, 1000);
}

// Handle Google authentication response
function handleGoogleResponse(response) {
    // Decode the JWT token to get user information
    const responsePayload = decodeJwtResponse(response.credential);
    
    console.log('Google Auth Response:', responsePayload);
    
    // Extract user information
    const userInfo = {
        name: responsePayload.name,
        email: responsePayload.email,
        picture: responsePayload.picture,
        sub: responsePayload.sub // Google user ID
    };

    console.log('User Info:', userInfo);
    
    // Send this information to your backend for authentication
    alert(`Google Authentication successful for: ${userInfo.name} (${userInfo.email})`);
    
    // Redirect to dashboard or home page after successful authentication
    // window.location.href = 'dashboard.html';
}

// Decode JWT token (simplified version)
function decodeJwtResponse(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}

// Simulate Google authentication for demonstration
function simulateGoogleAuth(type) {
    const action = type === 'signin' ? 'Sign In' : 'Sign Up';
    console.log(`Simulating Google ${action}...`);
    
    // Simulate a successful Google authentication
    setTimeout(() => {
        alert(`Google ${action} simulation - In a real app, this would authenticate with Google and redirect to dashboard`);
        console.log(`${action} with Google completed`);
    }, 1000);
}
