<template>
  <UCard variant="subtle" class="max-w-md text-center mx-auto my-8 p-4">
    <template #header>
      <div>
        <div class="flex flex-row justify-center">
          <div class="basis-1/3">
            <p class="text-xl text-sky-600 text-center mb-2">Progress</p>
            <p class="text-2xl text-green-600 text-center mb-2">{{ totalQuestions }}/{{ numberOfQuestions }}</p>
          </div>
          <div class="basis-1/3">
            <p class="text-xl text-sky-600 text-center mb-2">Correct</p>
            <p class="text-2xl text-green-600 text-center mb-2">{{ score }}</p>
          </div>
          <div class="basis-1/3">
            <p class="text-xl text-sky-600 text-center mb-2">Wrong</p>
            <p class="text-2xl text-red-600 text-center mb-2">{{ wrong }}</p>
          </div>
        </div>
      </div>
    </template>

        <figure class="w-64 mx-auto">
          <template v-if="isMounted">
            <img
              v-if="currentFlag"
              :src="currentFlag"
              :alt="'Flag of ' + correctAnswer"
              class="rounded-sm w-full h-40 object-cover"
              @error="handleImageError"
            >
            <div v-else class="animate-pulse bg-gray-200 h-40 w-full rounded-sm"></div>
          </template>
          <div v-else class="bg-gray-200 h-40 w-full rounded-sm"></div>
        </figure>
    <template #footer>
          <div class="flex flex-col  w-64 gap-3 mx-auto">
            <UButton
              v-for="(option, index) in options"
              :key="index"
              class="btn btn-primary  justify-center"
              :disabled="isLoading"
              @click="handleOptionClick(option)"
            >
              {{ option }}
            </UButton>
          </div>
    </template>
  </UCard>
</template>

  <script>
import { useWebHaptics } from 'web-haptics/vue'
// Lav time-attack mode med https://nuxt.com/docs/4.x/api/components/nuxt-time
export default {
  setup() {
    const { trigger } = useWebHaptics()

    const triggerHaptics = (type = 'light') => {
      trigger(type)
    }

    return { triggerHaptics }
  },
  props: {
    numberOfQuestions: {
      type: Number,
      default: 10,
    },
  },
  emits: ['quiz-completed'],
  data() {
    return {
      countries: [],
      options: [],
      currentFlag: '',
      correctAnswer: '',
      score: 0,
      wrong: 0,
      totalQuestions: 0,
      isLoading: true,
      isMounted: false,
      retryCount: 0,
      maxRetries: 3,
    }
  },
  mounted() {
    this.isMounted = true
    this.fetchCountries()
  },
  methods: {
    getCountryName(country) {
      return (
        country?.name || country?.names?.common || country?.name?.common || ''
      )
    },
    getCountryFlag(country) {
      return (
        country?.flag ||
        country?.flag?.url_png ||
        country?.flag?.url_svg ||
        country?.flags?.png ||
        country?.flags?.svg ||
        ''
      )
    },
    handleOptionClick(option) {
      if (this.isLoading) return

      const isCorrect = option === this.correctAnswer
      this.triggerHaptics(isCorrect ? 'medium' : 'heavy')
      this.checkAnswer(option)
    },
    async fetchCountries() {
      try {
        const countries = await $fetch('/api/flagquiz/countries')

        this.countries = countries.filter(
          (country) =>
            this.getCountryFlag(country) && this.getCountryName(country),
        )

        if (this.countries.length === 0) {
          throw new Error('No countries with flags were returned')
        }

        this.getRandomFlag()
      } catch (error) {
        console.error('Error fetching countries:', error)
        this.isLoading = false
      }
    },
    async getRandomFlag() {
      this.isLoading = true
      this.retryCount = 0

      if (!this.countries || this.countries.length === 0) {
        console.error('Countries array is empty or not defined')
        this.isLoading = false
        return
      }

      const randomIndex = Math.floor(Math.random() * this.countries.length)
      const country = this.countries[randomIndex]

      this.currentFlag = this.getCountryFlag(country)
      this.correctAnswer = this.getCountryName(country)
      this.options = this.getRandomOptions(this.correctAnswer)

      if (this.currentFlag) {
        const img = new Image()
        img.onload = () => {
          this.isLoading = false
        }
        img.onerror = () => {
          this.handleImageError()
        }
        img.src = this.currentFlag
      } else {
        this.isLoading = false
      }
    },
    handleImageError() {
      if (this.retryCount < this.maxRetries) {
        this.retryCount++
        console.log(`Retrying flag load (attempt ${this.retryCount})...`)
        this.getRandomFlag()
      } else {
        console.error('Failed to load flag after maximum retries')
        this.isLoading = false
      }
    },
    getRandomOptions(correctAnswer) {
      const options = [correctAnswer]
      while (options.length < 4) {
        const randomIndex = Math.floor(Math.random() * this.countries.length)
        const option = this.getCountryName(this.countries[randomIndex])
        if (!options.includes(option)) {
          options.push(option)
        }
      }
      return options.sort(() => Math.random() - 0.5)
    },
    async checkAnswer(option) {
      if (this.isLoading) return

      this.totalQuestions++
      if (option === this.correctAnswer) {
        this.score++
      } else {
        this.wrong++
      }

      if (this.totalQuestions >= this.numberOfQuestions) {
        // Quiz is completed, emit the result
        this.$emit('quiz-completed', {
          score: this.score,
          wrong: this.wrong,
        })
      } else {
        // Get next question
        await this.getRandomFlag()
      }
    },
  },
}
</script>
