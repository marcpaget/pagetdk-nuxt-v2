<template>
  <UCard variant="subtle" class="max-w-md min-h-[38rem] text-center mx-auto my-8 p-4">
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

        <figure class="w-64 max-w-full mx-auto">
          <template v-if="isMounted">
            <img
              v-if="currentFlag"
              :src="currentFlag"
              :alt="'Flag of ' + correctAnswer"
              class="rounded-sm w-full h-40 object-cover"
            >
            <div v-else class="animate-pulse bg-gray-200 h-40 w-full rounded-sm"></div>
          </template>
          <div v-else class="bg-gray-200 h-40 w-full rounded-sm"></div>
        </figure>
    <template #footer>
          <div class="flex flex-col w-64 max-w-full min-h-60 gap-3 mx-auto" :aria-busy="isLoading">
            <div v-if="loadError" role="alert" class="text-error">
              <p>{{ loadError }}</p>
              <UButton class="mt-3" @click="fetchCountries">Try again</UButton>
            </div>
            <template v-else-if="!options.length">
              <span class="sr-only" role="status">Loading quiz…</span>
              <div v-for="n in 4" :key="n" class="h-12 rounded-md bg-muted animate-pulse" />
            </template>
            <div
              v-for="(option, index) in (loadError ? [] : options)"
              :key="index"
              class="relative overflow-hidden rounded-md"
            >
              <UButton
                block
                class="btn btn-primary justify-center"
                :disabled="isLoading"
                @click="handleOptionClick(option)"
              >
                {{ option }}
              </UButton>
              <input
                type="checkbox"
                switch
                tabindex="-1"
                aria-hidden="true"
                :disabled="isLoading"
                class="ios-haptic-switch"
                @change="handleOptionClick(option, true)"
              >
            </div>
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

    const triggerHaptics = async (type = 'light') => {
      try {
        if (typeof trigger === 'function') {
          await trigger(type)
        }
      } catch (error) {
        console.warn('WebHaptics trigger failed:', error)
      }
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
      loadError: '',
      loadVersion: 0,
      cancelImageLoad: null,
    }
  },
  mounted() {
    this.isMounted = true
    this.fetchCountries()
  },
  beforeUnmount() {
    this.loadVersion++
    this.cancelImageLoad?.()
  },
  methods: {
    handleOptionClick(option, hapticAlreadyTriggered = false) {
      if (this.isLoading) return

      const isCorrect = option === this.correctAnswer
      if (!hapticAlreadyTriggered) {
        this.triggerHaptics(isCorrect ? 'success' : 'error')
      }
      this.checkAnswer(option)
    },
    async fetchCountries() {
      const version = ++this.loadVersion
      this.cancelImageLoad?.()
      this.isLoading = true
      this.loadError = ''
      this.options = []
      this.currentFlag = ''
      try {
        const countries = await $fetch('/api/flagquiz/countries', {
          timeout: 20000,
          retry: 1,
          retryDelay: 500,
        })
        if (version !== this.loadVersion) return
        this.countries = [
          ...new Map(
            countries
              .filter(
                (country) =>
                  typeof country.name === 'string' &&
                  country.name &&
                  typeof country.flag === 'string' &&
                  country.flag,
              )
              .map((country) => [country.name, country]),
          ).values(),
        ]
        if (this.countries.length < 4) {
          throw new Error('Not enough countries with flags were returned')
        }
        await this.getRandomFlag()
      } catch (error) {
        if (version !== this.loadVersion) return
        this.loadError = 'Could not load the quiz. Please try again.'
        this.isLoading = false
      }
    },
    loadFlagImage(url) {
      return new Promise((resolve, reject) => {
        const image = new Image()
        const finish = (error) => {
          clearTimeout(timer)
          image.onload = null
          image.onerror = null
          this.cancelImageLoad = null
          error ? reject(error) : resolve()
        }
        const timer = setTimeout(
          () => finish(new Error('Flag image timed out')),
          10000,
        )
        this.cancelImageLoad = () => finish(new Error('Flag load cancelled'))
        image.onload = () => finish()
        image.onerror = () => finish(new Error('Flag image failed'))
        image.src = url
      })
    },
    async getRandomFlag() {
      const version = ++this.loadVersion
      this.cancelImageLoad?.()
      this.isLoading = true
      this.loadError = ''
      this.retryCount = 0
      this.currentFlag = ''
      const candidates = [...this.countries]
      while (this.retryCount <= this.maxRetries && candidates.length) {
        const index = Math.floor(Math.random() * candidates.length)
        const [country] = candidates.splice(index, 1)
        try {
          await this.loadFlagImage(country.flag)
          if (version !== this.loadVersion) return
          this.currentFlag = country.flag
          this.correctAnswer = country.name
          this.options = this.getRandomOptions(country.name)
          this.isLoading = false
          return
        } catch {
          if (version !== this.loadVersion) return
          this.retryCount++
        }
      }
      this.loadError = 'Could not load a flag. Please try again.'
      this.isLoading = false
    },
    getRandomOptions(correctAnswer) {
      const others = this.countries
        .map((country) => country.name)
        .filter((name) => name !== correctAnswer)
      for (let i = others.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[others[i], others[j]] = [others[j], others[i]]
      }
      const options = [correctAnswer, ...others.slice(0, 3)]
      for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[options[i], options[j]] = [options[j], options[i]]
      }
      return options
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

<style scoped>
.ios-haptic-switch {
  display: none;
}

@supports (-webkit-touch-callout: none) {
  @media (hover: none) and (pointer: coarse) {
    .ios-haptic-switch {
      position: absolute;
      inset: 0;
      z-index: 10;
      display: block;
      width: 100%;
      height: 100%;
      margin: 0;
      appearance: auto;
      cursor: pointer;
      opacity: 0;
      clip-path: inset(0 round 999px);
      touch-action: manipulation;
      -webkit-tap-highlight-color: transparent;
    }
  }
}
</style>
