<template>
  <v-footer class="footer-wrapper pa-0" id="app-footer">
    <div class="footer-gradient" />
    <v-container style="max-width: 1280px;" class="py-12 position-relative">
      <v-row>
        <!-- Brand Column -->
        <v-col cols="12" md="4" class="mb-6 mb-md-0">
          <div class="d-flex align-center ga-2 mb-4">
            <img src="/images/feast-fast-logo.svg" alt="Feast Fast" width="40" height="40" style="border-radius: 12px;" />
            <span class="ff-heading gradient-text" style="font-size: 1.5rem; font-weight: 800;">Feast Fast</span>
          </div>
          <p class="text-body-2 mb-4" style="opacity: 0.6; max-width: 300px; line-height: 1.7;">
            Discover the finest restaurants and get your favorite meals delivered to your doorstep in minutes. Premium quality, every time.
          </p>
          <div class="d-flex ga-2">
            <v-btn icon variant="tonal" size="small" rounded="lg" color="primary" id="footer-social-twitter">
              <v-icon icon="mdi-twitter" size="18" />
            </v-btn>
            <v-btn icon variant="tonal" size="small" rounded="lg" color="primary" id="footer-social-instagram">
              <v-icon icon="mdi-instagram" size="18" />
            </v-btn>
            <v-btn icon variant="tonal" size="small" rounded="lg" color="primary" id="footer-social-facebook">
              <v-icon icon="mdi-facebook" size="18" />
            </v-btn>
            <v-btn icon variant="tonal" size="small" rounded="lg" color="primary" id="footer-social-linkedin">
              <v-icon icon="mdi-linkedin" size="18" />
            </v-btn>
          </div>
        </v-col>

        <!-- Quick Links -->
        <v-col cols="6" sm="4" md="2">
          <h4 class="ff-heading text-body-1 font-weight-bold mb-4">Company</h4>
          <div class="d-flex flex-column ga-2">
            <a href="#" class="footer-link">About Us</a>
            <a href="#" class="footer-link">Careers</a>
            <a href="#" class="footer-link">Blog</a>
            <a href="#" class="footer-link">Contact</a>
          </div>
        </v-col>

        <v-col cols="6" sm="4" md="2">
          <h4 class="ff-heading text-body-1 font-weight-bold mb-4">Support</h4>
          <div class="d-flex flex-column ga-2">
            <a href="#" class="footer-link">Help Center</a>
            <a href="#" class="footer-link">Safety</a>
            <a href="#" class="footer-link">Terms</a>
            <a href="#" class="footer-link">Privacy</a>
          </div>
        </v-col>

        <v-col cols="12" sm="4" md="4">
          <h4 class="ff-heading text-body-1 font-weight-bold mb-4">Get the App</h4>
          <p class="text-body-2 mb-4" style="opacity: 0.6;">Download Feast Fast for the best mobile experience.</p>
          <div class="d-flex flex-column ga-2" style="max-width: 180px;">
            <v-btn variant="outlined" rounded="lg" size="small" prepend-icon="mdi-apple" class="justify-start text-none" id="footer-app-store">
              App Store
            </v-btn>
            <v-btn variant="outlined" rounded="lg" size="small" prepend-icon="mdi-google-play" class="justify-start text-none" id="footer-play-store">
              Google Play
            </v-btn>
          </div>
        </v-col>
      </v-row>

      <v-divider class="my-8 opacity-10" />

      <div class="d-flex flex-column flex-sm-row justify-space-between align-center ga-2">
        <p class="text-body-2" style="opacity: 0.4;">
          © 2026 Feast Fast. All rights reserved.
        </p>
        <p class="text-body-2" style="opacity: 0.4;">
          Made with <v-icon icon="mdi-heart" size="14" color="primary" class="mx-1" /> for food lovers
        </p>
      </div>
    </v-container>
  </v-footer>
</template>

<script setup>
</script>

<style scoped>
.footer-wrapper {
  position: relative;
  overflow: hidden;
}

.footer-gradient {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 107, 53, 0.4), transparent);
}

.footer-link {
  color: inherit;
  text-decoration: none;
  font-size: 0.875rem;
  opacity: 0.5;
  transition: var(--ff-transition-smooth);
}

.footer-link:hover {
  opacity: 1;
  color: #FF6B35;
}
</style>
