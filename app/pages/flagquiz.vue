<template>
  <UContainer class="min-h-[calc(100dvh-var(--ui-header-height))]">
    <div>
      <QuizLogic
        v-if="quizState === 'in-progress'"
        @quiz-completed="endQuiz"
        :number-of-questions="numberOfQuestions"
      />
    <QuizEnd
      v-if="quizState === 'ended'"
      :score="finalScore"
      :total-questions="numberOfQuestions"
      :wrong="wrongAnswers"
      @restart-quiz="resetQuiz"
    />
    </div>
  </UContainer>
</template>

<script>
export default {
  data() {
    return {
      quizState: 'in-progress', // 'not-started', 'in-progress', 'ended'
      finalScore: 0,
      wrongAnswers: 0,
      numberOfQuestions: 10,
    }
  },
  methods: {
    endQuiz(result) {
      this.finalScore = result.score
      this.wrongAnswers = result.wrong
      this.quizState = 'ended'
    },
    resetQuiz() {
      this.quizState = 'in-progress'
    },
  },
}
</script>
