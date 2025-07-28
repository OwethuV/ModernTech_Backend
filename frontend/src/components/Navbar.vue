<template>
    <div class="Header">
        <!-- Bootstrap Navbar -->

        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <a class="navbar-brand mt-0" href="/HomeView.vue"><img src="@/assets/IMG-20250623-WA0016.png" width="40"
                        height="40" class="d-inline-block align-text-top"></a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav mt-2">
                        <li class="nav-item">
                            <router-link to="/employment" class="nav-link">Employees</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/dashboard" class="nav-link">Dashboard</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/employee" class="nav-link">Attendance</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/payroll" class="nav-link">Payroll</router-link>
                        </li>   
                        <li class="nav-item">
                            <router-link to="/performancereview" class="nav-link">Review</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/" class="btn btn-primary text-white m-3 mt-0 logout">Log Out</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</template>

<style>
.navbar a:hover {
    text-decoration: underline;
}

.navbar-brand a:hover {
    text-decoration: none;
}

.logout:hover {
    text-decoration: none !important;
}

.navbar {
    background-color: #CDDAED;
}
</style>