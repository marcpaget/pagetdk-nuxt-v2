 <!-- Top <template> and <script> sections from Claude.ai -->
<template>
  <div>
    <QuizStart v-if="quizState === 'not-started'" @start-quiz="startQuiz" />
    <QuizLogic 
      v-else-if="quizState === 'in-progress'" 
      @quiz-completed="endQuiz" 
      :number-of-questions="numberOfQuestions"
    />
    <QuizEnd 
      v-else-if="quizState === 'ended'" 
      :score="finalScore" 
      :total-questions="numberOfQuestions"
      :wrong="wrongAnswers"
      @restart-quiz="resetQuiz"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      quizState: 'not-started', // 'not-started', 'in-progress', 'ended'
      finalScore: 0,
      wrongAnswers: 0,
      numberOfQuestions: 10
    }
  },
  methods: {
    startQuiz() {
      this.quizState = 'in-progress'
      this.finalScore = 0
      this.wrongAnswers = 0
    },
    endQuiz(result) {
      this.finalScore = result.score
      this.wrongAnswers = result.wrong
      this.quizState = 'ended'
    },
    resetQuiz() {
      this.quizState = 'not-started'
    }
  }
}
</script>

<!-- <template>
     <UContainer class="p-2 max-w-3xl">
      <UCard>
  <div class="col-span--2">
    <div class="card w-96 bg-base-100 shadow-xl justify-center self-center">
          <div class="flex justify-center">
            <span class="text-3xl text-sky-600 text-center m-1">Guess the country</span>
          </div>
          <section>
          <div v-if="totalQuestions < 10">
            <LazyQuizLogic 
              :totalQuestions="totalQuestions"
              :score="score"
              :wrong="wrong"
              :isLoading="isLoading"
              />
          </div>
       <div v-else>
            <div class="flex justify-center">
              <span class="text-3xl text-sky-600 text-center m-1">Game Over</span>
            </div>
            <div class="flex justify-center">
              <span class="text-3xl text-sky-600 text-center m-1">Your score is {{ score }}</span>
            </div>
            <div class="flex justify-center">
              <span class="text-3xl text-sky-600 text-center m-1">You got {{ wrong }} wrong answers</span>
            </div>
</div>
          </section>
        </div>
      </div>
        </UCard>
      </UContainer>
</template>

<script>
import LazyQuizLogic from '@/components/QuizLogic.vue'

export default {
  components: {
    LazyQuizLogic
  },
  data() {
    return {
      totalQuestions: 0,
      score: 0,
      wrong: 0,
      isLoading: true
    }
  },
  methods: {
    updateQuizState({ totalQuestions, score, wrong, isLoading }) {
      this.totalQuestions = totalQuestions
      this.score = score
      this.wrong = wrong
      this.isLoading = isLoading
    }
  }
}
</script> -->