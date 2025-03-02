//All from Claude.ai

<template>
    <div class="flex flex-col mt-2">
      <div class="card w-96 bg-base-100 shadow-xl justify-center self-center">
        <div class="card-body items-center text-center">
          <h1 class="text-3xl font-bold text-sky-600 mb-4">Flag Quiz</h1>
          <p class="mb-6">Test your knowledge of country flags from around the world!</p>
          
          <div class="flex justify-center mb-6">
            <UIcon name="i-heroicons-light-bulb"  alt="Quiz Icon" class="w-32 h-32" />
          </div>
          
          <div class="mb-4">
            <h2 class="text-xl font-semibold mb-2">How to Play:</h2>
            <ul class="text-left list-disc pl-6">
              <li>You'll be shown a country flag</li>
              <li>Choose the correct country name</li>
              <li>Answer 10 questions to complete the quiz</li>
            </ul>
          </div>
          
          <div class="card-actions">
            <button class="btn btn-primary" @click="startQuiz">Start Quiz</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      startQuiz() {
        this.$emit('start-quiz')
      }
    }
  }
  </script>