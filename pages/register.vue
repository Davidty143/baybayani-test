<template>
  <div id="RegisterPage" class="w-full h-[100vh] bg-white">
    <div
      class="w-full flex items-center justify-center p-5 border-b border-b-gray-300"
    ></div>

    <div class="max-w-[400px] mx-auto px-4 py-6">
      <div class="text-center my-6 text-2xl font-bold">Register</div>

      <!-- Error message -->
      <div v-if="errorMsg" class="text-red-500 text-center mb-4">
        {{ errorMsg }}
      </div>

      <!-- Success message -->
      <div v-if="successMsg" class="text-green-500 text-center mb-4">
        {{ successMsg }}
      </div>

      <!-- Registration Form -->
      <form @submit.prevent="register" class="space-y-4">
        <div>
          <label
            for="email"
            class="block text-sm font-medium text-gray-700"
            aria-label="Email"
            >Email</label
          >
          <input
            type="email"
            id="email"
            v-model="email"
            class="mt-1 w-full p-3 border border-gray-300 rounded-md"
            placeholder="Enter your email"
            required
            aria-required="true"
          />
        </div>

        <div>
          <label
            for="password"
            class="block text-sm font-medium text-gray-700"
            aria-label="Password"
            >Password</label
          >
          <input
            type="password"
            id="password"
            v-model="password"
            class="mt-1 w-full p-3 border border-gray-300 rounded-md"
            placeholder="Enter your password"
            required
            aria-required="true"
          />
          <div v-if="password && password.length < 6" class="text-red-500">
            Password must be at least 6 characters long.
          </div>
        </div>

        <!-- Submit Button -->
        <div>
          <button
            type="submit"
            :disabled="isSubmitting"
            class="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <span v-if="isSubmitting">Registering...</span>
            <span v-else>Register</span>
          </button>
        </div>
      </form>

      <div class="mt-4 text-center text-sm">
        <span>Already have an account? </span>
        <NuxtLink to="/login" class="text-blue-500 hover:underline"
          >Login here</NuxtLink
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const client = useSupabaseClient();
const email = ref("");
const password = ref("");
const errorMsg = ref(null);
const successMsg = ref(null);
const isSubmitting = ref(false);

const register = async () => {
  isSubmitting.value = true;
  try {
    const { error } = await client.auth.signUp({
      email: email.value,
      password: password.value,
    });

    if (error) {
      if (error.message.includes("email")) {
        errorMsg.value = "Invalid email address or email already in use.";
      } else if (error.message.includes("password")) {
        errorMsg.value = "Password is too weak. Please choose a stronger one.";
      } else {
        errorMsg.value = error.message;
      }
      successMsg.value = null;
    } else {
      successMsg.value =
        "Successfully registered! Please check your email to verify your account.";
      errorMsg.value = null;
    }
  } catch (error) {
    errorMsg.value = "An unexpected error occurred: " + error.message;
    successMsg.value = null;
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
/* Add custom styles here if needed */
</style>
