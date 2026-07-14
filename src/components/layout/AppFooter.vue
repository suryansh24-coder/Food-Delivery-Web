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

        <!-- Support Links — open real documentation dialog -->
        <v-col cols="6" sm="4" md="2">
          <h4 class="ff-heading text-body-1 font-weight-bold mb-4">Support</h4>
          <div class="d-flex flex-column ga-2">
            <a class="footer-link" @click.prevent="openSupport('help')">Help Center</a>
            <a class="footer-link" @click.prevent="openSupport('safety')">Safety</a>
            <a class="footer-link" @click.prevent="openSupport('terms')">Terms</a>
            <a class="footer-link" @click.prevent="openSupport('privacy')">Privacy</a>
          </div>
        </v-col>

        <!-- Get the App -->
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

  <!-- ── Support Documentation Dialog ─────────────────────────────────── -->
  <v-dialog v-model="supportOpen" max-width="700" scrollable>
    <v-card rounded="xl">
      <!-- Header -->
      <v-card-title class="pa-0">
        <v-tabs v-model="activeTab" color="primary" align-tabs="start" class="px-4 pt-2">
          <v-tab value="help">
            <v-icon icon="mdi-lifebuoy" size="18" class="mr-2" />Help Center
          </v-tab>
          <v-tab value="safety">
            <v-icon icon="mdi-shield-check" size="18" class="mr-2" />Safety
          </v-tab>
          <v-tab value="terms">
            <v-icon icon="mdi-file-document-outline" size="18" class="mr-2" />Terms
          </v-tab>
          <v-tab value="privacy">
            <v-icon icon="mdi-lock-outline" size="18" class="mr-2" />Privacy
          </v-tab>
        </v-tabs>
        <v-btn icon variant="text" size="small" class="support-close-btn" @click="supportOpen = false">
          <v-icon icon="mdi-close" />
        </v-btn>
      </v-card-title>

      <v-divider />

      <v-card-text class="pa-0">
        <v-tabs-window v-model="activeTab">

          <!-- ── Help Center ─────────────────────────────────────────── -->
          <v-tabs-window-item value="help">
            <div class="support-section pa-6">
              <div class="support-hero mb-6">
                <v-icon icon="mdi-lifebuoy" color="primary" size="36" class="mb-2" />
                <h2 class="ff-heading text-h6 font-weight-bold">How can we help you?</h2>
                <p class="text-body-2 mt-1" style="opacity:0.6;">Find answers to the most common questions.</p>
              </div>

              <v-expansion-panels variant="accordion" rounded="lg">
                <v-expansion-panel>
                  <v-expansion-panel-title class="font-weight-medium">
                    <v-icon icon="mdi-cart-plus" color="primary" size="18" class="mr-3" />
                    How do I place an order?
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <ol class="support-list">
                      <li>Enter your delivery location in the search bar on the home page.</li>
                      <li>Browse or search for a restaurant you like.</li>
                      <li>Add items to your cart by tapping <strong>Add to Cart</strong>.</li>
                      <li>Open the cart (top-right icon) and review your items.</li>
                      <li>Tap <strong>Checkout</strong> to confirm your order.</li>
                    </ol>
                  </v-expansion-panel-text>
                </v-expansion-panel>

                <v-expansion-panel>
                  <v-expansion-panel-title class="font-weight-medium">
                    <v-icon icon="mdi-map-marker-path" color="primary" size="18" class="mr-3" />
                    How do I track my order?
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <p class="text-body-2">After placing an order, go to <strong>My Orders</strong> to see real-time tracking. You'll see the estimated delivery time and a live status bar — from "Order Received" → "Preparing" → "On the Way" → "Delivered".</p>
                  </v-expansion-panel-text>
                </v-expansion-panel>

                <v-expansion-panel>
                  <v-expansion-panel-title class="font-weight-medium">
                    <v-icon icon="mdi-credit-card-outline" color="primary" size="18" class="mr-3" />
                    What payment methods are accepted?
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <ul class="support-list">
                      <li>UPI (GPay, PhonePe, Paytm, BHIM)</li>
                      <li>Credit &amp; Debit Cards (Visa, Mastercard, Rupay)</li>
                      <li>Net Banking</li>
                      <li>Cash on Delivery (selected areas)</li>
                      <li>Feast Fast Wallet</li>
                    </ul>
                  </v-expansion-panel-text>
                </v-expansion-panel>

                <v-expansion-panel>
                  <v-expansion-panel-title class="font-weight-medium">
                    <v-icon icon="mdi-cancel" color="primary" size="18" class="mr-3" />
                    Can I cancel an order?
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <p class="text-body-2">You can cancel an order within <strong>2 minutes</strong> of placing it for a full refund. Once the restaurant begins preparation, cancellation may not be possible. Go to <strong>My Orders → Cancel Order</strong> to initiate.</p>
                  </v-expansion-panel-text>
                </v-expansion-panel>

                <v-expansion-panel>
                  <v-expansion-panel-title class="font-weight-medium">
                    <v-icon icon="mdi-alert-circle-outline" color="primary" size="18" class="mr-3" />
                    Something is wrong with my order
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <p class="text-body-2 mb-3">If your order is incorrect, missing items, or the quality is unsatisfactory:</p>
                    <ol class="support-list">
                      <li>Go to <strong>My Orders</strong> and select the affected order.</li>
                      <li>Tap <strong>Report an Issue</strong>.</li>
                      <li>Choose the relevant issue type and add a description.</li>
                      <li>Our team will review and process a refund or replacement within 24 hours.</li>
                    </ol>
                  </v-expansion-panel-text>
                </v-expansion-panel>

                <v-expansion-panel>
                  <v-expansion-panel-title class="font-weight-medium">
                    <v-icon icon="mdi-cash-refund" color="primary" size="18" class="mr-3" />
                    When will I get my refund?
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <ul class="support-list">
                      <li><strong>UPI / Wallets:</strong> Instant – 2 hours</li>
                      <li><strong>Cards:</strong> 5–7 business days</li>
                      <li><strong>Net Banking:</strong> 3–5 business days</li>
                      <li><strong>Feast Fast Wallet:</strong> Instant</li>
                    </ul>
                  </v-expansion-panel-text>
                </v-expansion-panel>
              </v-expansion-panels>

              <v-alert class="mt-5" color="primary" variant="tonal" rounded="lg" density="compact">
                <template #prepend><v-icon icon="mdi-headset" /></template>
                Still need help? Contact our 24/7 support at <strong>support@feastfast.in</strong>
              </v-alert>
            </div>
          </v-tabs-window-item>

          <!-- ── Safety ──────────────────────────────────────────────── -->
          <v-tabs-window-item value="safety">
            <div class="support-section pa-6">
              <div class="support-hero mb-6">
                <v-icon icon="mdi-shield-check" color="primary" size="36" class="mb-2" />
                <h2 class="ff-heading text-h6 font-weight-bold">Safety Standards</h2>
                <p class="text-body-2 mt-1" style="opacity:0.6;">How we protect you and ensure food quality.</p>
              </div>

              <div class="safety-cards d-flex flex-column ga-4">
                <div class="safety-card rounded-lg pa-4 d-flex ga-4 align-start">
                  <v-icon icon="mdi-food-variant" color="primary" size="28" class="flex-shrink-0 mt-1" />
                  <div>
                    <div class="font-weight-bold mb-1">Food Safety Standards</div>
                    <p class="text-body-2" style="opacity:0.7; line-height:1.65;">All partner restaurants undergo FSSAI certification checks. We audit kitchens periodically for hygiene, temperature control, and ingredient quality.</p>
                  </div>
                </div>

                <div class="safety-card rounded-lg pa-4 d-flex ga-4 align-start">
                  <v-icon icon="mdi-truck-check" color="primary" size="28" class="flex-shrink-0 mt-1" />
                  <div>
                    <div class="font-weight-bold mb-1">Delivery Partner Safety</div>
                    <p class="text-body-2" style="opacity:0.7; line-height:1.65;">All delivery partners are background-verified, trained, and equipped with insulated bags to maintain food temperature during transit.</p>
                  </div>
                </div>

                <div class="safety-card rounded-lg pa-4 d-flex ga-4 align-start">
                  <v-icon icon="mdi-package-variant-closed" color="primary" size="28" class="flex-shrink-0 mt-1" />
                  <div>
                    <div class="font-weight-bold mb-1">Tamper-Proof Packaging</div>
                    <p class="text-body-2" style="opacity:0.7; line-height:1.65;">We encourage all restaurant partners to use tamper-evident seals. Any broken seal should be reported immediately via the app.</p>
                  </div>
                </div>

                <div class="safety-card rounded-lg pa-4 d-flex ga-4 align-start">
                  <v-icon icon="mdi-phone-alert" color="primary" size="28" class="flex-shrink-0 mt-1" />
                  <div>
                    <div class="font-weight-bold mb-1">Emergency Support</div>
                    <p class="text-body-2" style="opacity:0.7; line-height:1.65;">For safety emergencies related to a delivery, call our safety helpline at <strong>1800-XXX-FAST</strong> (toll-free, 24/7) or use the SOS button in the app.</p>
                  </div>
                </div>

                <div class="safety-card rounded-lg pa-4 d-flex ga-4 align-start">
                  <v-icon icon="mdi-account-check" color="primary" size="28" class="flex-shrink-0 mt-1" />
                  <div>
                    <div class="font-weight-bold mb-1">Account Security</div>
                    <p class="text-body-2" style="opacity:0.7; line-height:1.65;">We use OTP-based login, encrypted payment tokens, and never store raw card data. Enable two-step verification in your profile settings for extra protection.</p>
                  </div>
                </div>
              </div>
            </div>
          </v-tabs-window-item>

          <!-- ── Terms ──────────────────────────────────────────────── -->
          <v-tabs-window-item value="terms">
            <div class="support-section pa-6">
              <div class="support-hero mb-5">
                <v-icon icon="mdi-file-document-outline" color="primary" size="36" class="mb-2" />
                <h2 class="ff-heading text-h6 font-weight-bold">Terms of Service</h2>
                <p class="text-body-2 mt-1" style="opacity:0.6;">Last updated: 1 January 2026</p>
              </div>

              <div class="terms-body text-body-2" style="line-height: 1.8; opacity: 0.85;">
                <h3 class="font-weight-bold mb-2 text-body-1">1. Acceptance of Terms</h3>
                <p class="mb-4">By accessing or using Feast Fast, you agree to be bound by these Terms of Service and all applicable laws. If you do not agree with any of these terms, you are prohibited from using the platform.</p>

                <h3 class="font-weight-bold mb-2 text-body-1">2. Use of the Platform</h3>
                <p class="mb-4">Feast Fast provides an online platform connecting users with restaurants. We act as a marketplace and are not responsible for the quality or safety of food beyond partner audits. You must be 18 or older to place orders containing alcohol.</p>

                <h3 class="font-weight-bold mb-2 text-body-1">3. Orders & Payments</h3>
                <p class="mb-4">All prices are inclusive of applicable taxes. Delivery charges and surge fees may apply based on distance and demand. Once an order is placed and accepted by a restaurant, it becomes a binding contract between you and that restaurant.</p>

                <h3 class="font-weight-bold mb-2 text-body-1">4. Cancellations & Refunds</h3>
                <p class="mb-4">Orders cancelled before restaurant acceptance receive a full refund. Post-acceptance cancellations are subject to our Refund Policy. Feast Fast reserves the right to refuse refunds for claims deemed fraudulent.</p>

                <h3 class="font-weight-bold mb-2 text-body-1">5. Intellectual Property</h3>
                <p class="mb-4">All content on Feast Fast — including logos, UI design, and text — is owned by Feast Fast Pvt. Ltd. and is protected under copyright law. Unauthorised reproduction is strictly prohibited.</p>

                <h3 class="font-weight-bold mb-2 text-body-1">6. Limitation of Liability</h3>
                <p class="mb-4">Feast Fast shall not be liable for any indirect, incidental, or consequential damages arising from the use or inability to use the platform. Our maximum liability is capped at the value of your last order.</p>

                <h3 class="font-weight-bold mb-2 text-body-1">7. Governing Law</h3>
                <p>These Terms are governed by the laws of India. Disputes are subject to the exclusive jurisdiction of courts in Bengaluru, Karnataka.</p>
              </div>
            </div>
          </v-tabs-window-item>

          <!-- ── Privacy ─────────────────────────────────────────────── -->
          <v-tabs-window-item value="privacy">
            <div class="support-section pa-6">
              <div class="support-hero mb-5">
                <v-icon icon="mdi-lock-outline" color="primary" size="36" class="mb-2" />
                <h2 class="ff-heading text-h6 font-weight-bold">Privacy Policy</h2>
                <p class="text-body-2 mt-1" style="opacity:0.6;">Last updated: 1 January 2026</p>
              </div>

              <div class="privacy-highlights d-flex flex-column ga-3 mb-6">
                <div class="privacy-item d-flex align-start ga-3">
                  <v-icon icon="mdi-database-eye-outline" color="primary" size="22" class="flex-shrink-0 mt-1" />
                  <div>
                    <div class="font-weight-bold text-body-2 mb-1">Data We Collect</div>
                    <p class="text-caption" style="opacity:0.7; line-height:1.65;">Name, phone number, email, delivery addresses, order history, device ID, and location (only when the app is in use). We never collect financial credentials — payment is processed by PCI-DSS compliant gateways.</p>
                  </div>
                </div>

                <v-divider opacity="0.12" />

                <div class="privacy-item d-flex align-start ga-3">
                  <v-icon icon="mdi-cog-outline" color="primary" size="22" class="flex-shrink-0 mt-1" />
                  <div>
                    <div class="font-weight-bold text-body-2 mb-1">How We Use Your Data</div>
                    <p class="text-caption" style="opacity:0.7; line-height:1.65;">To process orders, personalise recommendations, send order updates via SMS/email/push, prevent fraud, and improve platform performance. We do <em>not</em> sell your data to third parties.</p>
                  </div>
                </div>

                <v-divider opacity="0.12" />

                <div class="privacy-item d-flex align-start ga-3">
                  <v-icon icon="mdi-share-variant-outline" color="primary" size="22" class="flex-shrink-0 mt-1" />
                  <div>
                    <div class="font-weight-bold text-body-2 mb-1">Data Sharing</div>
                    <p class="text-caption" style="opacity:0.7; line-height:1.65;">We share necessary data with restaurants (name, address, order details) and delivery partners (name, phone, address) only to fulfil your order. Analytics partners receive only anonymised, aggregated data.</p>
                  </div>
                </div>

                <v-divider opacity="0.12" />

                <div class="privacy-item d-flex align-start ga-3">
                  <v-icon icon="mdi-cookie-outline" color="primary" size="22" class="flex-shrink-0 mt-1" />
                  <div>
                    <div class="font-weight-bold text-body-2 mb-1">Cookies</div>
                    <p class="text-caption" style="opacity:0.7; line-height:1.65;">We use essential cookies for session management and optional analytics cookies to understand usage patterns. You can manage cookie preferences in your browser settings.</p>
                  </div>
                </div>

                <v-divider opacity="0.12" />

                <div class="privacy-item d-flex align-start ga-3">
                  <v-icon icon="mdi-account-edit-outline" color="primary" size="22" class="flex-shrink-0 mt-1" />
                  <div>
                    <div class="font-weight-bold text-body-2 mb-1">Your Rights</div>
                    <p class="text-caption" style="opacity:0.7; line-height:1.65;">You have the right to access, correct, or delete your personal data at any time from your profile settings. To request account deletion, email <strong>privacy@feastfast.in</strong>.</p>
                  </div>
                </div>
              </div>
            </div>
          </v-tabs-window-item>

        </v-tabs-window>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from 'vue'

const supportOpen = ref(false)
const activeTab = ref('help')

const openSupport = (section) => {
  activeTab.value = section
  supportOpen.value = true
}
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
  cursor: pointer;
}

.footer-link:hover {
  opacity: 1;
  color: #FF6B35;
}

/* Support dialog */
.support-close-btn {
  position: absolute;
  top: 8px;
  right: 8px;
}

.support-hero {
  text-align: center;
}

.support-list {
  padding-left: 1.2rem;
  line-height: 2;
  font-size: 0.875rem;
  opacity: 0.85;
}

.support-list li { margin-bottom: 2px; }

.safety-card {
  background: rgba(255, 107, 53, 0.04);
  border: 1px solid rgba(255, 107, 53, 0.1);
}

.terms-body h3 { color: var(--v-theme-primary); }

.privacy-highlights { }
</style>
