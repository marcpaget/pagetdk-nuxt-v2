// All from Claude.ai

<template>
    <div class="flex flex-col mt-2">
      <div class="card w-96 bg-base-100 shadow-xl justify-center self-center">
        <div class="card-body items-center text-center">
          <h1 class="text-3xl font-bold text-sky-600 mb-6">Quiz Completed!</h1>
          
          <div class="stats shadow mb-6">
            <div class="stat">
              <div class="stat-title">Final Score</div>
              <div class="stat-value text-green-600">{{ score }}/{{ totalQuestions }}</div>
              <div class="stat-desc">{{ scorePercentage }}% correct</div>
            </div>
          </div>
  
          <div class="flex flex-row justify-around w-full mb-4">
            <div class="text-center">
              <div class="text-green-600 font-bold text-xl">{{ score }}</div>
              <div class="text-sm">Correct</div>
            </div>
            <div class="text-center">
              <div class="text-red-600 font-bold text-xl">{{ wrong }}</div>
              <div class="text-sm">Wrong</div>
            </div>
          </div>
  
          <div class="card-actions">
            <button class="btn btn-primary" @click="restartQuiz">Play Again</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      score: {
        type: Number,
        required: true
      },
      totalQuestions: {
        type: Number,
        required: true
      },
      wrong: {
        type: Number,
        required: true
      }
    },
    computed: {
      scorePercentage() {
        return Math.round((this.score / this.totalQuestions) * 100)
      }
    },
    methods: {
      restartQuiz() {
        this.$emit('restart-quiz')
      }
    }
  }
  </script>