<template>
    <div class="flex flex-col mt-2">
      <div class="card w-96 bg-base-100 shadow-xl justify-center self-center">
        <section v-if="totalQuestions < 10">
          <div class="mx-4">
          <progress
            class="place-content-center progress progress-info"
            :value="totalQuestions"
            :max="10"
          />
        </div>
          <div class="flex flex-col">
            <div class="basis-1/2 justify-center self-center text-center">
              <span class="text-4xl text-sky-600 justify-center self-center text-center mb-4">Score</span>
            </div>
          </div>
          <!-- TODO: Difficulty levels hardcoded or based on countrys size or region/continent -->
          <div class="flex flex-row justify-center">
            <div class="basis-1/2">
              <p class="text-2xl text-green-600 text-center mb-2">
                {{ score }}
              </p>
              <p class="text-xl text-green-600 text-center mb-2">
                Correct
              </p>
            </div>
            <div class="basis-1/2">
              <p class="text-2xl text-red-600 text-center mb-2">
                {{ wrong }}
              </p>
              <p class="text-xl text-red-600 text-center mb-2">
                Wrong
              </p>
            </div>
          </div>
          <div class="card-body items-center text-center">
            <figure class="px-10 pt-10">
              <img
                :src="currentFlag"
                alt="Flag"
                class="rounded-xl"
              >
            </figure>
  
            <div class="card-actions">
              <div class="min-w-max max-w-lg flex flex-col rounded-md shadow-sm mt-4">
                <label
                  v-for="(option, index) in options"
                  :key="index"
                  class="btn btn-primary py-3 px-4 mt-2 justify-center items-center gap-2 border align-middle"
                  @click="checkAnswer(option)"
                >
                  {{ option }}
                </label>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        countries: [],
        options: [],
        currentFlag: '',
        correctAnswer: '',
        score: 0,
        wrong: 0,
        number: 10,
        remaining: 10,
        totalQuestions: 0,
        selected: '',
      }
    },
    mounted() {
      this.fetchCountries()
    },
    methods: {
      async fetchCountries() {
        try {
          const res = await useRestCountriesApiData('v3.1/all/')
          this.countries = res.data
          this.getRandomFlag()
        }
        catch (error) {
          console.error(error)
        }
      },
      setNumber(number) {
        this.number = number
        this.remaining = number
      },
      getRemaining() {
        return this.remaining
      },
      getRandomFlag() {
        const randomIndex = Math.floor(Math.random() * this.countries.length)
        this.currentFlag = this.countries[randomIndex].flag
        this.correctAnswer = this.countries[randomIndex].name
        this.options = this.getRandomOptions(this.correctAnswer)
      },
      getRandomOptions(correctAnswer) {
        const options = [correctAnswer]
        while (options.length < 4) {
          const randomIndex = Math.floor(Math.random() * this.countries.length)
          const option = this.countries[randomIndex].name
          if (!options.includes(option)) {
            options.push(option)
          }
        }
        options.sort(() => Math.random() - 0.5)
        return options
      },
      selectedAnswer(option) {
        return option === this.correctAnswer
      },
      checkAnswer(option) {
        this.totalQuestions++
        if (option === this.correctAnswer) {
          this.score++
        }
        else {
          this.wrong++
        }
  
        this.getRandomFlag()
      },
      // Logic for hint button and provided hint (based on the country's capital and/or region)
    },
  }
  </script>
  